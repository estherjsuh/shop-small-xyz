import os
import unittest
from api import app, db, Store

TEST_DB = 'stores.db'
BASEDIR = os.path.abspath(os.path.dirname(__file__))

#Documentation: https://docs.python.org/3/library/unittest.html



class FlaskTest(unittest.TestCase):

    ###########################
    ### setup and tear down ###
    ###########################

    def setUp(self):
        app.config['TESTING'] = True 
        app.config['DEBUG']= False 
        self.app = app.test_client()
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(BASEDIR, TEST_DB)
        db.drop_all()
        db.create_all()

    def tearDown(self):
        pass


    ###########################
    ###   helper functions  ###
    ###########################

    def add_store(self):
        store = Store('Esther', 'estherjsuh@protonmail.com', 'shop small', 'shop-small.xyz', 'san-fran', '', True, False, False, False, False, False, False, False, False, False, False, False, False, False, False, False, True, True, False, False)
        db.session.add(store)
        db.session.commit()

    def approve_store(self):
        self.add_store()
        store = Store.query.filter_by(website='shop-small.xyz').first()
        store.approved = True
        db.session.commit()

    def decline_store(self):
        self.add_store()
        store = Store.query.filter_by(website='shop-small.xyz').first()
        store.declined = True 
        db.session.commit()


    ###########################
    ###        tests        ###
    ###########################


#TEST 1 - check route for homepage
    def test_main_page(self):
        response = self.app.get('/', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

#TEST 2 - check route for pending page
    def test_pending_page(self):
        response = self.app.get('/pending', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Pending Stores', response.data)

#TEST 3 - check route for approved page
    def test_approved_page(self):
        response = self.app.get('/approved', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Approved Stores', response.data)

#TEST 4 - check route for declined page
    def test_declined_page(self):
        response = self.app.get('/declined', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Declined Stores', response.data)

#TEST 5 - check that when a store gets added, store appears on the pending page
    def test_data_pending_page(self):
        self.add_store()
        response = self.app.get('/pending', follow_redirects=True)
        self.assertIn(b'shop small', response.data)

#TEST 6 - check that when a store gets approved, store appears on the approved page
    def test_data_approved_page(self):
        self.approve_store()
        response = self.app.get('/approved', follow_redirects=True)
        self.assertIn(b'shop small', response.data)

#TEST 7 - check that when a store gets approved, get_stores_all filters approved stores
    def test_get_stores_all(self):
        self.approve_store()
        response = self.app.get('/get_stores_all', follow_redirects=True)
        self.assertIn(b'shop small', response.data)
        self.assertTrue(response.is_json)

#TEST 8 - check that when a store gets declined, store appears on the declined page
    def test_data_declined_page(self):
        self.decline_store()
        response = self.app.get('/declined', follow_redirects=True)
        self.assertIn(b'shop small', response.data)

#TEST 9 - check that when a store gets declined, store does not appear in get_stores_all
    def test_declined_get_stores_all(self):
        self.decline_store()
        response = self.app.get('/get_stores_all')
        self.assertNotIn(b'shop small', response.data)

if __name__=='__main__':
    unittest.main()