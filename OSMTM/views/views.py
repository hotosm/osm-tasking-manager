import urlparse
from xml.etree import ElementTree
from pyramid.httpexceptions import HTTPFound
from pyramid.view import view_config
from pyramid.url import route_url
from pyramid.renderers import render_to_response

from OSMTM.models import DBSession
from OSMTM.models import Job
from OSMTM.models import User

import oauth2 as oauth

from pyramid.security import remember, forget, authenticated_userid

from datetime import datetime, timedelta

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
    resp, content = client.request(REQUEST_TOKEN_URL, "GET")
    if resp['status'] != '200':
        abort(502)
    request_token = dict(urlparse.parse_qsl(content))
    # store the request token in the session, we'll need in the callback
    session = request.session
    session['request_token'] = request_token
    session['came_from'] = request.params.get('came_from')
    session.save()
    oauth_callback = request.route_url('oauth_callback')
    redirect_url = "%s?oauth_token=%s&oauth_callback=%s" % \
            (AUTHORIZE_URL, request_token['oauth_token'], oauth_callback)
    return HTTPFound(location=redirect_url)

@view_config(route_name='oauth_callback')
def oauth_callback(request):
    # the request token we have in the user session should be the same
    # as the one passed to the callback
    session = request.session
    request_token = session.get('request_token')
    if request.params.get('oauth_token') != request_token['oauth_token']:
        abort(500)
    # get the access token
    token = oauth.Token(request_token['oauth_token'],
                        request_token['oauth_token_secret'])
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
        headers = remember(request, username, max_age=2*7*24*60*60)

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
    jobs = session.query(Job).all()
    if not user.is_admin():
        jobs = [job for job in jobs if not job.is_private] + user.private_jobs
    return dict(jobs=jobs,
            user=user,
            admin=user.is_admin())

@view_config(route_name='credits', renderer='credits.mako')
def credits(request):
    return dict()

@view_config(route_name='nextview', renderer='nextview.mako', permission='edit')
def nextview(request):
    session = DBSession()
    username = authenticated_userid(request)
    user = session.query(User).get(username)
    redirect = request.params.get("redirect", request.route_url("home"))
    if "accepted_terms" in request.params:
        user.accepted_nextview = request.params["accepted_terms"] == "I AGREE"
        return HTTPFound(location=redirect)
    else:
        return dict(user=user, redirect=redirect)

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
        user.accepted_nextview = request.params.get('accepted_nextview', 0)
        session.flush()
        request.session.flash('Profile correctly updated!')
    return HTTPFound(location=request.route_url('user',id=user.username))

@view_config(route_name='users', renderer='users.mako', permission="edit")
def users(request):
    session = DBSession()
    current_username = authenticated_userid(request)
    current_user = session.query(User).get(current_username)
    return dict(users = session.query(User), admin=current_user.is_admin())

# the time delta after which the task is unlocked (in seconds)
EXPIRATION_DURATION = timedelta(seconds=2 * 60 * 60)

# unlock the tile if expired
def checkTask(tile):
    session = DBSession()
    if tile.checkout is not None:
        if datetime.now() > tile.checkout + EXPIRATION_DURATION:
            tile.username = None 
            tile.checkout = None 
            session.add(tile)
