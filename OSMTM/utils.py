import sys, os, time
from shapely.geometry import Polygon
from shapely.geometry import MultiPolygon
from math import floor, ceil, pi, atan, exp


# Maximum resolution
MAXRESOLUTION = 156543.0339

# X/Y axis limit
max = MAXRESOLUTION*256/2

class TileBuilder(object):
    def __init__(self, parameter):
        self.a = parameter
    
    def create_square(self, i, j, srs=900913):
        """
        creates a Shapely Polygon geometry representing tile indexed by (i,j) in OSMQA v2 with dimension a
        """
        xmin = i*self.a-max
        ymin = max-j*self.a
        xmax = (i+1)*self.a-max
        ymax = max-(j+1)*self.a
        if srs == 4326:
            xmin, ymin = transform_900913_to_4326(xmin, ymin)
            xmax, ymax = transform_900913_to_4326(xmax, ymax)
        return (xmin, ymin, xmax, ymax)

# This method finds the tiles that intersect the given geometry for the given zoom
def get_tiles_in_geom(geom, z):
    xmin=geom.bounds[0]
    ymin=geom.bounds[1]
    xmax=geom.bounds[2]
    ymax=geom.bounds[3]

    # tile size (in meters) at the required zoom level
    step = max/(2**(z - 1))

    xminstep = int(floor((xmin+max)/step))
    xmaxstep = int(ceil((xmax+max)/step))
    ymaxstep = int(floor((max-ymin)/step))
    yminstep = int(ceil((max-ymax)/step))

    tb = TileBuilder(step)
    polygons = []
    tiles = []
    for i in range(xminstep,xmaxstep+1):
        for j in range(yminstep-1,ymaxstep+1):
            (xmin, ymin, xmax, ymax) = tb.create_square(i, j)
            polygon = Polygon(((xmin, ymin), (xmin, ymax),
                (xmax, ymax), (xmax, ymin),
                (xmin, ymin)))

            if geom.intersects(polygon):
                polygons.append(polygon)
                tiles.append((i, j))
    return tiles

def transform_900913_to_4326(x, y):
    """Transforms pair of mercator coordinates to lonlat"""
    lon = (x / 20037508.34) * 180;
    lat = (y / 20037508.34) * 180;

    lat = 180/pi * (2 * atan(exp(lat * pi / 180)) -
                         pi / 2);
    return lon, lat
