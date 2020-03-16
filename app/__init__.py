from flask import Flask
from flask_login import LoginManager

app = Flask(__name__)
app.config.from_json("config.json")

from app import routes