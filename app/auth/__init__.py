from app import app
from flask_jwt_extended import JWTManager

jwt = JWTManager(app)