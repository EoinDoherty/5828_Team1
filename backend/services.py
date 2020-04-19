from pymongo import MongoClient
from flask import jsonify
import json
import sys
import requests
from flask import Flask 
from flask_pymongo import PyMongo

class Back_end():


    def __init__(self,port=27017,host="127.0.0.1"):
        self.port = int(port)
        self.mongoDBClient = MongoClient(host,port)

        app = Flask(__name__)

        app.config['MONGO_DBNAME'] = 'blog'
        app.config['MONGO_URI'] = 'mongodb://localhost:27017/blog'
        
        self.mongo = PyMongo(app)

    def publish_data(self,Title,Body, Image):
        blog = self.mongo.db.blog
        self.mongo.save_file(Image.filename,Image)
        blog_id = blog.insert({'Title':Title , 'Body':Body, 'Image_file_name': Image.filename})
        new_blog = blog.find_one({'_id': blog_id })
        output = {'Title' : new_blog['Title'], 'Body' : new_blog['Body']}
        return jsonify({'result' : output})
      



