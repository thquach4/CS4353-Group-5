from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample user data
user_data = {
    '1000': {
        'Name': 'QWERTY ABCDEF',
        'Address 1': '123 XYZ St',
        'Address 2': None,
        'City': 'AWESOME',
        'State': 'AB',
        'Zip Code': '12345',
    },
    '1001': {
        'Name': 'HELLO WORLD',
        'Address 1': '123 XYZ St',
        'Address 2': None,
        'City': 'AWESOME',
        'State': 'AB',
        'Zip Code': '12345',
    },
}

class QuoteHistory:
    def __init__(self):
        self.quotes = []

    def add_quote(self, gallons_requested, delivery_address, delivery_date, suggested_price, total_amount):
        quote = {
            'gallons_requested': gallons_requested,
            'delivery_address': delivery_address,
            'delivery_date': delivery_date,
            'suggested_price': suggested_price,
            'total_amount': total_amount
        }
        self.quotes.append(quote)

    def get_quotes(self):
        return self.quotes

class PricingModule:
    def __init__(self, base_price):
        self.base_price = base_price
    
    # TODO: Implement pricing calculations based on assignment requirements

quote_history = QuoteHistory()
pricing_module = PricingModule(base_price=10.0)  # Set the base price as needed

@app.route('/submit/quote', methods=['POST'])
def submit_quote():
    data = request.get_json()
    gallons_requested = data.get('gallons_requested', None)
    delivery_address = data.get('delivery_address', None)
    delivery_date = data.get('delivery_date', None)
    suggested_price = data.get('suggested_price', None)
    total_amount = data.get('total_amount', None)

    # TODO: Use the pricing module to calculate the total amount
    total_amount = pricing_module.calculate_total_amount()

    # Create an instance of QuoteHistory and add the quote
    quote_history = QuoteHistory()
    quote_history.add_quote(gallons_requested, delivery_address, delivery_date, suggested_price, total_amount)

    # Return a response to the client
    return jsonify({'state': 'success'})

@app.route('/user/<uid>')
def get_user_info(uid):
    if uid in user_data:
        data = user_data[uid]
        return jsonify(
            [
                ('Name', data['Name']),
                ('Address 1', data['Address 1']),
                ('Address 2', data['Address 2']),
                ('City', data['City']),
                ('State', data['State']),
                ('Zip Code', data['Zip Code']),
            ]
        )
    else:
        return jsonify({'error': 'User not found'})
    
@app.route('/update/profile/<uid>', methods=['POST'])
def update_user_profile(uid):
    data = request.get_json()
    # Access the data sent from Angular
    name = data.get('name', None)
    address1 = data.get('address1', None)
    address2 = data.get('address2', None)
    city = data.get('city', None)
    state = data.get('state', None)
    zipcode = data.get('zipcode', None)

    # Perform verification logic here
    errorMsg = None
    if name is None or name == "":
        errorMsg = "Name is required, please provide a valid name."
    elif address1 is None or address1 == "":
        errorMsg = "Address 1 is required, please provide a valid address."
    elif city is None or city == "":
        errorMsg = "City is required, please provide a valid address."
    elif state is None or len(state) != 2:
        errorMsg = "State is invalid, please provide a two character state code."
    elif zipcode is None or len(str(zipcode)) != 5:
        errorMsg = "Zipcode is invalid, please provide a five digit zip code."

    if errorMsg is None:
        response = {'state': 'pass'}
        user_data[uid] = {
            'Name': name,
            'Address 1': address1,
            'Address 2': address2,
            'City': city,
            'State': state,
            'Zip Code': zipcode,
        }
    else:
        response = {'state': 'failed', 'message': errorMsg}
    return jsonify(response)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username', None)
    password = data.get('password', None)

    if username and password:
        result = LoginModule.login(username, password)
        return jsonify(result)
    else:
        return jsonify({'message': 'Invalid credentials'})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=1234, debug=True)
 

