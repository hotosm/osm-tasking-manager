import transaction

from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Unicode
from sqlalchemy import Boolean
from sqlalchemy import DateTime
from sqlalchemy import Table
from sqlalchemy import Column
from sqlalchemy import ForeignKey

from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import relationship

from zope.sqlalchemy import ZopeTransactionExtension

from pyramid.security import Allow
from pyramid.security import Everyone
from pyramid.security import Authenticated

from OSMTM.utils import TileBuilder
from OSMTM.utils import max 

from OSMTM.history_meta import VersionedMeta, VersionedListener
from OSMTM.history_meta import _history_mapper 

DBSession = scoped_session(sessionmaker(extension=[ZopeTransactionExtension(), VersionedListener()]))
Base = declarative_base()

class RootFactory(object):
    __acl__ = [ (Allow, Everyone, 'view'),
                (Allow, Authenticated, 'edit'),
                (Allow, Authenticated, 'job'),
                (Allow, 'group:admin', 'admin') ]
    def __init__(self, request):
        pass

class Tile(Base):
    __metaclass__ = VersionedMeta
    __tablename__ = "tiles"
    x = Column(Integer, primary_key=True)
    y = Column(Integer, primary_key=True)
    job_id = Column(Integer, ForeignKey('jobs.id'), primary_key=True)
    username = Column(Unicode, ForeignKey('users.username'))
    checkout = Column(DateTime)
    checkin = Column(Integer)
    comment = Column(Unicode)

    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.checkin = 0

    def to_polygon(self, srs=900913):
        z = self.job.zoom
        # tile size (in meters) at the required zoom level
        step = max/(2**(z - 1))
        tb = TileBuilder(step)
        return tb.create_square(self.x, self.y, srs)

TileHistory = Tile.__history_mapper__.class_

job_whitelist_table = Table('job_whitelists', Base.metadata,
    Column('job_id', Integer, ForeignKey('jobs.id')),
    Column('user_id', Unicode, ForeignKey('users.username'))
)

class User(Base):
    __tablename__ = "users"
    username = Column(Unicode, primary_key=True)
    accepted_nextview = Column(Boolean)
    admin = Column(Boolean)
    task = relationship(Tile, backref='user')

    def __init__(self, username, admin=False, accepted_nextview=False):
        self.username = username
        self.accepted_nextview = accepted_nextview
        self.admin = admin

    def is_admin(self):
        return self.admin == True

class Job(Base):
    """ The SQLAlchemy declarative model class for a Page object. """
    __tablename__ = 'jobs'
    id = Column(Integer, primary_key=True)
    title = Column(Unicode, unique=True)
    description = Column(Unicode)
    geometry = Column(Unicode)
    workflow = Column(Unicode)
    imagery = Column(Unicode)
    zoom = Column(Integer)
    is_private = Column(Boolean)
    requires_nextview = Column(Boolean)
    tiles = relationship(Tile, backref='job', cascade="all, delete, delete-orphan")
    users = relationship(User,
                secondary=job_whitelist_table,
                backref='private_jobs')

    def __init__(self, title=None, description=None, geometry=None,
                 workflow=None, zoom=None, is_private=False, imagery=None,
                 requires_nextview=False):
        self.title = title
        self.description = description
        self.geometry = geometry
        self.workflow = workflow
        self.imagery = imagery
        self.zoom = zoom
        self.is_private = is_private
        self.requires_nextview = requires_nextview

def group_membership(username, request):
    session = DBSession()
    user = session.query(User).get(username)
    perms = []
    if user:
        for job in user.private_jobs:
            perms += ['job:'+str(job.id)]
        if user.is_admin():
            perms += ['group:admin']
    return perms

def populate():
    transaction.begin()
    session = DBSession()
    user = User(u'foo')
    session.add(user)
    user = User(u'admin', admin=True)
    session.add(user)
    job = Job(u'SomeTitle', u'Some description', u'Some workflow', u'Some geometry', 10, False, u'Some URL', False)
    session.add(job)
    
def initialize_sql(engine):
    Base.metadata.bind = engine
    Base.metadata.create_all(engine)
    return DBSession
