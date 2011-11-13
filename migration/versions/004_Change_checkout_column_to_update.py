from sqlalchemy import *
from migrate import *

def upgrade(migrate_engine):
    meta = MetaData()
    meta.bind = migrate_engine
    tiles = Table('tiles', meta, 
        Column('x', Integer, primary_key=True),
        Column('y', Integer, primary_key=True),
        Column('job_id', Integer, primary_key=True),
        Column('username', Unicode),
        Column('checkout', DateTime),
        Column('checkin', Integer),
        Column('comment', Unicode),
        Column('version', Integer),
    )
    tiles.c.checkout.alter(name='update')

    tiles_h = Table('tiles_history', meta, 
        Column('x', Integer, primary_key=True),
        Column('y', Integer, primary_key=True),
        Column('job_id', Integer, primary_key=True),
        Column('username', Unicode),
        Column('checkout', DateTime),
        Column('checkin', Integer),
        Column('comment', Unicode),
        Column('version', Integer, primary_key=True),
    )
    tiles_h.c.checkout.alter(name='update')
    pass

def downgrade(migrate_engine):
    meta = MetaData()
    meta.bind = migrate_engine
    tiles = Table('tiles', meta, 
        Column('x', Integer, primary_key=True),
        Column('y', Integer, primary_key=True),
        Column('job_id', Integer, primary_key=True),
        Column('username', Unicode),
        Column('update', DateTime),
        Column('checkin', Integer),
        Column('comment', Unicode),
        Column('version', Integer),
    )
    tiles.c['update'].alter(name='checkout')

    tiles_h = Table('tiles_history', meta, 
        Column('x', Integer, primary_key=True),
        Column('y', Integer, primary_key=True),
        Column('job_id', Integer, primary_key=True),
        Column('username', Unicode),
        Column('update', DateTime),
        Column('checkin', Integer),
        Column('comment', Unicode),
        Column('version', Integer, primary_key=True),
    )
    tiles_h.c['update'].alter(name='checkout')
    pass
