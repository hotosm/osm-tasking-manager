from sqlalchemy import *
from migrate import *
from OSMTM.models import *

meta = MetaData()
jobs = Table('jobs', meta,
  Column('id', Integer(), primary_key=True))
tags = Table('tags', meta,
  Column('id', Integer(),  primary_key=True, nullable=False),
  Column('tag', String()),
)

job_tags_table = Table('job_tags', meta,
    Column('job_id', Integer, ForeignKey('jobs.id')),
    Column('tag_id', Integer, ForeignKey('tags.id'))
)

def upgrade(migrate_engine):
    meta.bind = migrate_engine
    tags.create()
    job_tags_table.create()
    pass

def downgrade(migrate_engine):
    meta.bind = migrate_engine
    tags.drop()
    job_tags_table.drop()
    pass
