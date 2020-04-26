from app import app
from app.posts.post_management import *
from mock import patch, MagicMock
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
            mock.posts.find.return_value = [doc]
                                         
            result = list_posts("user")

            assert type(result) == list
            assert len(result) == 1

            first = result[0]

            assert first["creator"] == doc["creator"]
            assert first["title"] == doc["title"]
            assert first["creator"] == doc["creator"]
            assert first["_id"] == str(oid)
        
        with patch(context + ".database") as mock:
            mock.posts.find.return_value = []
            result = list_posts("user")

            assert type(result) == list
            assert len(result) == 0

def test_get_post():
    with app.app_context():
        with patch(context + ".database") as mock:
            oid = ObjectId()
            doc = {"_id": oid}
            mock.posts.find_one.return_value = doc

            result = get_post("user", str(oid))

            assert type(result) == dict
            assert result["_id"] == str(doc["_id"])
        with patch(context + ".database") as mock:
            mock.posts.find_one.return_value = None

            result = get_post("user", str(ObjectId()))

            assert result == None

def test_create_post():
    with app.app_context():
        with patch(context + ".database") as mock:
            oid = ObjectId()

            insert_ack = MagicMock()
            insert_ack.inserted_id = oid
            mock.posts.insert_one.return_value = insert_ack
            result = create_post("user", "title", "content", [])
            assert result == str(oid)

def test_update_post():
    with app.app_context():
        with patch(context + ".database") as mock:
            oid = ObjectId()
            mock.posts.find_one.return_value = {"_id": oid, "creator": "user"}
            mock.posts.replace_one.return_value = {"_id": oid}
            result = update_post("user", str(oid), "title", "content", [])
            assert result
        with patch(context + ".database") as mock:
            mock.posts.find_one.return_value = None
            result = update_post("user", str(ObjectId()), "title", "content", [])
            assert not result

def test_delete_post():
    with app.app_context():
        oid = ObjectId()
        with patch(context + ".database") as mock:
            mock.posts.find_one.return_value = {"_id": oid, "creator": "user"}
            mock.posts.remove.return_value = {"_id": oid, "creator": "user"}
            result = delete_post("user", str(oid))
            assert result == OK
            
            result = delete_post("not user", str(oid))
            assert result == UNAUTHORIZED

            mock.posts.remove.return_value = None
            result = delete_post("user", str(oid))
            assert result == NOT_FOUND
