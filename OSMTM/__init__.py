from pyramid_beaker import session_factory_from_settings
from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy

from OSMTM.models import initialize_sql, group_membership

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """

    settings['mako.directories'] = 'OSMTM:templates'
    engine = engine_from_config(settings, 'sqlalchemy.')
    initialize_sql(engine)
    authn_policy = AuthTktAuthenticationPolicy(
            secret='super_secret', callback=group_membership)
    authz_policy = ACLAuthorizationPolicy()
    config = Configurator(settings=settings,
            root_factory='OSMTM.models.RootFactory',
            authentication_policy=authn_policy,
            authorization_policy=authz_policy)

    session_factory = session_factory_from_settings(settings)
    config.set_session_factory(session_factory)

    config.add_static_view('static', 'OSMTM:static')
    config.add_route('home', '/')
    config.add_route('login', '/login')
    config.add_route('logout', '/logout')
    config.add_route('job_new', '/job/new')
    config.add_route('job', '/job/{id}')
    config.add_route('task', '/job/{job}/task/{x}/{y}')
    config.add_route('task_unlock', '/job/{job}/task/{x}/{y}/unlock')
    config.add_route('task_done', '/job/{job}/task/{x}/{y}/done')
    config.add_route('task_take', '/job/{job}/take')
    config.add_route('profile', '/profile')
    config.add_route('profile_update', '/profile/update')
    config.add_route('user', '/user/{id}')
    config.add_route('user_update', '/user/{id}/update')
    config.add_route('users', '/users')
    config.add_route('osmproxy', '/osmproxy')
    config.add_route('oauth_callback', '/oauth_callback')
    config.add_view('OSMTM.views.security.login',
            renderer='login.mako',
            context='pyramid.exceptions.Forbidden')
    config.scan()
    return config.make_wsgi_app()

