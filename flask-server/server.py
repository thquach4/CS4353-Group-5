from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.sqlite3'
db = SQLAlchemy(app)
CORS(app)



class ClientHistory(Base):
    __tablename__ = 'ClientHistory'

    id = Column(Integer, primary_key=True, autoincrement=True)
    delivery_address = Column(String(255), nullable=False)
    gallons_requested = Column(Float, nullable=False)
    delivery_date = Column(Date, nullable=False)
    suggested_price = Column(Float, nullable=False)
    total_amount = Column(Float, nullable=False)
    state_id = Column(Integer, ForeignKey('states.id'), nullable=False)

    # Many-to-one relationship with states
    state = relationship('State', back_populates='client_history')

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

quote_history = QuoteHistory()

@app.route('/quote-history/<uid>')
def get_quote_history(uid):
    if uid in user_data:
        return jsonify(quote_history.get_quotes())
    else:
        return jsonify({'error': 'User not found'})

class PricingModule:
    def __init__(self, base_price):
        self.base_price = base_price
    
    # TODO: Implement pricing calculations based on assignment requirements

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
    quote_history.add_quote(gallons_requested, delivery_address, delivery_date, suggested_price, total_amount)

    # Return a response to the client
    return jsonify({'state': 'success'})

class Login(db.Model):
    __tablename__ = 'login'
    name = db.Column(db.String(255), primary_key=True)
    pw = db.Column(db.String(255))
    id = db.Column(db.Integer)

class State(db.Model):
    __tablename__ = 'states'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    abbreviation = db.Column(db.String(2), nullable=False)
    
class User(db.Model):
    # Define table name (optional)
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    address1 = db.Column(db.String(255))
    address2 = db.Column(db.String(255))
    city = db.Column(db.String(255))
    state_id = db.Column(db.Integer, db.ForeignKey('states.id'))
    zipcode = db.Column(db.String(5))

    state = db.relationship('State', backref=db.backref('users'))

@app.route('/register/user', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username', None)
    password = data.get('password', None)
    
    errorMessage = None
    if username is None or not re.match("^[A-Za-z]+$", username):
        errorMessage = "Username should not be empty and should contains alphabetic letters only"
    if password is None or len(password) < 6 or len(password) > 20 or not re.match("^[A-Za-z0-9]+$", password):
        errorMessage = "Password should not be empty and should contains alphabetic letters or numbers"

    login = Login.query.get(username)
    if login:
        errorMessage = "This username has already been registered, please try a new one."

    if errorMessage is None:
        # create a random uid that is not in the existing table
        uid = random.randint(1, 10000)
        while Login.query.filter_by(id=uid).first():
            uid = random.randint(1, 10000)
        login = Login(
            name=username,
            pw=password,
            id=uid,
        )
        user = create_user(uid)
        db.session.add(login)
        db.session.add(user)
        db.session.commit()
        response = {'state': 'pass'}
    else:
        response = {'state': 'failed', 'message': errorMessage}
    return jsonify(response)


@app.route('/login/user', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data.get('username', None)
    password = data.get('password', None)

    errorMessage = None
    login = Login.query.get(username)
    if not login:
        errorMessage = "This username does not exist. Please double check."
    elif login.pw != password:
        errorMessage = "The password is incorrect. Please double check."

    if errorMessage is None:
        response = {'state': 'pass', 'uid': login.id}
    else:
        response = {'state': 'failed', 'message': errorMessage}
    return jsonify(response)

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
        errorMsg = "State is invalid, please provide a two-character state code."
    elif zipcode is None or len(str(zipcode)) != 5:
        errorMsg = "Zipcode is invalid, please provide a five-digit zip code."

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


