from flask import Blueprint, request, redirect, url_for
from flask_login import LoginManager, login_user, logout_user, login_required
from .user import User
from . import login_manager
from .authentication import verify_user, create_new_user

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        username = request.form['nm']
        pwd = request.form['pwd']
    else:
        username = request.args.get('nm')
        pwd = request.args.get('pwd')

    user = verify_user(username, pwd)
    
    if user:
        login_user(user)
        return redirect(url_for('success', name=username))
    
    return redirect(login_manager.login_view)

@auth_routes.route('/signup', methods=['POST', 'GET'])
def signup():
    if request.method == 'POST':
        username = request.form['nm']
        pwd = request.form['pwd']
    else:
        username = request.args.get('nm')
        pwd = request.args.get('pwd')
    
    user = create_new_user(username, pwd)
    if user:
        login_user(user)
        return redirect(url_for('success', name=username))
    
    return redirect(login_manager.login_view)

@auth_routes.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(login_manager.login_view)
