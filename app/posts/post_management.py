from datetime import datetime
from bson import ObjectId
from app.db import database, sterilize_doc

UNAUTHORIZED = 401
NOT_FOUND = 404
OK = 200

def datetime_to_str(dt):
    return str(dt).split(" ")[0]

def list_posts(username):
    posts = list(database.posts.find({"creator": username}))

    return [sterilize_doc(post) for post in posts]

def get_post(username, post_id):

    post = database.posts.find_one({"_id": ObjectId(post_id)})
    
    if post == None:
        return None

    return sterilize_doc(post)

def get_posts_by_date(username, timestamp):
    date = timestamp.split("T")[0]
    
    posts = list(database.posts.find({"creator": username, "time_created": date}))

    return [sterilize_doc(post) for post in posts]

def create_post(username, title, content):
    current_time = datetime_to_str(datetime.now())

    post = {
        "creator": username,
        "title": title,
        "shared_with": [],
        "content": content,
        "time_created": current_time,
        "time_edited": current_time 
    }

    result = database.posts.insert_one(post)
    return str(result.inserted_id)

def update_post(username, post_id, title, content):
    oid = ObjectId(post_id)
    post = database.posts.find_one({"_id": oid})

    if post == None or post["creator"] != username:
        return False
    
    current_time = datetime_to_str(datetime.now())

    post["title"] = title
    post["content"] = content
    post["time_edited"] = current_time

    # database.posts.insert_one(post)
    result = database.posts.replace_one({"_id": oid}, post)

    return bool(result)

def delete_post(username, post_id):
    oid = ObjectId(post_id)
    post = database.posts.find_one({"_id": oid})

    if username == post["creator"]:
        response = database.posts.remove({"_id": oid})
        if response:
            return OK
        return NOT_FOUND
    return UNAUTHORIZED