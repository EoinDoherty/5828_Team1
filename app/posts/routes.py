from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

import app.posts.post_management as management

post_routes = Blueprint('post_routes', __name__)

@post_routes.route("/api/new_post", methods=["GET"])
@jwt_required
def new_post():
    username = get_jwt_identity()
    title = request.json.get("title")
    content = request.json.get("content")

    post_id = management.create_post(username, title, content)

    return jsonify({"msg": "created post", "id": post_id}), 200


@post_routes.route("/api/list_posts", methods=["GET"])
@jwt_required
def list_posts():
    username = get_jwt_identity()
    posts = management.list_posts(username)

    reply = {"msg": f"Found {len(posts)} posts",
             "posts": posts}

    return jsonify(reply), 200

@post_routes.route("/api/update_post", methods=["GET"])
@jwt_required
def update_post():
    username = get_jwt_identity()
    post_id = request.json.get("id")
    title = request.json.get("title")
    content = request.json.get("content")

    management.update_post(username, post_id, title, content)

@post_routes.route("/api/delete_post", methods=["GET"])
@jwt_required
def delete_post():
    username = get_jwt_identity()
    post_id = request.json.get("id")

    management.delete_post(username, post_id)
