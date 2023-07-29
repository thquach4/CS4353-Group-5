from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import re
import random
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.sqlite3'
db = SQLAlchemy(app)
CORS(app)

# ================ login and profile related codes ================

class Login(db.Model):
    __tablename__ = 'login'
    name = db.Column(db.String(255), primary_key=True)
    pw = db.Column(db.String(255))
    id = db.Column(db.Integer)

class User(db.Model):
    # Define table name (optional)
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    address1 = db.Column(db.String(255))
    address2 = db.Column(db.String(255))
    city = db.Column(db.String(255))
    state = db.Column(db.String(255))
    zipcode = db.Column(db.String(5))


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

@app.route('/get/profile/<uid>')
def get_user_info(uid):
    user = User.query.get(uid)
    if user:
        return jsonify(
            [
                ('Name', user.name),
                ('Address 1', user.address1),
                ('Address 2', user.address2),
                ('City', user.city),
                ('State', user.state),
                ('Zip Code', user.zipcode),
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
        user = User.query.get(uid)
        user.name = name
        user.address1 = address1
        user.address2 = address2
        user.city = city
        user.state = state
        user.zipcode = zipcode
        db.session.commit()
        response = {'state': 'pass'}
    else:
        response = {'state': 'failed', 'message': errorMsg}
    return jsonify(response)
    
# ================ END OF login and profile related codes ================

# ================ history and quote related codes =================================
# Helper function to check if the user has rate history (replace with actual implementation based on user authentication)
def has_rate_history(uid):
    return History.query.filter_by(uid=uid).first() is not None

class History(db.Model):
    __tablename__ = 'History'

    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, nullable=False)
    delivery_address = db.Column(db.String(255), nullable=False)
    gallons_requested = db.Column(db.Float, nullable=False)
    delivery_date = db.Column(db.Date, nullable=False)
    suggested_price = db.Column(db.Float, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)

@app.route('/register/user/quote', methods=['POST'])
def quote():
    data = request.get_json()
    delivery_address = data.get('delivery_address', None)
    gallons_requested = data.get('gallons_requested', None)
    delivery_date = data.get('delivery_date', None)
    state = data.get('state', '').lower()  # Get the state and convert to lowercase
    user_id = data.get('user_id', '')

    # Check if any of the attributes are None
    if delivery_address is None or gallons_requested is None or delivery_date is None:
        return jsonify({'error': 'One or more attributes are missing in the user\'s quote.'}), 400

# ===================== pricing module ==========================================
    # Calculate the suggested price and total amount
    current_price_per_gallon = 1.50
    location_factor = 0.02 if state == 'tx' else 0.04  # Use the state information here
    rate_history_factor = 0.01 if has_rate_history(data.get('userId')) else 0.00
    gallons_requested_factor = 0.02 if gallons_requested > 1000 else 0.03
    company_profit_factor = 0.10

    margin = (
        location_factor
        - rate_history_factor
        + gallons_requested_factor
        + company_profit_factor
    ) * current_price_per_gallon

    suggested_price = current_price_per_gallon + margin
    total_amount = suggested_price * gallons_requested
    company_profit = total_amount * company_profit_factor
# ======================== end pricing module related code ========================
  
    # Create a new quote history record in the database
    quote_id = random.randint(1, 10000)
    while History.query.filter_by(id=quote_id).first():
        quote_id = random.randint(1, 10000)

    new_quote = History(
        id=quote_id,
        uid=user_id,
        delivery_address=delivery_address,
        gallons_requested=gallons_requested,
        delivery_date=datetime.strptime(delivery_date, '%Y-%m-%d').date(),
        suggested_price=suggested_price,
        total_amount=total_amount,
    )
    db.session.add(new_quote)
    db.session.commit()

    # Return the suggested price and total amount in the response
    response = {
        'message': "User's quote has been registered successfully.",
        'suggested_price': suggested_price,
        'total_amount': total_amount,
        'quote_id': quote_id,
    }
    return jsonify(response), 200


@app.route('/get/history/<user_id>')
def get_quote_history(user_id):
    history = History.query.filter_by(uid=user_id)
    if history.first():
        res = []
        for h in history:
            res.append(
                {
                    'delivery_address': h.delivery_address,
                    'gallons_requested': h.gallons_requested,
                    'delivery_date': h.delivery_date.strftime('%Y-%m-%d'),
                    'suggested_price': h.suggested_price,
                    'total_amount': h.total_amount,
                }
            )
        return jsonify({'history': res})
    else:
        return jsonify({'error': 'History not found'})

# =================== END of history and quote related codes ===================

def inject_fake_data():
    # Sample login data
    login_data = {
        'name': 'test',
        'pw': 'qwerty',
        'id': '1000'
    }

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

    # Sample quote history data
    quote_history_data = {
        '1000': {
            'user_id': 1000,
            'delivery_address': '456 ABC St',
            'gallons_requested': 100,
            'delivery_date': '2023-07-22',
            'suggested_price': 2.8,
            'total_amount': 280.0,
        },
        '1001': {
            'user_id': 1000,
            'delivery_address': '789 XYZ St',
            'gallons_requested': 150,
            'delivery_date': '2023-07-23',
            'suggested_price': 2.6,
            'total_amount': 390.0,
        },
    }

    # Inject fake data into the database
    with app.app_context():
        db.drop_all()
        db.create_all()
        if not Login.query.get(login_data["name"]):
            login = Login(
                name=login_data["name"],
                pw=login_data["pw"],
                id=login_data["id"],
            )
            db.session.add(login)

        for id in user_data:
            if User.query.get(id):
                continue
            user = create_user(
                id,
                user_data[id]["Name"],
                user_data[id]["Address 1"],
                user_data[id]["Address 2"],
                user_data[id]["City"],
                user_data[id]["State"],
                user_data[id]["Zip Code"],
            )
            db.session.add(user)
        
        for id in quote_history_data:
            if History.query.get(id):
                continue
            quote = History(
                id=id,
                uid=quote_history_data[id]['user_id'],
                delivery_address=quote_history_data[id]['delivery_address'],
                gallons_requested=quote_history_data[id]['gallons_requested'],
                delivery_date=datetime.strptime(quote_history_data[id]['delivery_date'], '%Y-%m-%d').date(),
                suggested_price=quote_history_data[id]['suggested_price'],
                total_amount=quote_history_data[id]['total_amount'],
            )
            db.session.add(quote)
        db.session.commit()

def create_user(
        uId,
        uName=None,
        uAddress1=None, 
        uAddress2=None, 
        uCity=None, 
        uState=None, 
        uZipCode=None,
    ):
    return User(
        id=uId,
        name=uName,
        address1=uAddress1,
        address2=uAddress2,
        city=uCity,
        state=uState,
        zipcode=uZipCode
    )

@app.route('/')
def root():
    return "Flask server is running!"

if __name__ == '__main__':
    inject_fake_data()
    app.run(host='127.0.0.1', port=1234, debug=True)