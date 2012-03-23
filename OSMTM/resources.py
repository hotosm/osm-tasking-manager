from pyramid.httpexceptions import HTTPFound
from pyramid.url import route_url
from pyramid.security import Allow, Deny, Everyone
from models import Job, User, RootFactory, DBSession

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
                     load_map, render_layer, Grid)
import itertools
from shapely.geometry import asShape

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
            #for k,v in properties.iteritems():
                #if isinstance(v, decimal.Decimal):
                    #f[k] = float(v)
                #elif isinstance(v, (datetime.date, datetime.datetime)):
                    #f[k] = str(v)
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
        try:
            width = int(request.params.get('img_width', 600))
        except:
            request.response_status = 400
            return 'incorrect width'
        try:
            height = int(request.params.get('img_height', 400))
        except:
            request.response_status = 400
            return 'incorrect height'

        # get image bbox
        bbox = request.params.get('img_bbox')
        if bbox:
            try:
                bbox = map(float, bbox.split(','))
            except ValueError:
                request.response_status = 400
                return 'incorrect img_bbox'
            bbox = Box2d(*bbox)

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

        grid = Grid(width, height)
        render_layer(m, grid, layer=0, fields=['username'])
        utfgrid = grid.encode('utf', resolution=4)

        #im = Image(width, height)
        #render(m, im, 1, 1)

        #request.response_content_type = 'image/png'
        return json.dumps(utfgrid)
        #return im.tostring('png')
