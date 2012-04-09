from pyramid.httpexceptions import HTTPFound
from pyramid.httpexceptions import HTTPNotFound
from pyramid.httpexceptions import HTTPBadRequest
from pyramid.view import view_config
from pyramid.url import route_url

from papyrus.protocol import Protocol

from OSMTM.models import DBSession
from OSMTM.models import Tile
from OSMTM.models import TileGeometry
from OSMTM.models import TileHistory
from OSMTM.models import User
from OSMTM.models import Job

from OSMTM.views.views import EXPIRATION_DURATION

import geojson
from geojson import dumps
from geojson import GeoJSON
from sqlalchemy.sql.expression import and_, not_

from shapely.wkb import loads as loads_wkb
from shapely.geometry import asShape

from geoalchemy import WKBSpatialElement

from datetime import datetime
import random

from pyramid.security import authenticated_userid

import logging
log = logging.getLogger(__file__)

@view_config(route_name='task', renderer='task.mako', permission='job',
        http_cache=0)
def task(request):
    job_id = request.matchdict['job']
    task_id = request.matchdict['task']
    session = DBSession()
    tile = session.query(Tile).get((task_id, job_id))
    if tile is None:
        return HTTPNotFound()
    username = authenticated_userid(request)
    user = session.query(User).get(username)
    time_left = 'null'
    if tile.user != user:
        request.session.flash('You cannot see this task.')
        return HTTPFound(location=request.route_url('job', job=job_id))
    if tile.update:
        time_left = (tile.update - (datetime.now() - EXPIRATION_DURATION)) \
            .seconds
    filter = and_(TileHistory.id==task_id, TileHistory.job_id==job_id)
    history = session.query(TileHistory).filter(filter).all()
    return dict(tile=tile,
            history=history,
            time_left=time_left,
            user=user,
            job=tile.job)

@view_config(route_name='task_done', permission='job', renderer='task.mako')
def done(request):
    job_id = request.matchdict['job']
    task_id = request.matchdict['task']
    session = DBSession()
    tile = session.query(Tile).get((task_id, job_id))
    tile.username = None 
    tile.update = datetime.now()
    tile.comment = request.params['comment']
    if 'invalidate' in request.params:
        # task goes back to the queue
        tile.checkin = 0
    elif 'validate' in request.params:
        # task in validated
        tile.checkin = 2
    else:
        #task is done
        tile.checkin = 1
    session.add(tile)
    return dict(job=tile.job)

@view_config(route_name='task_unlock', permission='job', renderer='task.mako')
def unlock(request):
    job_id = request.matchdict['job']
    task_id = request.matchdict['task']
    session = DBSession()
    tile = session.query(Tile).get((task_id, job_id))
    tile.username = None 
    tile.update = datetime.now()
    if (tile.job.tiled):
        session.add(tile)
    else:
        session.delete(tile)
        session.flush()
    return dict(job=tile.job,
                prev_task=tile)

def take(request):
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
        ## get the tile the user worked on previously
        #filter = and_(TileHistory.username==username, TileHistory.job_id==job_id)
        #p = session.query(TileHistory).filter(filter).order_by(TileHistory.update.desc()).limit(4).all()
        tile = None
        #if p is not None and len(p) > 0:
            #p = p[len(p) -1]
            #neighbours = [
                #(p.x - 1, p.y - 1), (p.x - 1, p.y), (p.x - 1, p.y + 1),
                #(p.x, p.y - 1), (p.x, p.y + 1),
                #(p.x + 1, p.y - 1), (p.x + 1, p.y), (p.x + 1, p.y + 1)]
            #for t in tiles:
                #if (t.x, t.y) in neighbours:
                    #tile = t
                    #break
    # x / y given, selecting the tile
    else:
        task_id = request.matchdict['task']
        tile = session.query(Tile).get((task_id, job_id))

        # task is already checked out by someone else
        if tile.username is not None and tile.user != user:
            msg = 'You cannot take this task. Someone else is already working on it.'
            return dict(job=job, error_msg=msg)

        if tile.checkin >= 2:
            msg = 'This tile has already been validated.'
            return dict(job=job, error_msg=msg)

    # check if user has no task he's currently working on
    filter = and_(Tile.username==username, Tile.job_id==job_id)
    tiles_current = session.query(Tile).filter(filter).all()
    if len(tiles_current) > 0 and tile.user != user:
        request.session.flash('You already have a task to work on. Finish it before you can accept a new one.')
        return HTTPFound(location=request.route_url('job', job=job_id))

    try:
        if tile is None:
            tile = tiles[random.randrange(0, len(tiles))]
        tile.username = username
        tile.update = datetime.now()
        session.add(tile)
        return HTTPFound(location=request.route_url('task', job=job_id, task=tile.id))
    except:
        if int(checkin) == 1:
            msg = 'Sorry. No task available to validate.'
        else:
            msg = 'Sorry. No task available to take.'
        return dict(job=job, error_msg=msg)


@view_config(route_name='task_take_random', permission='job', renderer="task.mako")
def take_random(request):
    return take(request)

@view_config(route_name='task_take', permission='job', renderer="task.mako")
def take_tile(request):
    return take(request)

protocol = Protocol(DBSession, Tile, 'geometry')

@view_config(route_name='task_create', permission='job', renderer="json")
def task_create(request):
    session = DBSession()
    job_id = request.matchdict['job']
    job = session.query(Job).get(job_id)

    jobShape = asShape(job.__geo_interface__.geometry)
    collection = geojson.loads(request.body, object_hook=GeoJSON.to_instance)
    newShape = asShape(collection.features[0].geometry)

    # the shape is not fully contained in the job's shape
    if jobShape.intersects(newShape) and not jobShape.contains(newShape):
        newShape = jobShape.intersection(newShape)

    # check if area intersects an already existing area
    geom = WKBSpatialElement(buffer(newShape.wkb), srid=900913)
    filter = not_(TileGeometry.geometry.touches(geom))
    filter = and_(filter, TileGeometry.geometry.intersects(geom))
    filter = and_(filter, TileGeometry.id==Tile.id, Tile.job_id==job_id)
    if DBSession.query(Tile).filter(filter).count() > 0:
        return HTTPBadRequest('The specified area overlays an already defined area')

    tile = Tile(WKBSpatialElement(buffer(newShape.wkb), srid=900913))
    tile.job_id = job.id
    session.add(tile)
    session.flush()
    return dict({'id': tile.id})

@view_config(route_name="task_export", renderer="task.osm.mako")
def task_export(request):
    job_id = request.matchdict['job']
    task_id = request.matchdict['task']
    session = DBSession()
    tile = session.query(Tile).get((task_id, job_id))
    return dict(polygon=loads_wkb(str(tile.geometry.geometry.geom_wkb)))
