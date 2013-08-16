import urlparse
from xml.etree import ElementTree
from pyramid.httpexceptions import HTTPFound, HTTPBadGateway, HTTPBadRequest
from pyramid.view import view_config
from pyramid.url import route_url
from pyramid.renderers import render_to_response

from OSMTM.models import DBSession
from OSMTM.models import Job
from OSMTM.models import User
from OSMTM.models import Tile
from OSMTM.models import TileHistory
from OSMTM.models import Tag

import oauth2 as oauth

from pyramid.security import remember, forget, authenticated_userid

from json import dumps
from markdown import markdown
from OSMTM.utils import timesince
from datetime import datetime, timedelta
from sqlalchemy import desc, distinct
from sqlalchemy.sql.expression import and_

from OSMTM.utils import transform_900913_to_4326

import logging
log = logging.getLogger(__file__)

#
# Constants
#

# our oauth key and secret (we're the consumer in the oauth protocol)
# consumer key and secret created by Kate Chapman
CONSUMER_KEY = 'BOFkVgLDXTSMP6VHfiX8MQ'
CONSUMER_SECRET = '4o4uLSqLWMciG2fE2zGncLcdewPNi9wU1To51Iz2E'

# OSM oauth URLs
BASE_URL = 'http://www.openstreetmap.org/oauth'
REQUEST_TOKEN_URL = '%s/request_token' % BASE_URL
ACCESS_TOKEN_URL = '%s/access_token' % BASE_URL
AUTHORIZE_URL = '%s/authorize' % BASE_URL

# OSM user details URL
USER_DETAILS_URL = 'http://api.openstreetmap.org/api/0.6/user/details'

# an oauth consumer instance using our key and secret
consumer = oauth.Consumer(CONSUMER_KEY, CONSUMER_SECRET)

@view_config(route_name='login')
def login(request):
    # get the request token
    client = oauth.Client(consumer)
    oauth_callback_url = request.route_url('oauth_callback')
    url = "%s?oauth_callback=%s" % (REQUEST_TOKEN_URL, oauth_callback_url)
    resp, content = client.request(url, "GET")
    if resp['status'] != '200':
        return HTTPBadGateway('The OSM authentication server didn\'t respond correctly') 
    request_token = dict(urlparse.parse_qsl(content))
    # store the request token in the session, we'll need in the callback
    session = request.session
    session['request_token'] = request_token
    session['came_from'] = request.params.get('came_from')
    session.save()
    redirect_url = "%s?oauth_token=%s" % \
            (AUTHORIZE_URL, request_token['oauth_token'])
    return HTTPFound(location=redirect_url)

@view_config(route_name='oauth_callback')
def oauth_callback(request):
    # the request token we have in the user session should be the same
    # as the one passed to the callback
    session = request.session
    request_token = session.get('request_token')
    if request.params.get('oauth_token') != request_token['oauth_token']:
        return HTTPBadRequest('Tokens don\'t match')
    # get the access token
    token = oauth.Token(request_token['oauth_token'],
                        request_token['oauth_token_secret'])
    verifier = request.params.get('oauth_verifier')
    token.set_verifier(verifier)
    client = oauth.Client(consumer, token)
    resp, content = client.request(ACCESS_TOKEN_URL, "POST")
    access_token = dict(urlparse.parse_qsl(content))
    token = access_token['oauth_token']
    token_secret = access_token['oauth_token_secret']
    # get the user details, finally
    token = oauth.Token(token, token_secret)
    client = oauth.Client(consumer, token)
    resp, content = client.request(USER_DETAILS_URL, "GET")
    user_elt = ElementTree.XML(content).find('user')
    # save the user's "display name" in the session
    if 'display_name' in user_elt.attrib:
        username = user_elt.attrib['display_name']
        db_session = DBSession()
        if db_session.query(User).get(username) is None:
            db_session.add(User(username))
            db_session.flush()
        headers = remember(request, username, max_age=20*7*24*60*60)

    # and redirect to the main page
    return HTTPFound(location=session.get('came_from'), headers=headers)

@view_config(route_name='logout')
def logout(request):
    headers = forget(request)
    return HTTPFound(location=request.route_url('home'), headers=headers)

@view_config(route_name='home', renderer='home.mako', permission='edit')
def home(request):
    session = DBSession()
    username = authenticated_userid(request)
    user = session.query(User).get(username)
    jobs = session.query(Job).order_by(desc(Job.id))
    if user is None:
        redirect = request.params.get("redirect", request.route_url("logout")) 
        return HTTPFound(location=redirect)
    if not user.is_admin():
        jobs = [job for job in jobs if not job.is_private and job.status == 1] + user.private_jobs
    tiles = session.query(Tile) \
        .filter(Tile.username!=None) \
        .group_by(Tile.username)
    # unlock expired tiles
    for tile in tiles:
        checkTask(tile)
    my_jobs = session.query(TileHistory) \
        .filter(TileHistory.username==user.username) \
        .group_by(TileHistory.job_id)
    my_jobs = [tile.job_id for tile in my_jobs]

    dthandler = lambda obj: obj.isoformat() if isinstance(obj, datetime.datetime) else None

    def to_five(i):
        return int(round(i/5)) * 5 

    def to_dict(job):
        centroid = job.get_centroid()
        filter = and_(Tile.job==job,Tile.checkout==True, Tile.username!=None)
        current_users = session.query(distinct(Tile.username)) \
                .filter(filter).all()
        current_users = [u[0] for u in current_users]

        x, y = transform_900913_to_4326(centroid.x, centroid.y)
        left = (x + 180) * 120 / 360 - 1
        top = (-y + 90) * 60 / 180 - 1

        return dict(
            title=job.title,
            status=job.status,
            short_description=markdown(job.short_description),
            author=job.author,
            is_private=job.is_private,
            featured=job.featured,
            last_update=timesince(job.last_update),
            done=job.done,
            users=current_users,
            usersText="Currently working: %s" % ", ".join(current_users),
            url=request.route_url('job', job=job.id),
            feature_url=request.route_url('job_feature', job=job.id),
            archive_url=request.route_url('job_archive', job=job.id),
            publish_url=request.route_url('job_publish', job=job.id),
            edit_url=request.route_url('job_edit', job=job.id),
            tags=[tag.tag for tag in job.tags],
            is_mine=job.id in [_job for _job in my_jobs],
            lon=centroid.x,
            lat=centroid.y,
            left=left,
            top=top
        )

    jobs = dumps([to_dict(job) for job in jobs], default=dthandler)
    
    return dict(jobs=jobs,
            user=user,
            admin=user.is_admin(),
            my_jobs=my_jobs)

@view_config(route_name='about', renderer='about.mako')
def about(request):
    return dict()

@view_config(route_name='user', renderer='user.mako', permission='admin')
def user(request):
    session = DBSession()
    user = session.query(User).get(request.matchdict["id"])
    return dict(user=user, admin=True)

@view_config(route_name='user_update', permission='admin')
def user_update(request):
    session = DBSession()
    user = session.query(User).get(request.matchdict["id"])
    if 'form.submitted' in request.params:
        user.admin = True if 'admin' in request.params else False
        session.flush()
        #request.session.flash('Profile correctly updated!')
    return HTTPFound(location=request.route_url('user',id=user.username))

@view_config(route_name='user_add', permission='admin')
def user_add(request):
    session = DBSession()
    username = request.params.get("username")
    if session.query(User).get(username) is None:
        session.add(User(username))
        session.flush()
    return HTTPFound(location=request.route_url('user', id=username)) 

@view_config(route_name='users', renderer='users.mako', permission="edit")
def users(request):
    session = DBSession()
    current_username = authenticated_userid(request)
    current_user = session.query(User).get(current_username)
    return dict(users = session.query(User), admin=current_user.is_admin())

@view_config(route_name='tour', renderer='tour.mako')
def tour(request):
    return dict()

# the time delta after which the task is unlocked (in seconds)
EXPIRATION_DURATION = timedelta(seconds=2 * 60 * 60)

# unlock the tile if expired
def checkTask(tile):
    session = DBSession()
    if tile.checkout is not False and tile.checkout is not None:
        if datetime.now() > tile.update + EXPIRATION_DURATION:
            tile.username = None 
            tile.checkout = False
            tile.update = datetime.now()
            session.add(tile)
