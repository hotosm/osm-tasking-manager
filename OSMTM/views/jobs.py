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
    accepted_nextview = user.accepted_nextview
    admin = user.is_admin() if user else False
    stats = get_stats(job) if admin else None
    return dict(job=job, tiles=dumps(FeatureCollection(tiles)),
            current_task=current_task,
            admin=admin,
            accepted_nextview=accepted_nextview,
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
    invalidated = 0

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
    checkin = 0
    for ndx, i in enumerate(tiles_history):
        if i.username:
            if not users.has_key(i.username):
                users[i.username] = StatUser()
            user = users[i.username]
        if checkin != i.checkin:
            user.done += 1
            if (i.checkin - checkin) < 0:
                user.invalidated += 1
        checkin = i.checkin
        if i.version == 0:
            checkin = 0

    users_tuples = []
    for i in users:
        if users[i].done != 0:
            users_tuples.append((i, users[i].done, users[i].invalidated))
    contributors = sorted(users_tuples, key=lambda user: user[1], reverse=True)

    return dict(current_users=current_users, contributors=contributors)
