"""Upgrade after workflow branch merge

Revision ID: 2faee55a9ed8
Revises: 5229d2fd908d
Create Date: 2014-02-09 16:02:41.025040

"""

# revision identifiers, used by Alembic.
revision = '2faee55a9ed8'
down_revision = '5229d2fd908d'

from alembic import op
import sqlalchemy as sa
from sqlalchemy import and_

# we build a quick link for the current connection of alembic
connection = op.get_bind()

def upgrade():
    """ this script is made to upgrade data from 9 -> 10 """
    from sqlalchemy.engine import create_engine
    engine = create_engine('sqlite:///OSMTM.db')
    connection = engine.connect()

    from OSMTM.models import TileHistory, Tile, Job
    from OSMTM.history_meta import VersionedListener
    from sqlalchemy import orm
    from sqlalchemy.sql.expression import and_

    sm = orm.sessionmaker(bind=engine, autoflush=True, autocommit=False,
                expire_on_commit=True,
                extension=[VersionedListener()])
    session = orm.scoped_session(sm)

    jobs = session.query(Job).all()

    for job in jobs:

        print "job: %s" % job.id

        tiles = session.query(Tile).filter(and_(Tile.change==True, Tile.job_id==job.id))
        for tile in tiles:
            tile.change = False
            tile.username = None
            tile.comment = None
            session.add(tile)

        session.commit()

    pass


def downgrade():
    pass
