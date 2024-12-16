from app import app  # Import your Flask app
from extensions import db
from sqlalchemy.sql import text

with app.app_context():
    # Use raw SQL to update invalid positions
    db.session.execute(text("UPDATE player SET position='GUARD' WHERE position='Guard'"))
    db.session.execute(text("UPDATE player SET position='FORWARD' WHERE position='Forward'"))
    db.session.execute(text("UPDATE player SET position='CENTER' WHERE position='Center'"))
    db.session.commit()

print("All player positions have been updated to match the enum values.")
