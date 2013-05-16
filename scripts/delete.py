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

id = sys.argv[1]

engine = create_engine('sqlite:///OSMTM.db')
DBSession.configure(bind=engine)
with transaction.manager:
    job = DBSession.query(Job).filter(Job.id==id).one()
    DBSession.delete(job)
