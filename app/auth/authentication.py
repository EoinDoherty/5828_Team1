from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from app.db import database

def verify_user(username, password):
    match = database.users.find_one({"username": username})
    
    if match != None and check_password_hash(match["hash"], password):
        return create_access_token(identity=username)
    
    return False

def create_new_user(username, password):
    user_collection = database.users
    existing_user = user_collection.find_one({"username": username})

    if existing_user:
        return False
    
    pwd_hash = generate_password_hash(password)
    result = user_collection.insert_one({"username": username, "hash": pwd_hash})

    if result.acknowledged:
        return create_access_token(identity=username)
    
    return False
