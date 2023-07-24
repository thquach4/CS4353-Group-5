from server import app, db, History

def check_quotes():
    # Create an application context to work within the Flask app
    with app.app_context():
        # Query the History table to fetch all quotes
        quotes = History.query.all()

        # Print the quotes to verify they are stored correctly
        for quote in quotes:
            print(f"Quote ID: {quote.id}")
            print(f"Delivery Address: {quote.delivery_address}")
            print(f"Gallons Requested: {quote.gallons_requested}")
            print(f"Delivery Date: {quote.delivery_date}")
            print(f"Suggested Price: {quote.suggested_price}")
            print(f"Total Amount: {quote.total_amount}")
            print("---------------------------")

if __name__ == '__main__':
    check_quotes()