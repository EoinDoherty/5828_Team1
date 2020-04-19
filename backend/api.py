from flask import Flask
from flask import jsonify
from flask import request
import services as serv


app = Flask(__name__)

@app.route('/')
def index():
    return '''
        <form method = "POST" action="/blogpublish" enctype="multipart/form-data">
            <input type= "text" name="Title">
            <input type= "textarea" name="Body">
            <input type= "file" name="image">
            <input type= "submit">
        </form>
    '''


@app.route('/blogpublish',methods=['POST'])

#Title Done
#Location
#Blog Content Done
#Image
#timestamp

def publish_content():
    # data = request.get_json(force = True)
    Title = request.form.get('Title')
    Body = request.form.get('Body')
    # f = request.files['file']
    
    if 'image' in request.files:
        profile_image = request.files['image']

        
    backend = serv.Back_end()
    return backend.publish_data(Title,Body,profile_image)


if __name__ == '__main__':
    app.run(debug=True)

