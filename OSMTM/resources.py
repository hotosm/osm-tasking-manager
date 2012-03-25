from pyramid.httpexceptions import HTTPFound
from pyramid.url import route_url
from pyramid.security import Allow, Deny, Everyone
from models import Job, User, RootFactory, DBSession
from OSMTM.utils import TileBuilder
from OSMTM.utils import max

class JobFactory(RootFactory):
    def __init__(self, request):
        session = DBSession()
        job_id = request.matchdict['job']
        job = session.query(Job).get(job_id)
        if job is not None and job.is_private:
            acl = [
                (Allow, 'job:'+job_id, 'job'),
                (Allow, 'group:admin', 'job'),
                (Deny, Everyone, 'job'),
            ]
            self.__acl__ = acl + list(self.__acl__)


import decimal
import datetime

from pyramid.asset import abspath_from_asset_spec
from pyramid.httpexceptions import HTTPBadRequest

from mapnik import (MemoryDatasource, Context, Path, Feature, Box2d, Map, Image,
                     load_map, render, render_layer, Grid)
import itertools

import json


class MapnikRendererFactory:
    def __init__(self, info):
        self.mapfile = abspath_from_asset_spec(info.name)

    def _create_datasource(self, tiles):
        ids = itertools.count(0)
        context = Context()
        context.push('foo')
        ds = MemoryDatasource()
        for tile in tiles:
            #properties = dict(feature.properties)
            f = Feature(context, ids.next())
            f['username'] = tile[0].username
            f['checkin'] = tile[0].checkin
            f['x'] = tile[0].x
            f['y'] = tile[0].y
            ds.add_feature(f)
            f.add_geometries_from_wkb(str(tile.geometry.geom_wkb))
        return ds

    def _set_layer_in_map(self, _map, layer_name):
        layer = None
        for i, l in enumerate(_map.layers):
            if l.name != layer_name:
                del _map.layers[i]
            else:
                layer = l
        return layer
    
    def __call__(self, value, system):
        request = system['request']

        if not isinstance(value, tuple):
            value = (None, value);

        layer_name, collection = value

        # get image width and height
        width = 256 
        height = 256

        # get image bbox
        z = request.matchdict['z']
        x = request.matchdict['x']
        y = request.matchdict['y']
        step = max/(2**(int(z) - 1))
        tb = TileBuilder(step)
        (xmin, ymax, xmax, ymin) = tb.create_square(int(x), int(y))
        bbox = Box2d(xmin, ymax, xmax, ymin)

        m = Map(width, height)
        load_map(m, self.mapfile)

        if len(m.layers) == 0:
            raise ValueError('no layer in the mapnik map')

        # if no layer_name is provided then, by convention, use
        # the first layer in the mapnik map
        if layer_name is None:
            layer_name = m.layers[0].name

        layer = self._set_layer_in_map(m, layer_name)
        layer.datasource = self._create_datasource(collection)

        m.zoom_to_box(bbox or layer.envelope())

        format = request.matchdict['format']
        if format == 'png':
            im = Image(width, height)
            render(m, im, 1, 1)

            request.response_content_type = 'image/png'
            return im.tostring('png')
        
        elif format == 'json':
            grid = Grid(width, height)
            render_layer(m, grid, layer=0, fields=['x', 'y', 'username', 'checkin'])
            utfgrid = grid.encode('utf', resolution=4)
            return json.dumps(utfgrid)

