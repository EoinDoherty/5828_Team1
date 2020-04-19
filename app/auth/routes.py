from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .user import User
from .authentication import verify_user, create_new_user

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/api/login', methods=['POST'])
def login():
    if not request.is_json:
        print(request)
        return jsonify({"msg": "Request is not JSON"}), 400
    
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    
    if not username:
        return jsonify({"msg": "Missing username field"}), 400
    if not password:
        return jsonify({"msg": "Missing password field"}), 400
    
    access_token = verify_user(username, password)

    if access_token:
        return jsonify({"token": access_token, "msg": "Logged in"}), 200
    
    return jsonify({"msg": "Invalid credentials"}), 401

@auth_routes.route('/api/signup', methods=['POST'])
def signup():
    if not request.is_json:
        print(request)
        return jsonify({"msg": "Request is not JSON"}), 400
    
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    
    if not username:
        return jsonify({"msg": "Missing username field"}), 400
    if not password:
        return jsonify({"msg": "Missing password field"}), 400

    access_token = create_new_user(username, password)

    if access_token:
        return jsonify({"token": access_token, "msg": "Logged in"}), 200
    
    return jsonify({"msg": "Username taken"}), 400

@auth_routes.route("/api/get_username", methods=['GET'])
@jwt_required
def get_username():
    return jsonify({"msg": get_jwt_identity()}), 200