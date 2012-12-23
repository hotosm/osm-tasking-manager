from pyramid.httpexceptions import HTTPFound
from pyramid.view import view_config
from pyramid.url import route_url

from pyramid.security import remember, forget, authenticated_userid

from OSMTM.models import DBSession
from OSMTM.models import User 
from OSMTM.models import License 

@view_config(route_name='license', renderer='license.mako', permission='edit')
def license(request):
    session = DBSession()
    id = request.matchdict['license']
    license = session.query(License).get(id)

    username = authenticated_userid(request)
    user = session.query(User).get(username)
    redirect = request.params.get("redirect", request.route_url("home"))
    if "accepted_terms" in request.params:
        if request.params["accepted_terms"] == "I AGREE":
            user.accepted_licenses.append(license)
        elif license in user.accepted_licenses:
            user.accepted_licenses.remove(license)
        return HTTPFound(location=redirect)
    else:
        return dict(user=user, license=license, redirect=redirect)

@view_config(route_name='license_new', permission='admin')
def license_new(request):
    session = DBSession()
    license = License()

    session.add(license)
    session.flush()
    return HTTPFound(location = route_url('license_edit', request, license=license.id))

@view_config(route_name='license_edit', renderer='license.edit.mako',
        permission='admin')
def license_edit(request):
    id = request.matchdict['license']
    session = DBSession()
    license = session.query(License).get(id)

    if 'form.submitted' in request.params:
        license.name = request.params['name']
        license.description = request.params['description']

        session.add(license)
        request.session.flash('License updated!')
    return dict(license=license)
