from flask import Flask, redirect, url_for, request, render_template
import os
import pymongo

app = Flask(__name__)

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
        user = request.form['nm']
        return redirect(url_for('success', name=user))
    else:
        user = request.args.get('nm')
        return redirect(url_for('success', name=user))

@app.route('/dbTest')
def db_test():
    user = os.environ["DB_USER"]
    pwd = os.environ["DB_PASS"]
    db_addr = os.environ["DB_ADDR"]
    db_name = os.environ["DB_NAME"]
    
    client = pymongo.MongoClient("mongodb+srv://" + user + ":" + pwd + "@" + db_addr)
    db = client[db_name]

    return str([doc for doc in db.foo.find()])

if __name__ == "__main__":
    app.run()
