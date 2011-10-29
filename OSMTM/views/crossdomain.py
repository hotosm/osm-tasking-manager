import os
from webob import Response

def crossdomain_view(request):
    here = os.path.dirname(__file__)
    file = open(os.path.join(here, '../static', 'crossdomain.xml'))
    return Response(content_type='text/xml', app_iter=file)
