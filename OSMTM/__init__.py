from pyramid_beaker import session_factory_from_settings
from pyramid.config import Configurator
from sqlalchemy import engine_from_config

from OSMTM.models import initialize_sql

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """

    settings['mako.directories'] = 'OSMTM:templates'
    engine = engine_from_config(settings, 'sqlalchemy.')
    initialize_sql(engine)
    config = Configurator(settings=settings)

    session_factory = session_factory_from_settings(settings)
    config.set_session_factory(session_factory)

    config.add_static_view('static', 'OSMTM:static')
    config.add_route('home', '/')
    config.add_route('login', '/login')
    config.add_route('logout', '/logout')
    config.add_route('job_new', '/job/new')
    config.add_route('job', '/job/{id}')
    config.add_route('user', '/profile')
    config.add_route('osmproxy', '/osmproxy')
    config.add_route('oauth_callback', '/oauth_callback')
    config.scan()
    return config.make_wsgi_app()

