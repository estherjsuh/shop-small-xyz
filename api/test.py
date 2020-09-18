import os
import unittest
# from flask_cors import CORS
from api import app, db, Store
import json

TEST_DB = 'stores.db'
BASEDIR = os.path.abspath(os.path.dirname(__file__))

class FlaskTest(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True 
        app.config['DEBUG']= False 
        # CORS(app)
        self.app = app.test_client()
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(BASEDIR, TEST_DB)
        db.drop_all()
        db.create_all()

    def tearDown(self):
        pass

    def add_store(self):
        store = Store('Esther', 'estherjsuh@protonmail.com', 'shop small', 'shop-small.xyz', 'san-fran', '', True, False, False, False, False, False, False, False, False, False, False, False, False, False, False, False, True, True, False, False)
        db.session.add(store)
        db.session.commit()
    # def add_stores(self, ownerName, email, shopName, website, nearestLocation, msgFromOwner, women, men, unisex, kids, home, selfcare_wellness, beauty, jewelry, shoes, masks, accessories, undergarments, vintage, fairtrade, ecofriendly, sustainable, oneDollar, twoDollar, threeDollar, fourDollar):
    #     return self.app.post('/results', data=dict(ownerName=ownerName, email=email, shopName=shopName, website=website, nearestLocation=nearestLocation, msgFromOwner=msgFromOwner, women=women, men=men, unisex=unisex, kids=kids, home=home, selfcare_wellness=selfcare_wellness, beauty=beauty, jewelry=jewelry, shoes=shoes, masks=masks, accessories=accessories, undergarments=undergarments, vintage=vintage, fairtrade=fairtrade, ecofriendly=ecofriendly, sustainable=sustainable, oneDollar=oneDollar, twoDollar=twoDollar, threeDollar=threeDollar, fourDollar=fourDollar), follow_redirects=True)

    def approve_store(self):
        self.add_store()
        store = Store.query.filter_by(shopName='shop small').first()
        store.approved = True
        db.session.commit()


##TESTS##


#TEST 1
    def test_main_page(self):
        response = self.app.get('/', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

#TEST 2
    def test_pending_page(self):
        response = self.app.get('/pending', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

#TEST 3
    def test_approved_page(self):
        response = self.app.get('/approved', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

#TEST 4
    def test_declined_page(self):
        response = self.app.get('/declined', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

# #TEST 5
#     def test_api_post(self):
#         sent = {'ownerName': 'Esther', 'email': 'estherjsuh@protonmail.com', 'shopName': 'shop small', 'website': 'shop-small.xyz', 'nearestLocation': 'san-fran', 'msgFromOwner': '', 'categories': {'women': True, 'men': False, 'unisex': False, 'kids': False, 'home': False, 'self-care & wellness': False, 'beauty': False, 'jewelry': False, 'shoes': False, 'masks': False, 'bags & accessories': False, 'undergarments': False, 'vintage': False, 'fair-trade': False, 'eco-friendly': False, 'sustainable': False}, 'prices': {'$ - $0-50': True, '$$ - $50-100': True, '$$$ - $100-150': False, '$$$$ - $150+': False}}
#         response = self.app.post('/results', data= sent)
#         # result = self.app.post('/results', data=sent)
#         # self.assertEqual(result.data, json.dumps(sent))
#         self.assertEqual(response.status_code, 200)

#TEST
    def test_data_pending_page(self):
        self.add_store()
        response = self.app.get('/pending', follow_redirects=True)
        self.assertIn(b'shop small', response.data)

    def test_data_approved_page(self):
        self.approve_store()
        response = self.app.get('/approved', follow_redirects=True)
        self.assertIn(b'shop small', response.data)
    
    def test_get_stores_all(self):
        self.approve_store()
        response = self.app.get('/get_stores_all', follow_redirects=True)
        self.assertIn(b'shop small', response.data)

    def test_json_get_stores_all(self):
        self.approve_store()
        response = self.app.get('/get_stores_all')
        self.assertTrue(response.is_json)


if __name__=='__main__':
    unittest.main()