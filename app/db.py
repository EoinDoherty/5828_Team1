import pymongo
from bson import ObjectId
from .auth.user import user_from_bson
from app import app
from app.helpers.log_helper import logging

db_user = app.config["DB_USER"]
db_pwd = app.config["DB_PASS"]
db_name = app.config["DB_NAME"]
db_host = app.config["DB_HOST"]

client = pymongo.MongoClient(host=db_host, username=db_user, password=db_pwd)
database = client[db_name]

def get_user(uid):
	try:
		result = database.users.find_one({"_id": ObjectId(uid)})
		# logging.info('Get user - {}'.format(uid))
		if result == None:
			# logging.warning('Get user - {}'.format(uid))
			return None
		return user_from_bson(result)
	except:
		pass
		# logging.error('Get User - Exception occurred')
	finally:
		pass
		# logging.debug('Get user - {}'.format(uid))



