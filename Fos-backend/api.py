from flask import Flask
from flask import jsonify
from flask import request
import services as serv


app = Flask(__name__)


@app.route('/blogpublish',methods=['POST'])

#Title Done
#Location
#Blog Content Done
#Image
#timestamp

def publish_content():
    data = request.get_json(force= True)
    Title = data['Title']
    Body = data['Body']
    backend = serv.Back_end()
    return backend.publish_data(Title,Body)


if __name__ == '__main__':
    app.run(debug=True)

