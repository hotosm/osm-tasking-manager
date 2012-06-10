""" this script is made to upgrade data from 7 -> 8 """
from sqlalchemy.engine import create_engine
engine = create_engine('sqlite:///OSMTM.db')
connection = engine.connect()

from OSMTM.models import TileHistory, Tile
from sqlalchemy import orm
from sqlalchemy.sql.expression import and_

sm = orm.sessionmaker(bind=engine, autoflush=True, autocommit=False,
            expire_on_commit=True)
session = orm.scoped_session(sm)

tiles = session.query(Tile) \
            .all()

def compare_checkin(old, new):
    # task done
    if old == 0 and new == 1:
        return 1
    # task validated
    if old == 1 and new == 2:
        return 2
    # task invalidated
    if old == 1 and new == 0:
        return 3

for tile in tiles:
    filter = and_(TileHistory.x==tile.x, TileHistory.y==tile.y, TileHistory.job_id==tile.job_id)
    tiles_history = session.query(TileHistory) \
            .filter(filter) \
            .order_by(TileHistory.version) \
            .all()

    """ (re)initialize values """
    username = None
    update = None
    last_history = None
    for ndx, i in enumerate(tiles_history):

        if i.username:
            i.checkout = True
            session.add(i)

    for ndx, i in enumerate(tiles_history):
        print "%s %s %s %s %s %s" % (i.job_id, i.x, i.y, i.username, i.checkin, i.version)

        if ndx > 0:
            if i.checkout:
                username = i.username
                update = i.update
                checkin = i.checkin

            status = compare_checkin(checkin, i.checkin)
            if status is not None:
                i.change = True
                i.username = username
                i.update = i.update if i.update != None else update 
            else:
                i.comment = None

        last_history = i

    """ now compare with current tile status """
    if last_history is not None:
        status = compare_checkin(last_history.checkin, tile.checkin)
        if status is not None:
            tile.change = True
            tile.username = username
            tile.update = tile.update if tile.update != None else update 

session.commit()

"""
tiles_history = session.query(TileHistory) \
            .filter(TileHistory.job_id==job_id) \
            .order_by(TileHistory.x, TileHistory.y) \
            .all()
user = None
for ndx, i in enumerate(tiles_history):
    print "%s %s %s %s %s" % (str(i.x), str(i.y), i.username, i.checkin, i.version)

    if user is not None:
        status = compare_checkin(checkin, i.checkin)
        print "status %s " % status

    if i.username:
        user = i.username

    checkin = i.checkin
    if ndx < len(tiles_history) - 1 and tiles_history[ndx + 1].version == 1 or \
            ndx == len(tiles_history) - 1:
        tile = session.query(Tile) \
            .get((i.x, i.y, 9))
        if user is not None and tile is not None:
            status = compare_checkin(checkin, tile.checkin)
        print "status %s" % status
        checkin = 0
        user = None
"""
