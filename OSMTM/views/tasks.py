from pyramid.httpexceptions import HTTPFound
from pyramid.httpexceptions import HTTPNotFound
from pyramid.view import view_config
from pyramid.url import route_url

from OSMTM.models import DBSession
from OSMTM.models import Tile
from OSMTM.models import TileHistory
from OSMTM.models import User

from OSMTM.views.views import EXPIRATION_DURATION, checkTask

from geojson import Feature
from geojson import dumps
from sqlalchemy.sql.expression import and_

from datetime import datetime
import random

from pyramid.security import authenticated_userid

import logging
log = logging.getLogger(__file__)

@view_config(route_name='task', renderer='task.mako', permission='job',
        http_cache=0)
def task(request):
    job_id = request.matchdict['job']
    x = request.matchdict['x']
    y = request.matchdict['y']
    session = DBSession()
    tile = session.query(Tile).get((x, y, job_id))
    checkTask(tile)
    if tile is None:
        return HTTPNotFound()
    polygon=tile.to_polygon()
    username = authenticated_userid(request)
    user = session.query(User).get(username)
    time_left = 'null'
    if tile.user != user:
        request.session.flash('You cannot see this task.')
        return HTTPFound(location=request.route_url('job', job=job_id))
    if tile.checkout:
        time_left = (tile.checkout - (datetime.now() - EXPIRATION_DURATION)) \
            .seconds
    return dict(tile=tile,
            time_left=time_left,
            feature=dumps(polygon),
            user=user,
            job=tile.job,
            job_url=request.route_url('job', job=job_id),
            done_url=request.route_url('task_done', job=job_id, x=x, y=y))

@view_config(route_name='task_done', permission='job', renderer='json')
def done(request):
    job_id = request.matchdict['job']
    x = request.matchdict['x']
    y = request.matchdict['y']
    session = DBSession()
    tile = session.query(Tile).get((x, y, job_id))
    tile.username = None 
    tile.checkout = None 
    tile.comment = request.params['comment']
    if 'invalidate' in request.params:
        # task goes back to the queue
        tile.checkin = 0
    else:
        tile.checkin = tile.checkin + 1
    session.add(tile)
    return HTTPFound(location=request.route_url('job', job=job_id))

@view_config(route_name='task_unlock', permission='job')
def unlock(request):
    job_id = request.matchdict['job']
    x = request.matchdict['x']
    y = request.matchdict['y']
    session = DBSession()
    tile = session.query(Tile).get((x, y, job_id))
    tile.username = None 
    tile.checkout = None 
    session.add(tile)
    return HTTPFound(location=request.route_url('job', job=job_id))


def take(request):
    job_id = request.matchdict['job']
    if "checkin" in request.matchdict:
        checkin = request.matchdict['checkin']
    else:
        checkin = None
    session = DBSession()
    username = authenticated_userid(request)
    user = session.query(User).get(username)
    # first check if user has no task he's currently working on
    filter = and_(Tile.username==username, Tile.job_id==job_id)
    tiles = session.query(Tile).filter(filter).all()
    if len(tiles) > 0:
        request.session.flash('You already have a task to work on. Finish it before you can accept a new one.')
        return HTTPFound(location=request.route_url('job', job=job_id))

    filter = and_(Tile.checkin==checkin, Tile.job_id==job_id)
    tiles = session.query(Tile).filter(filter).all()
    filter = and_(TileHistory.username==username, TileHistory.job_id==job_id)
    # take random tile
    if checkin is not None:
        # get the tile the user worked on previously
        p = session.query(TileHistory).filter(filter).order_by(TileHistory.checkout.desc()).limit(4).all()
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
    # x / y given, selecting the tile
    else:
        tilex = request.matchdict['x']
        tiley = request.matchdict['y']
        tile = session.query(Tile).get((tilex, tiley, job_id))
    try:
        if tile is None:
            tile = tiles[random.randrange(0, len(tiles))]
        tile.username = username
        tile.checkout = datetime.now()
        session.add(tile)
        return HTTPFound(location=request.route_url('task', job=job_id, x=tile.x, y=tile.y))
    except:
        if checkin == 1:
            request.session.flash('Sorry. No task available to validate.')
        else:
            request.session.flash('Sorry. No task available to take.')
        return HTTPFound(location=request.referrer)


@view_config(route_name='task_take_random', permission='job')
def take_random(request):
    return take(request)

@view_config(route_name='task_take', permission='job')
def take_tile(request):
    return take(request)

@view_config(route_name="task_export", renderer="task.osm.mako")
def task_export(request):
    job_id = request.matchdict['job']
    x = request.matchdict['x']
    y = request.matchdict['y']
    session = DBSession()
    tile = session.query(Tile).get((x, y, job_id))
    return dict(polygon=tile.to_polygon(4326))
