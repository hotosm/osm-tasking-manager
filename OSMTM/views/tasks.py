from pyramid.httpexceptions import HTTPFound
from pyramid.httpexceptions import HTTPNotFound
from pyramid.view import view_config
from pyramid.url import route_url

from OSMTM.models import DBSession
from OSMTM.models import Tile
from OSMTM.models import User

from geojson import Feature
from geojson import dumps
from sqlalchemy.sql.expression import and_

from datetime import datetime
import random

import logging
log = logging.getLogger(__file__)

@view_config(route_name='task', renderer='task.mako', permission='edit')
def task(request):
    job_id = request.matchdict['job']
    x = request.matchdict['x']
    y = request.matchdict['y']
    session = DBSession()
    tile = session.query(Tile).get((x, y, job_id))
    if tile is None:
        return HTTPNotFound()
    polygon=tile.to_polygon()
    username = request.session.get("user")
    user = session.query(User).get(username)
    return dict(tile=tile,
            feature=dumps(polygon),
            user=user,
            job_url=request.route_url('job', id=job_id),
            done_url=request.route_url('task_done', job=job_id, x=x, y=y))

@view_config(route_name='task_done', permission='edit', renderer='json')
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
        user = session.query(User).get(request.session.get('user'))
        tile.checkin = int(user.role)
    session.add(tile)
    return HTTPFound(location=request.route_url('job', id=job_id))

@view_config(route_name='task_unlock', permission='edit')
def unlock(request):
    job_id = request.matchdict['job']
    x = request.matchdict['x']
    y = request.matchdict['y']
    session = DBSession()
    tile = session.query(Tile).get((x, y, job_id))
    tile.username = None 
    tile.checkout = None 
    session.add(tile)
    return HTTPFound(location=request.route_url('job', id=job_id))

@view_config(route_name='task_take', permission='edit')
def take(request):
    job_id = request.matchdict['job']
    session = DBSession()
    user = session.query(User).get(request.session.get('user'))
    # first check if user has no task he's currently working on
    filter = Tile.username==request.session.get('user')
    tiles = session.query(Tile).filter(filter).all()
    if len(tiles) > 0:
        request.session.flash('You already have a task to work on. Finish it before you can accept a new one.')
        return HTTPFound(location=request.route_url('job', id=job_id))

    filter = and_(Tile.checkin==int(user.role) - 1, Tile.job_id==job_id)
    tiles = session.query(Tile).filter(filter).all()
    try:
        tile = tiles[random.randrange(0, len(tiles))]
        tile.username = request.session.get("user")
        tile.checkout = datetime.now()
        session.add(tile)
        return HTTPFound(location=request.route_url('task', job=job_id, x=tile.x, y=tile.y))
    except:
        # FIXME # no available tile
        request.session.flash('Sorry. No task available for your role currently')
        return HTTPFound(location=request.referrer)
