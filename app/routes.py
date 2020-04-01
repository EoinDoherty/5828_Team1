from flask import Flask, redirect, url_for, request, render_template
import flask_login
from .auth.user import User
from app import app

from .auth.routes import auth_routes

app.register_blueprint(auth_routes)

@app.route('/heart-beat')
def hello():
    return 'Hello, World!'

@app.route('/')
def index():
   return render_template('index.html')

@app.route('/success/<name>')
def success(name):
    return 'Welcome %s' % name

@app.route('/restricted')
@flask_login.login_required
def restricted():
    return "secret"

if __name__ == "__main__":
    app.run()

