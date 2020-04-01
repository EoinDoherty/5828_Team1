from .user import user_from_bson
from bson import ObjectId
import pytest

def test_user_from_bson():
    oid = ObjectId()
    bson_user = {"_id": oid, "username": "user", "hash": "..."}

    valid_user = user_from_bson(bson_user)
    assert valid_user.id == str(oid)
    assert valid_user.username == "user"

    with pytest.raises(KeyError) as parseError:
        user_from_bson({})
        assert "BSON response is not formatted correctly" in str(parseError)