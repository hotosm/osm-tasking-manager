from pyramid.httpexceptions import HTTPFound
from pyramid.httpexceptions import HTTPNotFound
from pyramid.view import view_config
from pyramid.url import route_url

from OSMTM.models import DBSession
from OSMTM.models import Tile
from OSMTM.models import TileHistory
from OSMTM.models import User
from OSMTM.models import Job

from OSMTM.views.views import EXPIRATION_DURATION, checkTask

from geojson import Feature, FeatureCollection
from sqlalchemy.sql.expression import and_
from sqlalchemy.orm.exc import NoResultFound

from datetime import datetime
import random

from pyramid.security import authenticated_userid

import logging
log = logging.getLogger(__file__)

@view_config(route_name="task_empty", renderer="task.empty.mako", permission="job")
def task_empty(request):
    id = request.matchdict['job']
    session = DBSession()
    job = session.query(Job).get(id)
    return dict(job=job)

@view_config(route_name='task_xhr', renderer='task.mako', permission='job',
        http_cache=0)
def task_xhr(request):
    job_id = request.matchdict['job']
    x = request.matchdict['x']
    y = request.matchdict['y']
    zoom = request.matchdict['zoom']
    session = DBSession()
    tile = session.query(Tile).get((x, y, zoom, job_id))
    if tile is None:
        return HTTPNotFound()
    username = authenticated_userid(request)
    user = session.query(User).get(username)
    time_left = 'null'
    #if tile.user != user:
        #request.session.flash('You cannot see this task.')
        #return HTTPFound(location=request.route_url('job', job=job_id))
    if tile.update:
        time_left = (tile.update - (datetime.now() - EXPIRATION_DURATION)) \
            .seconds
    filter = and_(TileHistory.x==x, TileHistory.y==y, TileHistory.job_id==job_id)
    history = session.query(TileHistory).filter(filter)\
        .order_by(TileHistory.update)\
        .all()

    current_task = get_locked_task(job_id, username)

    return dict(tile=tile,
            current_task=current_task,
            history=history,
            time_left=time_left,
            user=user,
            job=tile.job)

@view_config(route_name='task_done', permission='job', renderer='json')
def done(request):
    job_id = request.matchdict['job']
    x = request.matchdict['x']
    y = request.matchdict['y']
    zoom = request.matchdict['zoom']
    session = DBSession()
    username = authenticated_userid(request)
    tile = session.query(Tile).get((x, y, zoom, job_id))
    tile.comment = request.params['comment']
    if 'invalidate' in request.params:
        # task goes back to the queue
        tile.checkin = 0
        tile.username = username
    else:
        #task is done
        tile.checkin = 1
    tile.change = True
    tile.checkout = False
    session.add(tile)
    session.flush()

    # reset tile values
    tile.username = None
    tile.change = False
    tile.comment = None
    session.add(tile)
    return dict(success=True, tile=dict(x=tile.x, y=tile.y, z=tile.zoom))

@view_config(route_name='task_unlock', permission='job', renderer='json')
def unlock(request):
    job_id = request.matchdict['job']
    x = request.matchdict['x']
    y = request.matchdict['y']
    zoom = request.matchdict['zoom']
    session = DBSession()
    tile = session.query(Tile).get((x, y, zoom, job_id))
    tile.username = None 
    tile.checkout = False
    tile.change = False
    session.add(tile)
    return dict(success=True, tile=dict(x=tile.x, y=tile.y, z=tile.zoom))

@view_config(route_name='task_lock', permission='job', renderer="json")
def lock(request):
    job_id = request.matchdict['job']
    session = DBSession()
    username = authenticated_userid(request)
    user = session.query(User).get(username)
    job = session.query(Job).get(job_id)

    x = request.matchdict['x']
    y = request.matchdict['y']
    zoom = request.matchdict['zoom']
    tile = session.query(Tile).get((x, y, zoom, job_id))

    # task is already checked out by someone else
    if tile.checkout is True and tile.username != user:
        msg = 'You cannot lock this task. Someone else is already working on it.'
        return dict(error_msg=msg)

    # check if user has no task he's currently working on
    filter = and_(Tile.username==username, Tile.checkout==True, Tile.job_id==job_id)
    tiles_current = session.query(Tile).filter(filter).all()
    if len(tiles_current) > 0 and tile.user != user:
        msg = 'You already have a task to work on. Finish it before you can accept a new one.'
        return dict(error_msg=msg)

    try:
        tile.username = username
        tile.checkout = True
        tile.change = False
        session.add(tile)
        return dict(success=True, tile=dict(x=tile.x, y=tile.y, z=tile.zoom))
    except:
        if int(checkin) == 1:
            msg = 'Sorry. No task available to validate.'
        else:
            msg = 'Sorry. No task available to take.'
        return dict(job=job, error_msg=msg)

@view_config(route_name='task_take_random', permission='job', renderer="json")
def take_random(request):
    job_id = request.matchdict['job']
    if "checkin" in request.matchdict:
        checkin = request.matchdict['checkin']
    else:
        checkin = None
    session = DBSession()
    username = authenticated_userid(request)
    user = session.query(User).get(username)
    job = session.query(Job).get(job_id)

    filter = and_(Tile.checkin==checkin, Tile.job_id==job_id)
    tiles = session.query(Tile).filter(filter).all()
    # take random tile
    if checkin is not None:
        # get the tile the user worked on previously
        filter = and_(TileHistory.username==username, TileHistory.job_id==job_id)
        p = session.query(TileHistory).filter(filter).order_by(TileHistory.update.desc()).limit(4).all()
        tile = None
        if p is not None and len(p) > 0:
            p = p[len(p) -1]
            neighbours = [
                (p.x - 1, p.y - 1), (p.x - 1, p.y), (p.x - 1, p.y + 1),
                (p.x, p.y - 1), (p.x, p.y + 1),
                (p.x + 1, p.y - 1), (p.x + 1, p.y), (p.x + 1, p.y + 1)]
            for t in tiles:
                if (t.x, t.y) in neighbours:
                    tile = t
                    break
    if tile is None:
        tile = tiles[random.randrange(0, len(tiles))]

    return dict(success=True, tile=dict(x=tile.x, y=tile.y, z=tile.zoom))


@view_config(route_name='task_split', permission='job', renderer="geojson")
def split_tile(request):
    job_id = request.matchdict['job']
    x = request.matchdict['x']
    y = request.matchdict['y']
    zoom = request.matchdict['zoom']
    session = DBSession()
    job = session.query(Job).get(job_id)
    tile = session.query(Tile).get((x, y, zoom, job_id))
    session.delete(tile)

    new_tiles = []
    t = []
    for i in range(0, 2):
        for j in range(0, 2):
            tile = Tile(int(x)*2 + i, int(y)*2 + j, int(zoom)+1)
            tile.job = job
            t.append(tile)
    for tile in t:
        new_tiles.append(Feature(geometry=tile.to_polygon(),
            id=str(tile.x) + '-' + str(tile.y) + '-' + str(tile.zoom)))
    return dict(success=True, split_id="-".join([x, y, zoom]),
            new_tiles=FeatureCollection(new_tiles))

@view_config(route_name="task_export_osm", renderer="task.osm.mako")
def task_export_osm(request):
    job_id = request.matchdict['job']
    x = request.matchdict['x']
    y = request.matchdict['y']
    zoom = request.matchdict['zoom']
    session = DBSession()
    tile = session.query(Tile).get((x, y, zoom, job_id))
    return dict(polygon=tile.to_polygon(4326))

@view_config(route_name="task_export_gpx", renderer="task.gpx.mako")
def task_export_gpx(request):
    job_id = request.matchdict['job']
    x = request.matchdict['x']
    y = request.matchdict['y']
    zoom = request.matchdict['zoom']
    session = DBSession()
    tile = session.query(Tile).get((x, y, zoom, job_id))
    return dict(polygon=tile.to_polygon(4326), job_id=job_id)

def get_locked_task(job_id, username):
    session = DBSession()
    try:
        filter = and_(Tile.username==username, Tile.checkout==True, Tile.job_id==job_id)
        return session.query(Tile).filter(filter).one()
    except NoResultFound, e:
        return None
