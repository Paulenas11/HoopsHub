# app.py
from flask import Flask
from flasgger import Swagger
from extensions import db
from config import Config
import logging

app = Flask(__name__)
app.config.from_object(Config)

# Initialize the database with the app
db.init_app(app)

# Set up Swagger for API documentation
swagger = Swagger(app)

# Register the blueprint after initializing db
from routes import main_bp
app.register_blueprint(main_bp)

# Check for tables and create them if they don’t exist
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    app.run(debug=True)
