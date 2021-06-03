#!/usr/bin/env python3

# Import libraries
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_db")
mars  = mongo.db.mars

# Routes
@app.route('/')
def index():
    pass

@app.route('/importdata')
def importdata():
    pass


if __name__ == "__main__":
    app.run(debug=True)