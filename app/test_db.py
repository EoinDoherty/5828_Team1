import pytest
import app.db

from bson import ObjectId
from mock import patch, MagicMock

def test_get_user():
    id_str = "5e77e247ef4b45c2a2b44d2b"
    oid = ObjectId(id_str)
    doc = {"_id": oid, "username": "asdf", "hash": "..."}
    
    with patch("app.db.database") as mock:
        mock.users.find_one.return_value = doc
        response = app.db.get_user(id_str)

        assert response != None
        assert response.username == "asdf"
        assert response.id == id_str

        mock.users.find_one.return_value = None
        assert app.db.get_user("5e77e247ef4b45c2a2b44d2c") == None
