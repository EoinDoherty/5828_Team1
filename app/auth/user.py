class User():
    def __init__(self, uid, username):
        self.id = uid
        self.username = username

    def authenticate(self, pwd):
        self.is_authenticated = True
        return self.is_authenticated
    
def user_from_bson(bson):
    if "_id" in bson and "username" in bson:
        return User(str(bson["_id"]), bson["username"])
    
    raise KeyError("BSON response is not formatted correctly")
