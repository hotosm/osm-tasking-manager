#!env/bin/python
__requires__ = 'OSMTM'

import os
import sys
import transaction

from sqlalchemy import create_engine

from pyramid.paster import (
    get_appsettings,
    setup_logging,
    )

from OSMTM.models import (
    DBSession,
    Job,
    Tile,
    TileHistory,
    Base,
    )

from OSMTM.utils import *

engine = create_engine('sqlite:///OSMTM.db')
DBSession.configure(bind=engine)
with transaction.manager:
    tile = DBSession.query(Tile).filter(Tile.job_id==292, Tile.x==19372, Tile.y==17805).one()
    tile.checkin = 1
    DBSession.add(tile)
