import tempfile
import urllib

from pyramid.view import view_config
from pyramid.httpexceptions import (HTTPBadRequest)
from pyramid.response import Response

from imposm.parser import OSMParser
from shapely.geometry import Polygon

@view_config(route_name='osmproxy')
def osmproxy(request):
    url = request.params.get("url")
    if url is None:
        return HTTPBadRequest()

    # instantiate parser and parser and start parsing
    parser = RelationParser()
    p = OSMParser(concurrency=4,
            coords_callback=parser.get_coords,
            relations_callback=parser.get_relations,
            ways_callback=parser.get_ways)

    temp = tempfile.NamedTemporaryFile(suffix='.osm')
    urllib.urlretrieve(url, temp.name)
    p.parse(temp.name)
    temp.close()

    ordered_ways = []
    r = parser.relation
    prev = parser.ways[r[0]]
    ordered_ways.append(prev)
    r.pop(0)
    while len(r):
        match = False
        for i in range(0, len(r)):
            w = parser.ways[r[i]]
            # first node of the next way matches the last of the previous one
            if w[0] == prev[len(prev) - 1]:
                match = w
            # or maybe the way has to be reversed 
            elif w[len(w) - 1] == prev[len(prev) - 1]:
                match = w[::-1]
            if match:
                prev = match
                ordered_ways.append(match)
                r.pop(i)
                break

    # now that ways are correctly ordered, we can create a unique geometry
    nodes = []
    for way in ordered_ways:
        for node in way:
            nodes.append(parser.nodes[node])
    # make sure that first and last node are similar
    if nodes[0] != nodes[len(nodes) - 1]:
        raise
    # create a shapely polygon with the nodes
    polygon = Polygon(nodes)
    return Response(polygon.to_wkt())

# simple class that handles the parsed OSM data.
class RelationParser(object):
    def __init__(self):
        self.nodes = {} 
        self.ways =  {} 
        self.relation = [] 

    def get_coords(self, coords):
        # callback method for nodes
        for osm_id, lon, lat in coords:
            self.nodes[osm_id] = (lon, lat)

    def get_ways(self, ways):
        # callback method for ways
        for way in ways:
            self.ways[way[0]] = way[2]

    def get_relations(self, relations):
        # callback method for relations
        # there should be only one in our case
        if len(relations) == 0:
            return
        for member in relations[0][2]:
            if member[1] == 'way':
                self.relation.append(member[0])
