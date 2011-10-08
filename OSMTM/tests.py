import unittest
from pyramid.config import Configurator
from pyramid import testing

def _initTestingDB():
    from sqlalchemy import create_engine
    from OSMTM.models import initialize_sql
    session = initialize_sql(create_engine('sqlite:///:memory:'))
    return session

def _registerRoutes(config):
    config.add_route('job', 'job/{job}')

class TileModelTests(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()
        _initTestingDB()

    def tearDown(self):
        testing.tearDown()

    def _getTargetClass(self):
        from OSMTM.models import Tile
        return Tile

    def _makeOne(self, x=1, y=2):
        return self._getTargetClass()(x, y)

    def test_constructor(self):
        instance = self._makeOne()
        self.assertEqual(instance.x, 1)
        self.assertEqual(instance.y, 2)
        self.assertEqual(instance.checkin, 0)

class JobModelTests(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()
        _initTestingDB()

    def tearDown(self):
        testing.tearDown()

    def _getTargetClass(self):
        from OSMTM.models import Job
        return Job

    def _makeOne(self, title='SomeTitle', description='some description', geometry='some geometry', workflow='some workflow', zoom=1):
        return self._getTargetClass()(title, description, geometry, workflow, zoom)

    def test_constructor(self):
        instance = self._makeOne()
        self.assertEqual(instance.title, 'SomeTitle')
        self.assertEqual(instance.description, 'some description')
        self.assertEqual(instance.geometry, 'some geometry')
        self.assertEqual(instance.workflow, 'some workflow')
        self.assertEqual(instance.zoom, 1)

class UserModelTests(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()
        _initTestingDB()

    def tearDown(self):
        testing.tearDown()

    def _getTargetClass(self):
        from OSMTM.models import User
        return User

    def _makeOne(self, username='foo', role=2):
        return self._getTargetClass()(username, role)

    def test_constructor(self):
        instance = self._makeOne()
        self.assertEqual(instance.username, 'foo')
        self.assertEqual(instance.role, 2)

class TestHome(unittest.TestCase):
    def setUp(self):
        self.config = testing.setUp()
        _initTestingDB()

    def tearDown(self):
        testing.tearDown()

    def test_it(self):
        from OSMTM.views.views import home 
        request = testing.DummyRequest()
        self.config.testing_securitypolicy(userid='foo')
        info = home(request)
        self.assertEqual(len(info['jobs']), 1)
        self.assertEqual(info['admin'], False)

class TestJobNew(unittest.TestCase):
    
    def setUp(self):
        self.config = testing.setUp()
        self.session = _initTestingDB()

    def tearDown(self):
        testing.tearDown()

    def test_it(self):
        _registerRoutes(self.config)
        from OSMTM.views.jobs import job_new
        request = testing.DummyRequest()
        request.params = {
            'form.submitted': True,
            'title':'NewJob',
            'description':'SomeDescription',
            'geometry':'POLYGON((0 0, 100 0, 100 100, 0 100, 0 0))',
            'workflow':'SomeWorflow',
            'imagery':'',
            'zoom':20
        }
        response = job_new(request)
        self.assertEqual(response.location, 'http://example.com/job/2')
        from OSMTM.models import Job
        self.assertEqual(len(self.session.query(Job).get(2).tiles),
            9)

class TestJob(unittest.TestCase):
    
    def setUp(self):
        self.config = testing.setUp()
        self.session = _initTestingDB()

    def tearDown(self):
        testing.tearDown()

    def test_it(self):
        _registerRoutes(self.config)
        from OSMTM.views.jobs import job
        request = testing.DummyRequest()
        self.config.testing_securitypolicy(userid='foo')
        request.matchdict = {'job': 1}
        info = job(request)
        from OSMTM.models import Job
        self.assertEqual(info['job'], self.session.query(Job).get(1))
