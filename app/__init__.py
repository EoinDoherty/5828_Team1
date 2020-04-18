from flask import Flask

app = Flask(__name__)
app.config.from_json("config.json")
app.config['JWT_SECRET_KEY'] = app.config["SECRET_KEY"]

from app import routes