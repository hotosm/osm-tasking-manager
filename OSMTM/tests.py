import unittest
from pyramid.config import Configurator
from pyramid import testing

def _initTestingDB():
    from sqlalchemy import create_engine
    from OSMTM.models import initialize_sql, populate
    session = initialize_sql(create_engine('sqlite:///:memory:'))
    return session

def _registerRoutes(config):
    config.add_route('job', 'job/{job}')
    config.add_route('job_edit', 'job/{job}/edit')

class TileModelTests(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()
        _initTestingDB()

    def tearDown(self):
        testing.tearDown()

    def _getTargetClass(self):
        from OSMTM.models import Tile
        return Tile

    def _makeOne(self, x=1, y=2, zoom=1):
        return self._getTargetClass()(x, y, zoom)

    def test_constructor(self):
        instance = self._makeOne()
        self.assertEqual(instance.x, 1)
        self.assertEqual(instance.y, 2)
        self.assertEqual(instance.zoom, 1)
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

    def _makeOne(self, title='SomeTitle',
            geometry='POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))', zoom=1):
        return self._getTargetClass()(title, geometry, zoom)

    def test_constructor(self):
        instance = self._makeOne()
        self.assertEqual(instance.title, 'SomeTitle')
        self.assertEqual(instance.status, 1)
        self.assertEqual(instance.geometry, 'POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))')
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

    def _makeOne(self, username=u'bar'):
        user = self._getTargetClass()(username)
        return user

    def test_constructor(self):
        instance = self._makeOne()
        self.assertEqual(instance.username, u'bar')

class TestHome(unittest.TestCase):
    def setUp(self):
        self.config = testing.setUp()
        _initTestingDB()

    def tearDown(self):
        testing.tearDown()

    def test_it(self):
        from OSMTM.views.views import home 
        request = testing.DummyRequest()
        self.config.testing_securitypolicy(userid=u'foo')
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
            'title':u'NewJob',
            'geometry':u'POLYGON((0 0, 100 0, 100 100, 0 100, 0 0))',
            'zoom':20
        }
        response = job_new(request)
        self.assertEqual(response.location, 'http://example.com/job/2/edit')
        from OSMTM.models import Job
        self.assertEqual(len(self.session.query(Job).get(2).tiles), 9)

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
        self.config.testing_securitypolicy(userid=u'foo')
        request.matchdict = {'job': 1}
        info = job(request)
        from OSMTM.models import Job
        self.assertEqual(info['job'], self.session.query(Job).get(1))

class FunctionalTests(unittest.TestCase):

    def setUp(self):
        from OSMTM import main
        settings = {
            'sqlalchemy.url': 'sqlite:///:memory:',
            'admin_user': u'admin_user'
        }
        self.app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(self.app)

        #from OSMTM.models import populate
        #populate(u'admin_user')

    def __remember(self, username):
        from pyramid.security import remember
        request = testing.DummyRequest(environ={'SERVER_NAME': 'servername'})
        request.registry = self.app.registry
        headers = remember(request, username, max_age=2*7*24*60*60)
        return {'Cookie': headers[0][1].split(';')[0]}

    def __forget(self):
        from pyramid.security import forget
        request = testing.DummyRequest(environ={'SERVER_NAME': 'servername'})
        request.registry = self.app.registry
        forget(request)

    def test_root(self):
        res = self.testapp.get('/', status=200)
        self.failUnless('About The Tasking Manager' in res.body)
        self.failUnless('Login' in res.body)

    def test_authenticated(self):
        headers = self.__remember('foo')
        try:
            res = self.testapp.get('/', headers=headers, status=200)
        finally:
            self.__forget()
        self.failUnless('You are foo' in res.body)

    def test_user_authenticated(self):
        headers = self.__remember('foo')
        try:
            res = self.testapp.get('/', headers=headers, status=200)
        finally:
            self.__forget()
        self.assertFalse('<a href="http://localhost:6543/users">Users</a>' in res.body)

    def test_user_users(self):
        headers = self.__remember('foo')
        try:
            res = self.testapp.get('/users', headers=headers, status=200)
        finally:
            self.__forget()

    def test_user_profile(self):
        headers = self.__remember('foo')
        try:
            res = self.testapp.get('/user/foo', headers=headers, status=200)
        finally:
            self.__forget()
        self.assertTrue('Forbidden' in res.body)

    def test_admin_authenticated(self):
        headers = self.__remember('admin_user')
        try:
            res = self.testapp.get('/', headers=headers, status=200)
        finally:
            self.__forget()
        self.assertTrue('<a id="logout_link" href="http://localhost/logout">Log Out</a>' in res.body)

    def test_about(self):
        headers = self.__remember('foo')
        try:
            res = self.testapp.get('/about', headers=headers, status=200)
        finally:
            self.__forget()
        self.assertEquals(res.html.head.title.string, 'OSM Tasking Manager - About')

    def test_nextview(self):
        headers = self.__remember('foo')
        from OSMTM.models import DBSession, User
        session = DBSession()
        try:
            res = self.testapp.get('/profile/nextview', headers=headers, status=200)
        finally:
            self.__forget()

        try:
            res = self.testapp.post('/profile/nextview',
                    params={'accepted_terms': 'I AGREE', 'redirect': 'http://localhost/'},
                    headers=headers, status=302)
        finally:
            self.__forget()

        user = session.query(User).get('foo')
        self.assertTrue(user.accepted_nextview)
        try:
            res = self.testapp.post('/profile/nextview',
                    params={'accepted_terms': 'blah', 'redirect': 'http://localhost/'},
                    headers=headers, status=302)
        finally:
            self.__forget()

        from OSMTM.models import DBSession, User
        session = DBSession()
        user = session.query(User).get('foo')
        self.assertFalse(user.accepted_nextview)

    def test_admin_user(self):
        headers = self.__remember('admin_user')
        try:
            res = self.testapp.get('/user/foo', headers=headers, status=200)
            self.assertTrue('Profile for foo' in res.body)
            self.assertFalse(res.html.find(id='admin').checked)
        finally:
            self.__forget()

        try:
            res = self.testapp.get('/user/admin_user', headers=headers, status=200)
            self.assertTrue('Profile for admin_user' in res.body)
            self.assertTrue(res.html.find(id='admin')['checked'] == 'checked')
        finally:
            self.__forget()

    def test_admin_user_update(self):
        headers = self.__remember('admin_user')
        try:
            res = self.testapp.get('/user/foo',
                    headers=headers, status=200)
            res.form['admin'].checked = True 
            res2 = res.form.submit('form.submitted', headers=headers,
                    status=302)
            res3 = res2.follow(headers=headers, status=200)
            self.assertTrue('Profile for foo' in res3.body)
            self.assertTrue(res3.form['admin'].checked)
        finally:
            self.__forget()

    ##########
    ## tasks #
    ##########

    def test_task_not_found(self):
        headers = self.__remember('foo')
        try:
            res = self.testapp.get('/job/1/task/1/1', headers=headers,
                    status=404)
        finally:
            self.__forget()

    def test_task(self):
        headers = self.__remember('foo')
        try:
            res = self.testapp.get('/job/1/task/32774/42026/16', headers=headers,
                    status=302)
            self.assertEquals(res.location, 'http://localhost/job/1')
        finally:
            self.__forget()

    def test_task_take(self):
        headers = self.__remember('foo')
        try:
            res = self.testapp.get('/job/1/task/32774/42026/16/take', headers=headers,
                    status=302)
            self.assertEquals(res.location,
                    'http://localhost/job/1/task/32774/42026/16')
            res2 = self.testapp.get(res.location, headers=headers,
                    status=200)

            form = res2.form
            res3 = form.submit(headers=headers, status=200)
            from OSMTM.models import DBSession, Tile
            session = DBSession()
            tile = session.query(Tile).get((32774, 42026, 16, 1))
            self.assertEquals(tile.checkin, 1)

            res5 = form.submit(headers=headers)
            tile = session.query(Tile).get((32774, 42026, 16, 1))
            self.assertEquals(tile.checkin, 1)
        finally:
            self.__forget()
