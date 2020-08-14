import time
from flask import Flask, redirect, url_for, request, jsonify
from flask_cors import CORS
import datetime
from flask_sqlalchemy import SQLAlchemy 
from sqlalchemy.dialects.postgresql import JSON
from config import DATABASE_URI

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db= SQLAlchemy(app)




@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/results', methods=['POST'])
def api_post():
    if request.method == 'POST':
        req = request.json
        db.session.add(jsonify(req))
        db.session.commit()
    # else:
    #     a = request.args.get('ownerName', '')
    #     return a

class Store(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    json_column = db.Column(JSON)

    def __init__(json_data):
        self.json_column = json_data









# class Store(db.Model):

#     __table__ = 'stores-pending'

#     store_id = db.Column(db.Integer, primary_key=True)
#     created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
#     ownerName = db.Column(db.String, nullable=False)
#     email = db.Column(db.String, nullable=False)
#     shopName = db.Column(db.String, nullable=False)
#     website = db.Column(db.String, nullable=False)
#     nearestLocation = db.Column(db.String, nullable=False)
#     msgFromOwner = db.Column(db.String, nullable=True)

# class Categores(db.Model):

#     __table__ = 'categories'

#     store_id = db.Column(db.Integer, primary_key=True)
#     women = db.Column(db.Boolean, nullable=False)
#     men = db.Column(db.Boolean, nullable=False)
#     unisex = db.Column(db.Boolean, nullable=False)
#     kids = db.Column(db.Boolean, nullable=False)
#     self-care = db.Column(db.Boolean, nullable=False)
#     wellness = db.Column(db.Boolean, nullable=False)
#     beauty = db.Column(db.Boolean, nullable=False)
#     jewelry = db.Column(db.Boolean, nullable=False)
#     shoes = db.Column(db.Boolean, nullable=False)
#     masks = db.Column(db.Boolean, nullable=False)
#     accessories= db.Column(db.Boolean, nullable=False)
#     undergarments = db.Column(db.Boolean, nullable=False)
#     vintage = db.Column(db.Boolean, nullable=False)
#     fair-trade = db.Column(db.Boolean, nullable=False)
#     eco-friendly= db.Column(db.Boolean, nullable=False) 
#     sustainable = db.Column(db.Boolean, nullable=False)

# class Prices(db.Model):

#     __table__ ='prices'
#     store_id = db.Column(db.Integer, primary_key=True)
#     one-dollar = db.Column(db.Boolean, nullable=False)
#     two-dollar = db.Column(db.Boolean, nullable=False)
#     three-dollar = db.Column(db.Boolean, nullable=False)
#     four-dollar = db.Column(db.Boolean, nullable=False)

