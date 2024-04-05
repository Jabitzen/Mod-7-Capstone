from flask import Blueprint, request
from flask_login import current_user, login_required
from app.utils import get_current_user
from app.forms import PostForm
from ..models import Post, User, db
import json
from types import SimpleNamespace

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def all_posts():
    posts = Post.query.all()

    return [post.to_dict() for post in posts]

@post_routes.route('/<postId>')
def get_post_byId(postId):
    post = Post.query.filter(Post.id == postId).first()

    if not post:
        return {'errors': {'message': 'Post not found'}}, 404

    return post.to_dict()

@login_required
@post_routes.route('/current')
def get_user_posts():
    posts = Post.query.filter(Post.owner_id == current_user.id).all()

    if not posts:
        return {'errors': {'message': 'Posts not found'}}, 404
    else:
        return [post.to_dict() for post in posts]

@post_routes.route("/new", methods=["POST"])
@login_required
def newPost():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    imageUrl = ""
    if (form.data['image_url']):
        imageUrl = form.data['image_url']

    if form.validate_on_submit():
        newPost = Post(
            title=form.data['title'],
            description=form.data['description'],
            image_url= imageUrl,
            owner_id=get_current_user(),
            community_id=form.data['community_id']

        )
        db.session.add(newPost)
        db.session.commit()
        return json.dumps(newPost.to_dict()), 201
    return {'message': 'Bad Request', 'errors': form.errors}, 400


@post_routes.route("/<int:postId>/edit", methods=["PUT"])
@login_required
# @is_post_owner
def updatePost(postId):
    post = Post.query.get(postId)

    if not post:
        return json.dumps({
            "message": "Community couldn't be found"
        }), 404
    data = json.loads(request.data, object_hook=lambda d: SimpleNamespace(**d)) # convert JSON to Object so form can key in using .
    form = PostForm(obj=data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(post)
        db.session.add(post)
        db.session.commit()
        return json.dumps(post.to_dict())
    return {'message': 'Bad Request', 'errors': form.errors}, 400



@login_required
@post_routes.route('/<int:postId>/delete', methods=["DELETE"])
def delete_post(postId):
    post = Post.query.get(postId)

    if not post:
        return {'errors': {'message': 'Post not found'}}, 404

    if current_user.id is not post.owner_id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    db.session.delete(post)
    db.session.commit()

    return {'message': "Successfully deleted post"}
