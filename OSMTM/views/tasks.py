from pyramid.httpexceptions import HTTPFound
from pyramid.httpexceptions import HTTPNotFound
from pyramid.view import view_config
from pyramid.url import route_url

from OSMTM.models import DBSession
from OSMTM.models import Tile
from OSMTM.models import User

from geojson import Feature
from geojson import dumps

from datetime import datetime

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
    return dict(tile=tile,
            feature=dumps(polygon),
            job_url=request.route_url('job', id=job_id),
            take_url=request.route_url('task_take', job=job_id, x=x, y=y),
            done_url=request.route_url('task_done', job=job_id, x=x, y=y))

@view_config(route_name='task_take', permission='edit', renderer='json')
def take(request):
    job_id = request.matchdict['job']
    x = request.matchdict['x']
    y = request.matchdict['y']
    session = DBSession()
    tile = session.query(Tile).get((x, y, job_id))
    tile.username = request.session.get("user")
    tile.checkout = datetime.now()
    session.add(tile)
    return HTTPFound(location=request.route_url('task', job=job_id, x=x, y=y))

@view_config(route_name='task_done', permission='edit', renderer='json')
def done(request):
    job_id = request.matchdict['job']
    x = request.matchdict['x']
    y = request.matchdict['y']
    session = DBSession()
    tile = session.query(Tile).get((x, y, job_id))
    tile.username = None 
    tile.checkout = None 
    user = session.query(User).get(request.session.get('user'))
    tile.checkin = int(user.role) + 1
    session.add(tile)
    log.info(tile.checkin)
    return HTTPFound(location=request.route_url('job', id=job_id))
