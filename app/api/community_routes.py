from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms import CommunityForm
from app.utils import get_current_user
import json
from types import SimpleNamespace
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

@community_routes.route('/<communityId>/posts')
def get_community_posts(communityId):
    community = Community.query.filter(Community.id == communityId).first()

    if not community:
        return {'errors': {'message': 'Community not found'}}, 404

    return [post.to_dict() for post in community.posts]

@login_required
@community_routes.route('/current')
def get_user_communities():
    communities = Community.query.filter(Community.owner_id == current_user.id).all()

    if not communities:
        return {'errors': {'message': 'Communities not found'}}, 404
    else:
        return [community.to_dict() for community in communities]


#CREATE A NEW RESTAURANT at ["/api/restaurants"]
@community_routes.route("/new", methods=["POST"])
@login_required
def newCommunity():
    form = CommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newCommunity = Community(
            community_name=form.data['community_name'],
            description=form.data['description'],
            image_url=form.data['image_url'],
            owner_id=get_current_user()
        )
        db.session.add(newCommunity)
        db.session.commit()
        return json.dumps(newCommunity.to_dict()), 201
    return {'message': 'Bad Request', 'errors': form.errors}, 400


#EDIT/UPDATE A RESTAURANT at ["/api/restaurant/:id"]
@community_routes.route("/<int:communityId>/edit", methods=["PUT"])
@login_required
# @is_restaurant_owner
def updateCommunity(communityId):
    community = Community.query.get(communityId)

    if not community:
        return json.dumps({
            "message": "Community couldn't be found"
        }), 404
    data = json.loads(request.data, object_hook=lambda d: SimpleNamespace(**d)) # convert JSON to Object so form can key in using .
    form = CommunityForm(obj=data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(community)
        db.session.add(community)
        db.session.commit()
        return json.dumps(community.to_dict())
    return {'message': 'Bad Request', 'errors': form.errors}, 400


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
