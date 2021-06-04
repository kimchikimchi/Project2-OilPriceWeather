#!/usr/bin/env python3

# Import libraries
from flask import Flask, json, render_template, redirect, jsonify
from flask_pymongo import PyMongo

GAS_WEEKLY_PRICE = 'resources/weekly_price.1993_current.csv'

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/gasprice_db")
gasprice = mongo.db.gasprice

# Routes
@app.route('/')
def index():
    # Serving static html pages out of 'static' dir.
    # See for details: https://stackoverflow.com/questions/20646822/how-to-serve-static-files-in-flask
    return app.send_static_file('index.html')


@app.route('/getdata')
def getdata():
    price_data = gasprice.find_one()
    # Needed to covert id field's data type from Object ID
    # to string first to be able to send as as a JSON object
    price_data['_id'] = str(price_data['_id'])

    return jsonify(price_data)
    

@app.route('/importdata')
def importdata():
    price_data = []
    # Open the CSV source data
    with open(GAS_WEEKLY_PRICE) as fh:
        for line in fh:
            # ie; "Apr 5, 2016", 1.235\r\n
            # Remove trailing line ending 
            line = line.rstrip()

            [date, price] = line.split('",', 2)
            # Clean up the prepended double-quote in date
            date = date.replace('"', '')
            
            price_data.append({
                'date': date,
                'price': price
                })

    # Convert into a JSON object
    # Update the Mongo database and upsert=True
    gasprice.update({}, {'history': price_data}, upsert=True)

    # ToDo: Could have sent a status page alerting user data has been uploaded.
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run(debug=True)