from sqlalchemy import *
from migrate import *

print "Also ensure that you correctly update your data using the script as well"

def upgrade(migrate_engine):
    meta = MetaData()
    meta.bind = migrate_engine
    tiles = Table('tiles', meta, 
        Column('x', Integer(), primary_key=True),
        Column('y', Integer(), primary_key=True),
        Column('job_id', Integer(), primary_key=True),
        Column('username', Unicode()),
        Column('update', DateTime()),
        Column('checkin', Integer()),
        Column('comment', Unicode()),
        Column('version', Integer()),
    )

    tiles_h = Table('tiles_history', meta, 
        Column('x', Integer(), primary_key=True),
        Column('y', Integer(), primary_key=True),
        Column('job_id', Integer(), primary_key=True),
        Column('username', Unicode()),
        Column('update', DateTime()),
        Column('checkin', Integer()),
        Column('comment', Unicode()),
        Column('version', Integer(), primary_key=True),
    )
    col1 = Column('checkout', Boolean())
    col1.create(tiles)
    col2 = Column('change', Boolean())
    col2.create(tiles)
    col1 = Column('checkout', Boolean())
    col1.create(tiles_h)
    col2 = Column('change', Boolean())
    col2.create(tiles_h)
    pass

def downgrade(migrate_engine):
    meta = MetaData()
    meta.bind = migrate_engine
    tiles = Table('tiles', meta, 
        Column('x', Integer(), primary_key=True),
        Column('y', Integer(), primary_key=True),
        Column('job_id', Integer(), primary_key=True),
        Column('username', Unicode()),
        Column('update', DateTime()),
        Column('checkin', Integer()),
        Column('comment', Unicode()),
        Column('version', Integer()),
        Column('checkout', String()),
        Column('change', String()),
    )

    tiles_h = Table('tiles_history', meta, 
        Column('x', Integer(), primary_key=True),
        Column('y', Integer(), primary_key=True),
        Column('job_id', Integer(), primary_key=True),
        Column('username', Unicode()),
        Column('update', DateTime()),
        Column('checkin', Integer()),
        Column('comment', Unicode()),
        Column('version', Integer(), primary_key=True),
        Column('checkout', String()),
        Column('change', String()),
    )
    tiles.c.checkout.drop()
    tiles.c.change.drop()
    tiles_h.c.checkout.drop()
    tiles_h.c.change.drop()
    pass
