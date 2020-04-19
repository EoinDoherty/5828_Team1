from datetime import datetime
from bson import ObjectId
from app.db import database

def list_posts(username):
    return list(database.posts.find({"creator": username}))

def create_post(username, title, content):
    current_time = str(datetime.now())

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
    post = database.posts.find_one({"_id": ObjectId(post_id)})

    if post == None or post["creator"] != username:
        return False
    
    current_time = str(datetime.now())

    post["title"] = title
    post["content"] = content
    post["time_edited"] = current_time

    database.posts.replace_one(post)

    return True

def delete_post(username, post_id):
    oid = ObjectId(post_id)
    post = database.posts.find_one({"_id": oid})

    if username == post["creator"]:
        database.posts.remove({"_id": oid})