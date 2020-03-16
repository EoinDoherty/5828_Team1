from flask import Flask
from flask_login import LoginManager

app = Flask(__name__)
app.secret_key = b'~"\x93h\xe5s\\\xb7ME\xeajT\xe2\xbb\x19'

from app import routes