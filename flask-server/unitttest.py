import coverage
import unittest
import json
from flask import Flask
from server import app, user_data

class FlaskAppTests(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def test_get_user_info_existing_user(self):
        response = self.app.get('/user/1000')
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
        response = self.app.get('/user/9999')
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
        response = self.app.post('/update/profile/1000', json=data)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['state'], 'pass')
        self.assertNotIn('message', data)
        # Verify that user data has been updated
        self.assertEqual(user_data['1000']['Name'], 'New Name')
        self.assertEqual(user_data['1000']['Address 1'], '456 ABC St')

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
        # Verify that user data has not been updated
        self.assertNotEqual(user_data['1000']['Name'], 'New Name')
        self.assertNotEqual(user_data['1000']['Address 1'], None)
    def test_login_successful(self):
        data = {
            'username': 'admin',
            'password': 'password'
        }
        response = self.app.post('/login', json=data)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Login successful')

    def test_login_invalid_credentials(self):
        data = {
            'username': 'invalid',
            'password': 'invalid'
        }
        response = self.app.post('/login', json=data)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Invalid credentials')

    def test_submit_quote(self):
        data = {
            'gallons_requested': 100,
            'delivery_address': '123 XYZ St',
            'delivery_date': '2023-07-01',
            'suggested_price': 3.5,
            'total_amount': 350.0
        }
        response = self.app.post('/submit/quote', json=data)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['state'], 'success')

    # Placeholder test for the Pricing module
    def test_pricing_module_placeholder(self):
        # TODO: Implement proper test cases for the Pricing module
        pricing_module = PricingModule(base_price=10.0)
        # Add test cases for pricing calculations, discounts, tax, etc.
        
if __name__ == '__main__':
    cov = coverage.Coverage()
    cov.start()
    unittest.main()
    cov.stop()
    cov.save()
    cov.report()
