from sqlalchemy import *
from migrate import *
from OSMTM.models import Job



def upgrade(migrate_engine):
    meta = MetaData()
    meta.bind = migrate_engine

    job_whitelists = Table('job_whitelists', meta,
      Column('job_id', Integer()),
      Column('user_id', String()),
    )

    jobs = Table('jobs', meta,
      Column('id', Integer(),  primary_key=True, nullable=False),
      Column('title', String()),
      Column('description', String()),
      Column('geometry', String()),
      Column('workflow', String()),
      Column('zoom', Integer()),
    )

    users = Table('users', meta,
      Column('username', String(),  primary_key=True, nullable=False),
      Column('role', Integer()),
    )

    job_whitelists.create()
    col = Column('imagery', String)
    col.create(jobs)
    col = Column('is_private', Boolean)
    col.create(jobs)
    col = Column('requires_nextview', Boolean)
    col.create(jobs)
    col = Column('accepted_nextview', Boolean)
    col.create(users)
    pass

def downgrade(migrate_engine):
    meta = MetaData()
    meta.bind = migrate_engine

    job_whitelists = Table('job_whitelists', meta,
      Column('job_id', Integer()),
      Column('user_id', String()),
    )

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
    )

    users = Table('users', meta,
      Column('username', String(),  primary_key=True, nullable=False),
      Column('role', Integer()),
      Column('accepted_nextview', Integer()),
    )

    job_whitelists.drop()
    jobs.c.imagery.drop()
    jobs.c.is_private.drop()
    jobs.c.requires_nextview.drop()
    users.c.accepted_nextview.drop()
    pass
