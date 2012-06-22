from sqlalchemy import *
from migrate import *
from OSMTM.models import *


def upgrade(migrate_engine):
    meta = MetaData()
    meta.bind = migrate_engine
    jobs = Table('jobs', meta,
      Column('id', Integer(),  primary_key=True, nullable=False),
      Column('title', String()),
      Column('description', String()),
      Column('geometry', String()),
      Column('workflow', String()),
      Column('imagery', String()),
      Column('zoom', Integer()),
      Column('is_private', Integer()),
      Column('requires_nextview', Integer()),
      Column('short_description', String()),
      Column('status', Integer()),
      Column('josm_preset', String()),
    )
    col = Column('featured', Boolean())
    col.create(jobs)
    pass


def downgrade(migrate_engine):
    meta = MetaData()
    meta.bind = migrate_engine
    jobs = Table('jobs', meta,
      Column('id', Integer(),  primary_key=True, nullable=False),
      Column('title', String()),
      Column('description', String()),
      Column('geometry', String()),
      Column('workflow', String()),
      Column('imagery', String()),
      Column('zoom', Integer()),
      Column('is_private', Integer()),
      Column('requires_nextview', Integer()),
      Column('short_description', String()),
      Column('status', Integer()),
      Column('josm_preset', String()),
      Column('featured', String())
    )
    jobs.c.featured.drop()
    pass
