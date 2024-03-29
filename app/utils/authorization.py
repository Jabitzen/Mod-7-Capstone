from flask_login import current_user
from functools import wraps
from app.models import db, Communtiy, Post
import json

# Get current user
def get_current_user():
    if current_user.is_authenticated:
        return current_user.id
    return {'errors': {'message': 'Unauthorized'}}, 401

# Community must belong to current user
def is_community_owner(f):
    @wraps(f)
    def community_authorization(communityId):
        userId = get_current_user()
        community = Community.query.get(communityId)
        if userId != community.owner_id:
            return json.dumps({"message": "Forbidden"}), 403
        return f(communityId)
    return community_authorization

# Post must belong to current user
def is_post_owner(f):
    @wraps(f)
    def post_authorization(postId):
        userId = get_current_user()
        post = Post.query.get(postId)
        if userId != post.owner_id:
            return json.dumps({"message": "Forbidden"}), 403
        return f(postId)
    return post_authorization
