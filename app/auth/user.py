from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, uid, username):
        self.id = uid
        self.username = username

    def authenticate(self, pwd):
        self.is_authenticated = True
        return self.is_authenticated
    
def user_from_bson(bson):
    return User(bson["_id"], bson["username"])
