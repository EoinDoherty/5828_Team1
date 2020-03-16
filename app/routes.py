from flask import Flask, redirect, url_for, request, render_template
import flask_login
from .user import User
from app import app, login_manager

# app.secret_key = b'~"\x93h\xe5s\\\xb7ME\xeajT\xe2\xbb\x19'
login_manager.login_view = '/'

users = {}

@login_manager.user_loader
def load_user(uid):
    if uid in users:
        return users[uid]
    return None

@app.route('/heart-beat')
def hello():
    return 'Hello, World!'

@app.route('/')
def index():
   return render_template('index.html')

@app.route('/success/<name>')
def success(name):
    return 'Welcome %s' % name

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        username = request.form['nm']
        pwd = request.form['pwd']
    else:
        username = request.args.get('nm')
        pwd = request.args.get('pwd')
    
    user = User(username, username, "asdf")
    users[username] = user
    flask_login.login_user(user)
    
    return redirect(url_for('success', name=username))

@app.route('/signup', methods=['POST', 'GET'])
def signup():
    if request.method == 'POST':
        username = request.form['nm']
        pwd = request.form['pwd']
    else:
        username = request.args.get('nm')
        pwd = request.args.get('pwd')
    
    user = User(username, username, "asdf")
    users[username] = user
    flask_login.login_user(user)

    return redirect(url_for('success', name=username))

@app.route('/restricted')
@flask_login.login_required
def restricted():
    return "secret"

if __name__ == "__main__":
    app.run()

