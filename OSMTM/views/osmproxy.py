from urlparse import urlparse
from httplib2 import Http

from pyramid.view import view_config
from pyramid.httpexceptions import (HTTPForbidden, HTTPBadRequest,
                                    HTTPBadGateway, HTTPNotAcceptable)
from pyramid.response import Response



allowed_hosts = (
    "www.openstreetmap.org",
    "www.google.com"
    )

@view_config(route_name='osmproxy')
def osmproxy(request):
    url = request.params.get("url")
    if url is None:
        return HTTPBadRequest()

    # check for full url
    parsed_url = urlparse(url)
    if not parsed_url.netloc or parsed_url.scheme not in ("http", "https"):
        return HTTPBadRequest()

    # forward request to target (without Host Header)
    http = Http()
    h = dict(request.headers)
    h.pop("Host", h)
    try:
        resp, content = http.request(url)
    except:
        return HTTPBadGateway()

    # check for allowed content types
    if resp.has_key("content-type"):
        ct = resp["content-type"]
        # allow any content type from allowed hosts (any port)
        if not parsed_url.netloc in allowed_hosts:
            return HTTPForbidden()
    else:
        return HTTPNotAcceptable()

    response = Response(content, status=resp.status,
                        headers={"Content-Type": ct})

    return response
