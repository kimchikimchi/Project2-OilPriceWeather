#!/usr/bin/env python3

# Import libraries
from flask import Flask, render_template, redirect
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
    pass

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
    gas_price.update({}, price_data, upsert=True)
    # Update the Mongo database and upsert=True

    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)