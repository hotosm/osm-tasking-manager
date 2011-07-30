import unittest
from pyramid.config import Configurator
from pyramid import testing

def _initTestingDB():
    from sqlalchemy import create_engine
    from OSMTM.models import initialize_sql
    session = initialize_sql(create_engine('sqlite:///:memory:'))
    return session

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
        

#class TestMyView(unittest.TestCase):
    #def setUp(self):
        #self.config = testing.setUp()
        #_initTestingDB()

    #def tearDown(self):
        #testing.tearDown()

    #def test_it(self):
        #from OSMTM.views import my_view
        #request = testing.DummyRequest()
        #info = my_view(request)
        #self.assertEqual(info['root'].name, 'root')
        #self.assertEqual(info['project'], 'OSMTM')
