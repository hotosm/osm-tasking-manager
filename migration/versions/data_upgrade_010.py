""" this script is made to upgrade data from 9 -> 10 """
from sqlalchemy.engine import create_engine
engine = create_engine('sqlite:///OSMTM.db')
connection = engine.connect()

from OSMTM.models import TileHistory, Tile, Job
from sqlalchemy import orm
from sqlalchemy.sql.expression import and_

sm = orm.sessionmaker(bind=engine, autoflush=True, autocommit=False,
            expire_on_commit=True)
session = orm.scoped_session(sm)

jobs = session.query(Job).all()

for job in jobs:

    print "job: %s" % job.id
    tiles_h = session.query(TileHistory) \
            .filter(TileHistory.job_id==job.id)
    for tile in tiles_h:
        tile.zoom = job.zoom
        session.add(tile)

    tiles = session.query(Tile) \
            .filter(Tile.job_id==job.id)
    for tile in tiles:
        tile.zoom = job.zoom
        session.add(tile)

session.commit()
