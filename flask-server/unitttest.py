import unittest
import json
from flask import Flask
from server import app, User, Login, db, inject_fake_data

class FlaskAppTests(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()
        inject_fake_data()

    def tearDown(self):
        # Remove the test database after each test
        with app.app_context():
            db.drop_all()

    def reset(self):
        with app.app_context():
            user = User.query.get('1000')
            user.name = 'QWERTY ABCDEF'
            user.address1 = '123 XYZ St'
            user.address2 = None
            user.city = 'AWESOME'
            user.state = 'AB'
            user.zipcode = '12345'
            db.session.commit()

    def test_get_user_info_existing_user(self):
        response = self.app.get('/get/profile/1000')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        expected = [
            ('Name', 'QWERTY ABCDEF'),
            ('Address 1', '123 XYZ St'),
            ('Address 2', None),
            ('City', 'AWESOME'),
            ('State', 'AB'),
            ('Zip Code', '12345'),
        ]
        for act, exp in zip(data, expected):
            self.assertEqual(act[0], exp[0])
            self.assertEqual(act[1], exp[1])

    def test_get_user_info_nonexistent_user(self):
        response = self.app.get('/get/profile/99999')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['error'], 'User not found')

    def test_update_user_profile_valid_data(self):
        data = {
            'name': 'New Name',
            'address1': '456 ABC St',
            'address2': None,
            'city': 'New City',
            'state': 'XY',
            'zipcode': '98765'
        }
        response = self.app.post('/update/profile/1001', json=data)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['state'], 'pass')
        self.assertNotIn('message', data)
        self.reset()

    def test_update_user_profile_invalid_data(self):
        data = {
            'name': 'New Name',
            'address1': None,
            'address2': None,
            'city': 'New City',
            'state': 'XYZ',
            'zipcode': '987'
        }
        response = self.app.post('/update/profile/1000', json=data)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['state'], 'failed')
        self.assertEqual(data['message'], 'Address 1 is required, please provide a valid address.')
        self.reset()

    def test_register_user(self):
        # Test registering a new user
        data = {'username': 'testuser', 'password': 'testpassword'}
        response = self.app.post('/register/user', json=data)
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['state'], 'pass')

    def test_register_existing_user(self):
        # Test registering an existing user
        with app.app_context():
            existing_user = Login(name='existinguser', pw='existingpassword', id=1)
            db.session.add(existing_user)
            db.session.commit()

        data = {'username': 'existinguser', 'password': 'testpassword'}
        response = self.app.post('/register/user', json=data)
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['state'], 'failed')
        self.assertEqual(data['message'], 'This username has already been registered, please try a new one.')

    def test_login_user(self):
        # Test login with correct credentials
        with app.app_context():
            login = Login(name='testuser', pw='testpassword', id=1)
            db.session.add(login)
            db.session.commit()

        data = {'username': 'testuser', 'password': 'testpassword'}
        response = self.app.post('/login/user', json=data)
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['state'], 'pass')
        self.assertIn('uid', data)

    def test_login_invalid_user(self):
        # Test login with incorrect credentials
        with app.app_context():
            login = Login(name='testuser', pw='testpassword', id=1)
            db.session.add(login)
            db.session.commit()

        data = {'username': 'testuser', 'password': 'wrongpassword'}
        response = self.app.post('/login/user', json=data)
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['state'], 'failed')
        self.assertEqual(data['message'], 'The password is incorrect. Please double check.')
    
    def test_register_user_quote(self):
    data = {
        'delivery_address': '123 Test St',
        'gallons_requested': 100,
        'delivery_date': '2023-07-21',
        'suggested_price': 3.5,
        'total_amount': 350,
    }
    response = self.app.post('/register/user/quote', json=data)
    data = response.get_json()
    self.assertEqual(response.status_code, 200)
    self.assertEqual(data['message'], 'User\'s quote has been registered successfully.')

    def test_get_quote_history_existing_quote(self):
    # Register a new quote to get its ID
    data = {
        'delivery_address': '123 Test St',
        'gallons_requested': 100,
        'delivery_date': '2023-07-21',
        'suggested_price': 3.5,
        'total_amount': 350,
    }
    response = self.app.post('/register/user/quote', json=data)
    data = response.get_json()
    quote_id = data['id']

    # Test retrieving the quote history using the quote_id
    response = self.app.get(f'/get/history/{quote_id}')
    data = response.get_json()
    self.assertEqual(response.status_code, 200)
    self.assertIn('history', data)
    self.assertEqual(len(data['history']), 1)

    # Ensure the retrieved data matches the original data
    quote_data = data['history'][0]
    self.assertEqual(quote_data['delivery_address'], '123 Test St')
    self.assertEqual(quote_data['gallons_requested'], 100)
    self.assertEqual(quote_data['delivery_date'], '2023-07-21')
    self.assertEqual(quote_data['suggested_price'], 3.5)
    self.assertEqual(quote_data['total_amount'], 350)

    def test_get_quote_history_nonexistent_quote(self):
    # Test retrieving a quote that does not exist
    response = self.app.get('/get/history/99999')
    data = response.get_json()
    self.assertEqual(response.status_code, 200)
    self.assertIn('error', data)
    self.assertEqual(data['error'], 'History not found')


if __name__ == '__main__':
    unittest.main()