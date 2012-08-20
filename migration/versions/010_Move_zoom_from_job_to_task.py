from sqlalchemy import *
from migrate import *

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
        Column('checkout', String()),
        Column('change', String()),
    )
    col = Column('zoom', Integer(), server_default="1")
    col.create(tiles)

    cons = PrimaryKeyConstraint(tiles.c.x, tiles.c.y, tiles.c.job_id, col)
    cons.create()

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
    col = Column('zoom', Integer(), server_default="1")
    col.create(tiles_h)

    cons = PrimaryKeyConstraint(tiles_h.c.x, tiles_h.c.y, tiles_h.c.job_id, col, tiles_h.c.version)
    cons.create()
    pass


def downgrade(migrate_engine):
    # supporting downgrade is really a pain
    pass
