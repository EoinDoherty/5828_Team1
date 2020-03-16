import os
import pymongo
from bson import ObjectId
from .auth.user import user_from_bson

db_user = os.environ["DB_USER"]
db_pwd = os.environ["DB_PASS"]
db_name = os.environ["DB_NAME"]
db_host = os.environ["DB_HOST"]

client = pymongo.MongoClient(host=db_host, username=db_user, password=db_pwd)
database = client[db_name]

def get_user(uid):
    result = database.users.find_one({"_id": ObjectId(uid)})
    
    if result == None:
        return None
    
    return user_from_bson(result)
