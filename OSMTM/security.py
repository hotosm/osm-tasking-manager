from pyramid.interfaces import IAuthenticationPolicy
from pyramid.authentication import CallbackAuthenticationPolicy
from pyramid.security import Authenticated
from zope.interface import implements

class OSMTMAuthenticationPolicy(CallbackAuthenticationPolicy):

    implements(IAuthenticationPolicy)

    def __init__(self, callback=None):
        self.callback = callback

    def unauthenticated_userid(self, request):
        return request.session.get('user')

    def remember(self, request, principal, **kw):
        return []

    def forget(self, request):
        return []
