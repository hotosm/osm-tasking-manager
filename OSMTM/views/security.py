from pyramid.security import authenticated_userid

def login(request):
    return dict(user=authenticated_userid(request))
