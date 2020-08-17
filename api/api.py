import time
from flask import Flask, redirect, url_for, request, jsonify, render_template
from flask_cors import CORS
import datetime
from flask_sqlalchemy import SQLAlchemy 
from sqlalchemy.dialects.postgresql import JSON
from config import DATABASE_URI

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/results', methods=['POST'])
def api_post():
    if request.method == 'POST':
        req = request.json
        new_store = Store(req['ownerName'], req['email'], req['shopName'], req['website'], req['nearestLocation'], req['msgFromOwner'], req['categories']['women'], req['categories']['men'], req['categories']['unisex'], req['categories']['kids'], req['categories']['home'], req['categories']['self-care & wellness'], req['categories']['beauty'], req['categories']['jewelry'], req['categories']['shoes'], req['categories']['masks'], req['categories']['accessories'], req['categories']['undergarments'], req['categories']['vintage'], req['categories']['fair-trade'], req['categories']['eco-friendly'], req['categories']['sustainable'], req['prices']['$ - $0-50'], req['prices']['$$ - $50-100'], req['prices']['$$$ - $100-150'], req['prices']['$$$$ - $150+'])
        db.session.add(new_store)
        db.session.commit()
        return jsonify(req)



class Store(db.Model):

    __tablename__ = 'stores'

    store_id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    approved = db.Column(db.Boolean, default=False)

    ownerName = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    shopName = db.Column(db.String, nullable=False)
    website = db.Column(db.String, nullable=False)
    nearestLocation = db.Column(db.String, nullable=False)
    msgFromOwner = db.Column(db.String, nullable=True)
    women = db.Column(db.Boolean, nullable=False)
    men = db.Column(db.Boolean, nullable=False)
    unisex = db.Column(db.Boolean, nullable=False)
    kids = db.Column(db.Boolean, nullable=False)
    home = db.Column(db.Boolean, nullable=False)
    selfcare_wellness = db.Column(db.Boolean, nullable=False)
    beauty = db.Column(db.Boolean, nullable=False)
    jewelry = db.Column(db.Boolean, nullable=False)
    shoes = db.Column(db.Boolean, nullable=False)
    masks = db.Column(db.Boolean, nullable=False)
    accessories= db.Column(db.Boolean, nullable=False)
    undergarments = db.Column(db.Boolean, nullable=False)
    vintage = db.Column(db.Boolean, nullable=False)
    fairtrade = db.Column(db.Boolean, nullable=False)
    ecofriendly= db.Column(db.Boolean, nullable=False) 
    sustainable = db.Column(db.Boolean, nullable=False)
    oneDollar = db.Column(db.Boolean, nullable=False)
    twoDollar = db.Column(db.Boolean, nullable=False)
    threeDollar = db.Column(db.Boolean, nullable=False)
    fourDollar = db.Column(db.Boolean, nullable=False)

    def __init__(self, ownerName, email, shopName, website, nearestLocation, msgFromOwner, women, men, unisex, kids, home, selfcare_wellness, beauty, jewelry, shoes, masks, accessories, undergarments, vintage, fairtrade, ecofriendly, sustainable, oneDollar, twoDollar, threeDollar, fourDollar):
        self.ownerName = ownerName
        self.email = email 
        self.shopName = shopName
        self.website = website 
        self.nearestLocation = nearestLocation
        self.msgFromOwner = msgFromOwner 
        self.women = women 
        self.men = men 
        self.unisex = unisex 
        self.kids = kids 
        self.home = home 
        self.selfcare_wellness = selfcare_wellness
        self.beauty = beauty 
        self.jewelry = jewelry 
        self.shoes = shoes 
        self.masks = masks 
        self.accessories = accessories 
        self.undergarments = undergarments
        self.vintage = vintage 
        self.fairtrade = fairtrade 
        self.ecofriendly = ecofriendly 
        self.sustainable = sustainable 
        self.oneDollar = oneDollar 
        self.twoDollar = twoDollar 
        self.threeDollar = threeDollar 
        self.fourDollar = fourDollar

@app.route('/pending')
def pending_stores():
    all_stores = Store.query.filter_by(approved=False).order_by(Store.created_at).all()
    return render_template('pending_stores.html', stores=all_stores, categories =["women", "men", "unisex", "kids", "home", "selfcare_wellness", "beauty", "jewelry", "shoes", "masks", 
            "accessories", "undergarments", "vintage", "fairtrade", 
        "ecofriendly", "sustainable"])