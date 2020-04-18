from flask import Flask, redirect, url_for, request, render_template, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .auth.user import User
from app import app

from .auth.routes import auth_routes

app.register_blueprint(auth_routes)

@app.route('/api/heart-beat')
def hello():
    return 'Hello, World!'

@app.route('/api/heartbeat')
def api_heartbeat():
    print("api heartbeat called")
    return jsonify({"msg": "Connected to flask backend"})

@app.route('/')
def index():
   return render_template('index.html')

@app.route('/api/success/<name>')
def success(name):
    return 'Welcome %s' % name

@app.route('/api/home', methods=['GET'])
@jwt_required
def home():
    return jsonify({"msg": f"Hello {get_jwt_identity()}"})

@app.route('/api/restricted', methods=['GET'])
@jwt_required
def restricted():
    return jsonify({"msg": "secret"})

if __name__ == "__main__":
    app.run()

