from flask import Flask
from flask_pymongo import pymongo
from bson.json_util import dumps
from flask_cors import CORS, cross_origin
import os
import json

# Create an instance of Flask
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Use PyMongo to establish Mongo connection
client = pymongo.MongoClient("mongodb://localhost:27017")
database = client['GA_Customer_DB']

# Connect the tables
continent_collection = database.get_collection("continent_totals")
subcontinent_collection = database.get_collection("subcontinent_totals")
country_collection = database.get_collection("country_totals")
channel_group_collection = database.get_collection("channel_group_totals")
browser_category_collection = database.get_collection("browser_category_totals")
os_category_collection = database.get_collection("os_category_totals")
device_category_collection = database.get_collection("device_category_totals")
medium_category_collection = database.get_collection("medium_category_totals")
weekday_collection = database.get_collection("weekday_totals")
day_collection = database.get_collection("day_totals")
month_collection = database.get_collection("month_totals")
year_collection = database.get_collection("year_totals")
visit_hour_collection = database.get_collection("visit_hour_totals")


# lga_file_path = os.path.join("Data", "VIC_LGA_shp2.json")
# polygon_file_path = os.path.join("Data", "VIC_LGA_POLYGON_shp.json")
# updated_lga_path = os.path.join("Data", "Updated_LGA.json")

# with open(lga_file_path) as jsonfile:
#     lga_json = json.load(jsonfile)

# with open(polygon_file_path) as jsonfile:
#     polygon_json = json.load(jsonfile)


#Route /
@app.route("/")
@cross_origin()
def home():
    return "Home"

# Route for totals based on continent
@app.route("/continent")
@cross_origin()
def continent_totals():

    """Fetch the continent data"""
    continent_records = continent_collection.find(
        {}, {'_id':0})

    continent_list = list(continent_records)
    # Converting to the JSON
    continent_json_data = dumps(continent_list, indent = 2) 
    print(continent_json_data)

    return continent_json_data

# Route for totals based on subcontinent
@app.route("/subcontinent")
@cross_origin()
def subcontinent_totals():

    """Fetch the subcontinent data"""
    subcontinent_records = subcontinent_collection.find(
        {}, {'_id':0})

    subcontinent_list = list(subcontinent_records)
    # Converting to the JSON
    subcontinent_json_data = dumps(subcontinent_list, indent = 2) 
    print(subcontinent_json_data)

    return subcontinent_json_data

# Route for totals based on country
@app.route("/country")
@cross_origin()
def country_totals():

    """Fetch the country data"""
    country_records = country_collection.find(
        {}, {'_id':0})

    country_list = list(country_records)
    # Converting to the JSON
    country_json_data = dumps(country_list, indent = 2) 
    print(country_json_data)

    return country_json_data

# Route for totals based on channel group
@app.route("/channel_group")
@cross_origin()
def channel_group_totals():

    """Fetch the channel group data"""
    channel_group_records = channel_group_collection.find(
        {}, {'_id':0})

    channel_group_list = list(channel_group_records)
    # Converting to the JSON
    channel_group_json_data = dumps(channel_group_list, indent = 2) 
    print(channel_group_json_data)

    return channel_group_json_data

# Route for totals based on browser category
@app.route("/browser_category")
@cross_origin()
def browser_category_totals():

    """Fetch the browser category data"""
    browser_category_records = browser_category_collection.find(
        {}, {'_id':0})

    browser_category_list = list(browser_category_records)
    # Converting to the JSON
    browser_category_json_data = dumps(browser_category_list, indent = 2) 
    print(browser_category_json_data)

    return browser_category_json_data

# Route for totals based on os category
@app.route("/os_category")
@cross_origin()
def os_category_totals():

    """Fetch the os category data"""
    os_category_records = os_category_collection.find(
        {}, {'_id':0})

    os_category_list = list(os_category_records)
    # Converting to the JSON
    os_category_json_data = dumps(os_category_list, indent = 2) 
    print(os_category_json_data)

    return os_category_json_data

# Route for totals based on device category
@app.route("/device_category")
@cross_origin()
def device_category_totals():

    """Fetch the device category data"""
    device_category_records = device_category_collection.find(
        {}, {'_id':0})

    device_category_list = list(device_category_records)
    # Converting to the JSON
    device_category_json_data = dumps(device_category_list, indent = 2) 
    print(device_category_json_data)

    return device_category_json_data

# Route for totals based on medium category
@app.route("/medium_category")
@cross_origin()
def medium_category_totals():

    """Fetch the  medium category data"""
    medium_category_records = medium_category_collection.find(
        {}, {'_id':0})

    medium_category_list = list(medium_category_records)
    # Converting to the JSON
    medium_category_json_data = dumps(medium_category_list, indent = 2) 
    print(medium_category_json_data)

    return medium_category_json_data


# Route for totals based on weekday
@app.route("/weekday")
@cross_origin()
def weekday_totals():

    """Fetch the weekday data"""
    weekday_records = weekday_collection.find(
        {}, {'_id':0})

    weekday_list = list(weekday_records)
    # Converting to the JSON
    weekday_json_data = dumps(weekday_list, indent = 2) 
    print(weekday_json_data)

    return weekday_json_data

# Route for totals based on each day
@app.route("/day")
@cross_origin()
def day_totals():

    """Fetch the day data"""
    day_records = day_collection.find(
        {}, {'_id':0})

    day_list = list(day_records)
    # Converting to the JSON
    day_json_data = dumps(day_list, indent = 2) 
    print(day_json_data)

    return day_json_data

# Route for totals based on each month
@app.route("/month")
@cross_origin()
def month_totals():

    """Fetch the month data"""
    month_records = month_collection.find(
        {}, {'_id':0})

    month_list = list(month_records)
    # Converting to the JSON
    month_json_data = dumps(month_list, indent = 2) 
    print(month_json_data)

    return month_json_data

# Route for totals based on each year
@app.route("/year")
@cross_origin()
def year_totals():

    """Fetch the year data"""
    year_records = year_collection.find(
        {}, {'_id':0})

    year_list = list(year_records)
    # Converting to the JSON
    year_json_data = dumps(year_list, indent = 2) 
    print(year_json_data)

    return year_json_data

if __name__ == '__main__':
    app.run(debug=True)
