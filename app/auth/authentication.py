from werkzeug.security import generate_password_hash, check_password_hash
from app.db import database, get_user
from . import login_manager
from .user import User, user_from_bson

@login_manager.user_loader
def load_user(uid):
    return get_user(uid)

def verify_user(username, password):
    match = database.users.find_one({"username": username})
    
    if match != None and check_password_hash(match["hash"], password):
        return user_from_bson(match)
    
    return False

def create_new_user(username, password):
    user_collection = database.users
    existing_user = user_collection.find_one({"username": username})

    if existing_user:
        return False
    
    pwd_hash = generate_password_hash(password)
    result = user_collection.insert_one({"username": username, "hash": pwd_hash})

    return User(str(result.inserted_id), username)
