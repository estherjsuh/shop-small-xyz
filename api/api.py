'''
Backend Flask
'''

from flask import Flask, redirect, url_for, request, render_template, flash
from flask_cors import CORS
from flask_serialize import FlaskSerializeMixin
import datetime
from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy
from flask_basicauth import BasicAuth
import urllib
import urllib.parse
import os
import boto3
import time
from .config import DATABASE_URI, SCREENSHOT_KEY, SECRET_KEY, S3_KEY, S3_SECRET, \
S3_BUCKET, S3_PREFIX, MAIL_SERVER, MAIL_USERNAME, MAIL_DEFAULT_SENDER, MAIL_PASSWORD, \
BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD



app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

app.config['MAIL_SERVER'] = MAIL_SERVER
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = MAIL_USERNAME
app.config['MAIL_DEFAULT_SENDER'] = MAIL_DEFAULT_SENDER
app.config['MAIL_PASSWORD'] = MAIL_PASSWORD

app.config['BASIC_AUTH_USERNAME'] = BASIC_AUTH_USERNAME
app.config['BASIC_AUTH_PASSWORD'] = BASIC_AUTH_PASSWORD

app.secret_key = SECRET_KEY


mail = Mail(app)

db = SQLAlchemy(app)
FlaskSerializeMixin.db = db

basic_auth = BasicAuth(app)

#screenshot saver api
customer_key = SCREENSHOT_KEY

# s3 bucket
s3_client = boto3.client('s3',
    aws_access_key_id=S3_KEY,
    aws_secret_access_key=S3_SECRET
    )


@app.before_request
def before_request():
    '''Redirects from http to https'''
    if request.url.startswith('http://'):
        url = request.url.replace('http://', 'https://', 1)
        code = 301
        return redirect(url, code=code)

@app.route('/')
def index():
    '''Serves React files'''
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    '''Handles 404 Errors that occur when Flask does not know about React routes'''
    return app.send_static_file('index.html')


@app.route('/api')
@basic_auth.required
def homepage():
    '''Backend Homepage'''
    return render_template('homepage.html')

@app.route('/api/results', methods=['POST'])
def api_post():
    '''Posts Store Data to Postgres DB'''
    if request.method == 'POST':
        req = request.json
        # print(req)
        new_store = Store(req['ownerName'], req['email'], req['shopName'].title(), \
            clean_url(req['website']), req['nearestLocation'], req['msgFromOwner'], \
                req['categories']['women'], req['categories']['men'], req['categories']['unisex'], \
                req['categories']['kids'], req['categories']['home'], \
                req['categories']['self-care & wellness'], req['categories']['beauty'], \
                req['categories']['jewelry'], req['categories']['shoes'], \
                req['categories']['masks'], req['categories']['bags & accessories'], \
                req['categories']['undergarments'], req['categories']['vintage'], \
                req['categories']['fair-trade'], req['categories']['eco-friendly'], \
                req['categories']['sustainable'], req['prices']['$ - $0-50'], \
                req['prices']['$$ - $50-100'], req['prices']['$$$ - $100-150'], \
                req['prices']['$$$$ - $150+'])

        db.session.add(new_store)
        db.session.commit()

        # msg = Message("New Request", recipients=[app.config['MAIL_USERNAME']])
        msg = Message("New Request", recipients=[MAIL_USERNAME])
        msg.body = "You have received a new request from shop name: {}, with contact <{}>."\
                    .format(req['shopName'], req['email'])
        mail.send(msg)

        return redirect(url_for('pending_stores'))



def clean_url(url):
    '''Helper function to clean urls before saving to DB'''
    if url.startswith('https://'):
        url = url[8:]
        return url
    elif url.startswith('http://'):
        url = url[7:]
        return url
    else:
        return url


class Store(FlaskSerializeMixin, db.Model):
    '''Table schema for Store table'''
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

    def __init__(self, ownerName, email, shopName, website, nearestLocation,\
        msgFromOwner, women, men, unisex, kids, home, selfcare_wellness, beauty,\
        jewelry, shoes, masks, accessories, undergarments, vintage, fairtrade,\
        ecofriendly, sustainable, oneDollar, twoDollar, threeDollar, fourDollar):
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


db.create_all()
db.session.commit()

@app.route('/api/pending')
@basic_auth.required
def pending_stores():
    '''Pending requests page'''
    all_stores = Store.query.filter_by(approved=False).filter_by(declined=False)\
        .order_by(Store.created_at).all()
    return render_template('pending_stores.html', stores=all_stores,\
        categories =["women", "men", "unisex", "kids", "home", "selfcare_wellness",\
             "beauty", "jewelry", "shoes", "masks", "accessories", "undergarments",\
             "vintage", "fairtrade", "ecofriendly", "sustainable"])


@app.route('/api/approved')
@basic_auth.required
def approved_stores():
    '''Shows all approves stores'''
    approved_stores = Store.query.filter_by(approved=True).order_by(Store.created_at).all()
    return render_template('approved_stores.html', stores=approved_stores)

@app.route('/api/declined')
@basic_auth.required
def declined_stores():
    '''Shows all declined stores'''
    declined_stores = Store.query.filter_by(declined=True).order_by(Store.created_at).all()
    return render_template('declined_stores.html', stores=declined_stores)

@app.route('/api/approve/<int:id>', methods=['POST'])
def approve(id):
    '''When store is approved,
    1. Updates approved column to True
    2. Calls call_screenshot_api function
    3. Sends approval email to store owner
    '''
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

        #email store owner
        recipient = [store.email]
        msg = Message("Approved!", recipients=recipient)
        msg.body = """
            Your store has been approved 👍
            Come check it out at www.shop-small.xyz!
            """

        mail.send(msg)

        return redirect(url_for('approved_stores'))

# UPLOAD_FOLDER = os.path.abspath(os.curdir) + '/static/'
UPLOAD_FOLDER = '/static/'


def call_screenshot_api(url, customer_key, store_id):
    '''Once a store is approved,
    1. Calls screenshot API on store URL
    2. Save response object from screenshot API in a static dir
    3. Send response object to AWS S3
    4. Remove response object in static dir via check_s3_remove_dir function
    '''
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
    opener.addheaders = [('User-agent', 'Mozilla/5.0')]
    urllib.request.install_opener(opener)
    output = str(store_id) + ".png"
    fullfilename = "static/" + output

    if os.path.exists('static'):
        urllib.request.urlretrieve(screenshot_url, fullfilename)

    else:
        os.mkdir('static')
        urllib.request.urlretrieve(screenshot_url, fullfilename)

    s3_client.upload_file(fullfilename, S3_BUCKET, output,\
        ExtraArgs={'ContentType':'image/jpeg', 'ACL':'public-read'})

    time.sleep(10)

    check_s3_remove_static(output)

    return "image saved"

def check_s3_remove_static(output):
    '''Checks that response object is saved in S3 Bucket, then deletes from static dir'''
    for key in s3_client.list_objects_v2(Bucket=S3_BUCKET)['Contents']:
        if key['Key'] == output:

            fullfilename = 'static/'+output
            os.remove(fullfilename)
            print("static file removed")
        else:
            print("file does not exist in s3")



@app.route('/api/decline/<int:id>', methods=['POST'])
def decline(id):
    '''Declines stores'''
    if request.method=='POST':
        store = Store.query.filter_by(store_id=id).first()
        store.declined = True
        db.session.commit()
        return redirect(url_for('main.pending_stores'))


@app.route('/api/delete/<int:id>', methods=['POST'])
def delete(id):
    '''Deletes store record from DB'''
    store = Store.query.filter_by(store_id=id).first()
    if request.method =='POST':
        db.session.delete(store)
        db.session.commit()
        return redirect(url_for('declined_stores'))


#send this to react
@app.route('/api/get_stores_all', methods=['GET'])
def get_stores_all():
    return Store.get_delete_put_post(prop_filters={'approved':True})


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))