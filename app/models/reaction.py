from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates
from datetime import dt

class Reaction(db.Model):
    __tablename__ = 'reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    comment_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('comments.id')), nullable=False)
    vote = db.Column(db.Boolean)

    owner = db.relationship('User', back_populates = 'reactions')
    comment_parent = db.relationship('Comment', back_populates = 'reactions')
    post_parent = db.relationship('Post', back_populates = 'reactions')
