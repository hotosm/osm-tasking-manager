from sqlalchemy import *
from migrate import *
from OSMTM.models import *

meta = MetaData()

def upgrade(migrate_engine):
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
    )
    col = Column('josm_preset', String())
    col.create(jobs)
    pass

def downgrade(migrate_engine):
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
    jobs.c.josm_preset.drop()
    pass
