# Project2-OilPriceWeather

## How to Run
This program runs through Python Flask as a simple web server with routes with MongoDB as data store.
1. Start MongoDB.  If you installed MongoDB through Homebrew, run `brew services start mongodb/brew/mongodb-community`
2. Run Flask app. Run `python ./app.py`.  This will start Flask app in debugging mode.  You can access local web session via http://localhost:5000.
3. Import CSV file in resources into MongoDB by visiting http://localhost:5000/importdata  Once data is loaded, it will redirect you back to the main page.
