from pyramid.httpexceptions import HTTPFound
from pyramid.view import view_config
from pyramid.url import route_url
from pyramid.renderers import render_to_response

from OSMTM.models import DBSession
from OSMTM.models import Job
from OSMTM.models import User
from OSMTM.models import Tile
from OSMTM.models import TileHistory

from OSMTM.views.views import EXPIRATION_DURATION, checkTask

from OSMTM.utils import get_tiles_in_geom
from shapely.wkt import loads

from geojson import Feature, FeatureCollection
from geojson import dumps

from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.sql.expression import and_

from pyramid.security import authenticated_userid

@view_config(route_name='job', renderer='job.mako', permission='job',
        http_cache=0)
def job(request):
    id = request.matchdict['job']
    session = DBSession()
    job = session.query(Job).get(id)
    tiles = []
    for tile in job.tiles:
        checkTask(tile)

    for tile in job.tiles:
        checkout = None
        if tile.checkout is not None:
            checkout = tile.checkout.isoformat()
        tiles.append(Feature(geometry=tile.to_polygon(),
            properties={'checkin': tile.checkin, 'checkout': checkout}))
    try:
        username = authenticated_userid(request)
        filter = and_(Tile.username==username, Tile.job_id==job.id)
        current_task = session.query(Tile).filter(filter).one()
    except NoResultFound, e:
        current_task = None
    username = authenticated_userid(request)
    user = session.query(User).get(username)
    admin = user.is_admin() if user else False
    stats = get_stats(job) if admin else None
    return dict(job=job, user=user, tiles=dumps(FeatureCollection(tiles)),
            current_task=current_task,
            admin=admin,
            stats=stats)

@view_config(route_name='job_new', renderer='job.new.mako',
        permission='admin')
def job_new(request):
    if 'form.submitted' in request.params:
        session = DBSession()
        job = Job()
        job.title = request.params['title']
        job.description = request.params['description']
        job.geometry = request.params['geometry']
        job.workflow = request.params['workflow']
        job.imagery = request.params['imagery']
        job.zoom = request.params['zoom']
        job.is_private = request.params.get('is_private', 0)
        job.requires_nextview = request.params.get('requires_nextview', 0)

        tiles = []
        for i in get_tiles_in_geom(loads(job.geometry), int(job.zoom)):
            tiles.append(Tile(i[0], i[1]))
        job.tiles = tiles

        session.add(job)
        session.flush()
        return HTTPFound(location = route_url('job', request, job=job.id))
    return {} 

@view_config(route_name='job_users', renderer='job.users.mako', permission='admin')
def job_users(request):
    id = request.matchdict['job']
    session = DBSession()
    job = session.query(Job).get(id)
    if 'form.submitted' in request.params:
        username = request.params['username']
        user = session.query(User).get(username)
        if user:
            job.users.append(user)
            session.flush()
            request.session.flash('User "%s" added to the whitelist!' % username)
        else:
            request.session.flash('User "%s" not found!' % username)
    all_users = session.query(User).order_by('username').all()
    return dict(job=job, all_users=all_users)


class StatUser():
    done = 0
    validated = 0

def get_stats(job):
    session = DBSession()
    filter = and_(Tile.job_id==job.id, Tile.checkout!=None)
    users = session.query(Tile.username).filter(filter)
    current_users = [user.username for user in users]

    #filter = and_(TileHistory.job_id==job.id, TileHistory.username!=None)
    #users = session.query(TileHistory.username).filter(filter).distinct()
    #all_time_users = [user.username for user in users]

    # get the users who actually did some work
    tiles_history = session.query(TileHistory) \
            .filter(TileHistory.job_id==job.id) \
            .order_by(TileHistory.x, TileHistory.y) \
            .all()

    users = {}
    # checkin is 0 when the tile was created
    checkin = 0
    user = None
    for ndx, i in enumerate(tiles_history):
        # a user checked out a tile, let's add him to the list
        if i.username:
            if not users.has_key(i.username):
                users[i.username] = StatUser()
            user = users[i.username]
        # something has changed
        if user is not None:
            compare_checkin(checkin, i.checkin, user)
        checkin = i.checkin
        if i.version == 1:
            # compare to the current checkin value
            tile = session.query(Tile) \
                .get((i.x, i.y, job.id))
            if user is not None:
                compare_checkin(checkin, tile.checkin, user)

            # let's move to a new tile
            # checkin is reinitialized
            checkin = 0
            user = None

    contributors_tuples = []
    validators_tuples = []
    for i in users:
        # only keep users who have actually done something
        if users[i].done != 0:
            contributors_tuples.append((i, users[i].done))
        if users[i].validated != 0:
            validators_tuples.append((i, users[i].validated))
    contributors = sorted(contributors_tuples, key=lambda user: user[1], reverse=True)
    validators = sorted(validators_tuples, key=lambda user: user[1], reverse=True)

    return dict(current_users=current_users, contributors=contributors, 
            validators=validators)

def compare_checkin(old, new, user):
    # task done
    if old == 0 and new == 1:
        user.done += 1
    # task validated or invalidated
    if old == 1 and new == 2 or \
       old == 1 and new == 0:
        user.validated += 1
