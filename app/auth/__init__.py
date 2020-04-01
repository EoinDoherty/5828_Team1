from app import app
from flask_login import LoginManager

login_manager = LoginManager(app)
login_manager.login_view = '/'
