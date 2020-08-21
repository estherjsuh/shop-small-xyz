import time
from flask import Flask, redirect, url_for, request, jsonify, render_template, flash
from flask_cors import CORS
from flask_serialize import FlaskSerializeMixin
import datetime
from flask_sqlalchemy import SQLAlchemy 
from sqlalchemy.dialects.postgresql import JSON
from config import DATABASE_URI, SCREENSHOT_KEY, SECRET_KEY, S3_KEY, S3_SECRET, S3_BUCKET, S3_PREFIX
import requests
import urllib
import urllib.parse
import os
import boto3


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)
FlaskSerializeMixin.db = db
app.secret_key = SECRET_KEY


#screenshot saver api
customer_key = SCREENSHOT_KEY

#s3 bucket 
s3_client = boto3.client('s3',
    aws_access_key_id=S3_KEY, 
    aws_secret_access_key=S3_SECRET 
    )


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/')
def homepage():
    return render_template('homepage.html')

@app.route('/results', methods=['POST'])
def api_post():
    if request.method == 'POST':
        req = request.json
        new_store = Store(req['ownerName'], req['email'], req['shopName'], clean_url(req['website']), req['nearestLocation'], req['msgFromOwner'], req['categories']['women'], req['categories']['men'], req['categories']['unisex'], req['categories']['kids'], req['categories']['home'], req['categories']['self-care & wellness'], req['categories']['beauty'], req['categories']['jewelry'], req['categories']['shoes'], req['categories']['masks'], req['categories']['bags & accessories'], req['categories']['undergarments'], req['categories']['vintage'], req['categories']['fair-trade'], req['categories']['eco-friendly'], req['categories']['sustainable'], req['prices']['$ - $0-50'], req['prices']['$$ - $50-100'], req['prices']['$$$ - $100-150'], req['prices']['$$$$ - $150+'])
        db.session.add(new_store)
        db.session.commit()
        return redirect(url_for('pending_stores'))

#removes https:// or http://
def clean_url(url):
    if url.startswith('https://'):
        url = url[8:]
        return url
    elif url.startswith('http://'):
        url = url[7:]
        return url 
    else:
        return url
    

class Store(FlaskSerializeMixin, db.Model):

    __tablename__ = 'stores'

    store_id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    approved = db.Column(db.Boolean, default=False)
    declined = db.Column(db.Boolean, default=False)

    ownerName = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    shopName = db.Column(db.String, nullable=False)
    website = db.Column(db.String, nullable=False, unique=True)
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
    all_stores = Store.query.filter_by(approved=False).filter_by(declined=False).order_by(Store.created_at).all()
    return render_template('pending_stores.html', stores=all_stores, categories =["women", "men", "unisex", "kids", "home", "selfcare_wellness", "beauty", "jewelry", "shoes", "masks", "accessories", "undergarments", "vintage", "fairtrade", "ecofriendly", "sustainable"])

@app.route('/approved')
def approved_stores():
    approved_stores = Store.query.filter_by(approved=True).order_by(Store.created_at).all()
    return render_template('approved_stores.html', stores=approved_stores)

@app.route('/declined')
def declined_stores():
    declined_stores = Store.query.filter_by(declined=True).order_by(Store.created_at).all()
    return render_template('declined_stores.html', stores=declined_stores)

@app.route('/approve/<int:id>', methods=['POST'])
def approve(id):
    if request.method=='POST':
        store = Store.query.filter_by(store_id=id).first()

        #updates approved status to True
        store.approved = True
        db.session.commit()
        flash('Store has been approved', 'success')

        #calls api function
        url = store.website
        store_id = store.store_id
        call_screenshot_api(url, customer_key, store_id)

        return redirect(url_for('approved_stores'))

def call_screenshot_api(url, customer_key, store_id):
    cleansed_url = "https://www." + '.'.join(url.split('.')[-2:])
    params = {
        'key': customer_key,
        'url': cleansed_url,
        'dimension': '520x440',
        'device' : 'desktop',
        'cacheLimit': 0,
        'delay': 200,
        'zoom': 100
    }
    screenshot_url = "https://api.screenshotmachine.com?{}".format(urllib.parse.urlencode(params))
    opener = urllib.request.build_opener() 
    opener.addheaders = [('User-agent', '-')]
    urllib.request.install_opener(opener)
    output = str(store_id) + ".png"
    path = '/Users/esther/Desktop/react-flask-app/api/static'
    fullfilename = os.path.join(path, output)
    urllib.request.urlretrieve(screenshot_url, fullfilename)
    s3_client.upload_file(fullfilename, S3_BUCKET, output, ExtraArgs={'ContentType':'image/jpeg'})
    return "image saved"



@app.route('/decline/<int:id>', methods=['POST'])
def decline(id):
    if request.method=='POST':
        store = Store.query.filter_by(store_id=id).first()
        store.declined = True 
        db.session.commit() 

        return redirect(url_for('pending_stores'))


@app.route('/delete/<int:id>', methods=['POST'])
def delete(id):
    store = Store.query.filter_by(store_id=id).first()
    if request.method =='POST':
        db.session.delete(store)
        db.session.commit()
        return redirect(url_for('declined_stores'))


#send this to react
@app.route('/get_stores_all', methods=['GET'])
def get_stores_all():
    return Store.get_delete_put_post(prop_filters={'approved':True})