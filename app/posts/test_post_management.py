from app import app
from app.posts.post_management import *
from mock import patch
from bson import ObjectId

context = "app.posts.post_management"

def test_list_posts():
    with app.app_context():
        with patch(context + ".database") as mock:
            oid = ObjectId()
            doc = {"_id": oid,
                   "creator": "user",
                   "title": "title",
                   "content": "content"}
            mock.posts.find_one.find = [doc]
                                         
            result = list_posts("user")

            assert type(result) == list
            assert len(result) == 1

            first = result[0]

            assert first["creator"] == doc["creator"]
            assert first["title"] == doc["title"]
            assert first["creator"] == doc["creator"]
            assert first["_id"] == str(oid)
        
        with patch(context + ".database") as mock:
            mock.posts.find_one = []
            result = list_posts("user")

            assert type(result) == list
            assert len(result) == 0
