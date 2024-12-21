# init_db.py
import sys
import os

# Add the parent directory to the system path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app, seed_roles_and_admin  # Import app and seeding function
from extensions import db  # Import the initialized db object

# Create tables and seed data
with app.app_context():
    db.create_all()  # Create all tables
    print("Database tables created.")

    # Seed roles and admin user
    seed_roles_and_admin()
    print("Roles and admin user seeded.")
