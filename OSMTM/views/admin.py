from pyramid.view import view_config
from pyramid.url import route_url

from pyramid.security import remember, forget, authenticated_userid

from OSMTM.models import License 

@view_config(route_name='admin', renderer='admin.mako', permission='edit')
def admin(request):
    return dict()
