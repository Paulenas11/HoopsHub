"""Add FavoriteTeam table

Revision ID: 3a26967832b2
Revises: 
Create Date: 2024-12-20 16:02:52.841590

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '3a26967832b2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorite_team',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('team_id', sa.Integer(), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['team_id'], ['team.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('player', schema=None) as batch_op:
        batch_op.alter_column('position',
               existing_type=mysql.VARCHAR(length=50),
               type_=sa.Enum('GUARD', 'FORWARD', 'CENTER', name='positionenum'),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('player', schema=None) as batch_op:
        batch_op.alter_column('position',
               existing_type=sa.Enum('GUARD', 'FORWARD', 'CENTER', name='positionenum'),
               type_=mysql.VARCHAR(length=50),
               existing_nullable=False)

    op.drop_table('favorite_team')
    # ### end Alembic commands ###
