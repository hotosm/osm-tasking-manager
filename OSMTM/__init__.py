from pyramid_beaker import session_factory_from_settings
from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from papyrus.renderers import GeoJSON

from OSMTM.models import initialize_sql, group_membership

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """

    settings['mako.directories'] = 'OSMTM:templates'
    engine = engine_from_config(settings, 'sqlalchemy.')
    admin_user = settings['admin_user']
    initialize_sql(engine, admin_user)
    authn_policy = AuthTktAuthenticationPolicy(
            secret='super_secret', callback=group_membership)
    authz_policy = ACLAuthorizationPolicy()
    config = Configurator(settings=settings,
            root_factory='OSMTM.models.RootFactory',
            authentication_policy=authn_policy,
            authorization_policy=authz_policy)

    session_factory = session_factory_from_settings(settings)
    config.set_session_factory(session_factory)

    config.add_static_view('static', 'OSMTM:static', cache_max_age=3600)

    config.add_view('OSMTM.views.crossdomain.crossdomain_view', name='crossdomain.xml')
    config.add_route('crossdomain', '/crossdomain.xml',
                     view='OSMTM.views.crossdomain.crossdomain_view')
    config.add_route('home', '/')
    config.add_route('about', '/about')
    config.add_route('tour', '/tour')
    config.add_route('login', '/login')
    config.add_route('logout', '/logout')
    config.add_route('admin', '/admin')
    config.add_route('job_new', '/job/new')
    config.add_route('job_geom', '/job/{job}.json')
    config.add_route('job_tiles', '/job/{job}/tiles')
    config.add_route('job_tiles_status', '/job/{job}/tiles_status')
    config.add_route('job', '/job/{job}', factory='OSMTM.resources.JobFactory')
    config.add_route('job_edit', '/job/{job}/edit', factory='OSMTM.resources.JobFactory')
    config.add_route('job_feature', '/job/{job}/feature', factory='OSMTM.resources.JobFactory')
    config.add_route('job_archive', '/job/{job}/archive', factory='OSMTM.resources.JobFactory')
    config.add_route('job_publish', '/job/{job}/publish', factory='OSMTM.resources.JobFactory')
    config.add_route('job_users', '/job/{job}/users', factory='OSMTM.resources.JobFactory')
    config.add_route('job_tags', '/job/{job}/tags', factory='OSMTM.resources.JobFactory')
    config.add_route('job_export', '/job/{job}/export', factory='OSMTM.resources.JobFactory')
    config.add_route('job_preset', '/job/{job}/preset', factory='OSMTM.resources.JobFactory')
    config.add_route('task_take_random', '/job/{job}/task/take/{checkin}', factory='OSMTM.resources.JobFactory')
    config.add_route('task', '/job/{job}/task/{x}/{y}/{zoom}', factory='OSMTM.resources.JobFactory')
    config.add_route('task_unlock', '/job/{job}/task/{x}/{y}/{zoom}/unlock', factory='OSMTM.resources.JobFactory')
    config.add_route('task_done', '/job/{job}/task/{x}/{y}/{zoom}/done', factory='OSMTM.resources.JobFactory')
    config.add_route('task_take', '/job/{job}/task/{x}/{y}/{zoom}/take', factory='OSMTM.resources.JobFactory')
    config.add_route('task_export', '/job/{job}/task/{x}/{y}/{zoom}/export.osm', factory='OSMTM.resources.JobFactory')
    config.add_route('task_split', '/job/{job}/task/{x}/{y}/{zoom}/split', factory='OSMTM.resources.JobFactory')
    config.add_route('license_new', '/license/new')
    config.add_route('license', '/license/{license}')
    config.add_route('licenses', '/licenses')
    config.add_route('license_edit', '/license/{license}/edit')
    config.add_route('license_delete', '/license/{license}/delete')
    config.add_route('user_add', '/user/add')
    config.add_route('user', '/user/{id}')
    config.add_route('user_update', '/user/{id}/update')
    config.add_route('users', '/users')
    config.add_route('osmproxy', '/osmproxy')
    config.add_route('oauth_callback', '/oauth_callback')
    config.add_view('OSMTM.views.security.login',
            renderer='forbidden.mako',
            context='pyramid.exceptions.Forbidden')

    config.add_renderer('geojson', GeoJSON())

    config.scan()
    return config.make_wsgi_app()

