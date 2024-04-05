from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates
import datetime as dt

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('communities.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=dt.datetime.now())
    updated_at = db.Column(db.DateTime, default=dt.datetime.now(), onupdate=dt.datetime.now())
    image_url = db.Column(db.String)

    owner = db.relationship('User', back_populates = 'posts')
    community = db.relationship('Community', back_populates = 'posts')


    def to_dict(self):
        owner = self.owner.to_dict()

        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'community_id': self.community_id,
            'title': self.title,
            'description': self.description,
            'image_url': self.image_url,
            'owner': owner
        }
