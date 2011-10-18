from sqlalchemy import *
from migrate import *

def upgrade(migrate_engine):
    meta = MetaData()
    meta.bind = migrate_engine
    users = Table('users', meta,
      Column('username', String(),  primary_key=True, nullable=False),
      Column('role', Integer()),
      Column('accepted_nextview', Boolean()),
    )
    col = Column('admin', Boolean)
    col.create(users)
    col = Column('role', Integer)
    users.c.role.drop()
    pass

def downgrade(migrate_engine):
    meta = MetaData()
    meta.bind = migrate_engine
    users = Table('users', meta,
      Column('username', String(),  primary_key=True, nullable=False),
      Column('admin', Integer()),
      Column('accepted_nextview', Boolean()),
    )
    users.c.admin.drop()
    col = Column('role', Integer)
    col.create(users)
    pass
