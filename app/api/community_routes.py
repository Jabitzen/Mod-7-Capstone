from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import Community, User, db

community_routes = Blueprint('communities', __name__)

@community_routes.route('/')
def all_communities():
    communities = Community.query.all()

    return [community.to_dict() for community in communities]

@community_routes.route('/<communityId>')
def get_community_byId(communityId):
    community = Community.query.filter(Community.id == communityId).first()

    if not community:
        return {'errors': {'message': 'Community not found'}}, 404

    return community.to_dict()

@login_required
@community_routes.route('/current')
def get_user_communities():
    communities = Community.query.filter(Community.owner_id == current_user.id).all()

    if not communities:
        return {'errors': {'message': 'Communities not found'}}, 404
    else:
        return [community.to_dict() for community in communities]



@login_required
@community_routes.route('/<int:communityId>/delete', methods=["DELETE"])
def delete_community(communityId):
    community = Community.query.get(communityId)

    if not community:
        return {'errors': {'message': 'Community not found'}}, 404

    if current_user.id is not community.owner_id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    db.session.delete(community)
    db.session.commit()

    return {'message': "Successfully deleted community"}
