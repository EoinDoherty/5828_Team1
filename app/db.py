import pymongo
from bson import ObjectId
from .auth.user import user_from_bson
from app import app

db_user = app.config["DB_USER"]
db_pwd = app.config["DB_PASS"]
db_name = app.config["DB_NAME"]
db_host = app.config["DB_HOST"]

client = pymongo.MongoClient(host=db_host, username=db_user, password=db_pwd)
database = client[db_name]

def get_user(uid):
    result = database.users.find_one({"_id": ObjectId(uid)})
    
    if result == None:
        return None
    
    return user_from_bson(result)
