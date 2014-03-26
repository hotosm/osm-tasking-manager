"""Adding offset fields

Revision ID: 41cd7451a8d7
Revises: 2faee55a9ed8
Create Date: 2014-03-26 15:04:22.142334

"""

# revision identifiers, used by Alembic.
revision = '41cd7451a8d7'
down_revision = '2faee55a9ed8'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column('jobs', sa.Column('imagery_offset_x', sa.Float(), default=0))
    op.add_column('jobs', sa.Column('imagery_offset_y', sa.Float(), default=0))
    pass


def downgrade():
    op.drop_column('jobs', 'imagery_offset_x')
    op.drop_column('jobs', 'imagery_offset_y')
    pass
