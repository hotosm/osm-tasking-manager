from pyramid.httpexceptions import HTTPFound
from pyramid.view import view_config
from pyramid.url import route_url

from OSMTM.models import DBSession
from OSMTM.models import Tile

from geojson import Feature
from geojson import dumps

import logging
log = logging.getLogger(__file__)

@view_config(route_name='task', renderer='task.mako', permission='edit')
def task(request):
    job_id = request.matchdict['job']
    x = request.matchdict['x']
    y = request.matchdict['y']
    session = DBSession()
    tile = session.query(Tile).get((x, y, job_id))
    polygon=tile.to_polygon()
    log.info(tile.to_polygon())
    return dict(tile=tile, feature=dumps(polygon)) 
