from pyramid.security import Allow, Deny, Everyone
from models import Job, User, RootFactory, DBSession

class JobFactory(RootFactory):
    def __init__(self, request):
        session = DBSession()
        job_id = request.matchdict['job']
        job = session.query(Job).get(job_id)
        if job.is_private:
            acl = [
                (Allow, ('group:admin', 'job:'+job_id), 'job'),
                (Deny, Everyone, 'job'),
            ]
            self.__acl__ = acl + list(self.__acl__)
