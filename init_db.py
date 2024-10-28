import sys
import os

# Add the parent directory to the system path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# init_db.py
from app import app  # Import the app to access the context
from extensions import db  # Import the initialized db object from extensions

# Ensure tables are created when this script is run
with app.app_context():
    db.create_all()
    print("Database tables created.")
