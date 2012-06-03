from sqlalchemy import *
from migrate import *
from OSMTM.models import *

meta = MetaData()
jobs = Table('jobs', meta,
  Column('id', Integer(), primary_key=True))

def upgrade(migrate_engine):
    meta.bind = migrate_engine
    col = Column('josm_preset', String())
    col.create(jobs)
    pass

def downgrade(migrate_engine):
    meta.bind = migrate_engine
    jobs.c.josm_preset.drop()
    pass
