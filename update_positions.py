from app import app  # Import your Flask app
from extensions import db
from models import Player, PositionEnum

with app.app_context():
    # Fetch all players
    players = Player.query.all()

    # Update the position of players to ensure they are valid
    for player in players:
        if player.position not in [pos.value for pos in PositionEnum]:
            # If position is invalid, set it to a default value
            print(f"Updating player {player.name} with invalid position {player.position}")
            player.position = PositionEnum.GUARD.value
            db.session.add(player)

    # Commit the changes to the database
    db.session.commit()

print("All invalid player positions have been updated.")
