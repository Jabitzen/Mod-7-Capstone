from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates
import datetime as dt

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    description = db.Column(db.Text, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=dt.datetime.now())
    updated_at = db.Column(db.DateTime, default=dt.datetime.now(), onupdate=dt.datetime.now())

    # owner = db.relationship('User', back_populates = 'comments')
    # post_parent = db.relationship('Post', back_populates = 'comments')
