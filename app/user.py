from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, uid, username, pwd_hash):
        self.id = uid
        self.username = username
        self.pwd_hash = pwd_hash

    def authenticate(self, pwd):
        self.is_authenticated = True
        return self.is_authenticated
