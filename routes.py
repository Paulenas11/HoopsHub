from datetime import datetime
from flask import Blueprint, request, jsonify
from extensions import db
from sqlalchemy.exc import IntegrityError
from models import Player, Team, Venue, Match

main_bp = Blueprint('main', __name__)

# Team routes
@main_bp.route('/teams', methods=['POST'])
def create_team():
    data = request.get_json()

    # Validate that required fields exist, are strings, and are not empty
    if not data:
        return jsonify({"error": "Request data is missing"}), 422

    # Check that 'name' is a non-empty string
    if "name" not in data or not isinstance(data["name"], str) or not data["name"].strip():
        return jsonify({"error": "Name is required and must be a non-empty string"}), 422

    # Check that 'city' is a non-empty string
    if "city" not in data or not isinstance(data["city"], str) or not data["city"].strip():
        return jsonify({"error": "City is required and must be a non-empty string"}), 422

    # Create a new team if validations pass
    new_team = Team(name=data["name"], city=data["city"])
    db.session.add(new_team)
    try:
        db.session.commit()
        return jsonify({"message": "Team created"}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "A database integrity error occurred"}), 500


@main_bp.route('/teams', methods=['GET'])
def get_teams():
    teams = Team.query.all()
    teams_list = [{"id": team.id, "name": team.name, "city": team.city} for team in teams]
    return jsonify(teams_list)

@main_bp.route('/teams/<int:teamId>', methods=['GET'])
def get_team(teamId):
    team = Team.query.get(teamId)
    if team:
        return jsonify({"id": team.id, "name": team.name, "city": team.city}), 200
    else:
        return jsonify({'message': 'Team not found'}), 404

@main_bp.route('/teams/<int:teamId>', methods=['PUT'])
def update_team(teamId):
    data = request.get_json()
    if not data:
        return jsonify({"error": "Request data cannot be empty"}), 422

    team = Team.query.get(teamId)
    if team:
        # Validate 'name' and 'city' fields if they are provided
        if 'name' in data:
            if not isinstance(data['name'], str) or not data['name'].strip():
                return jsonify({"error": "Name must be a non-empty string"}), 422
            team.name = data['name']
        if 'city' in data:
            if not isinstance(data['city'], str) or not data['city'].strip():
                return jsonify({"error": "City must be a non-empty string"}), 422
            team.city = data['city']

        db.session.commit()
        return jsonify({'message': 'Team updated'}), 200

    return jsonify({'message': 'Team not found'}), 404


@main_bp.route('/teams/<int:teamId>', methods=['DELETE'])
def delete_team(teamId):
    team = Team.query.get(teamId)
    if team:
        db.session.delete(team)
        db.session.commit()
        return jsonify({'message': 'Team deleted'}), 204
    else:
        return jsonify({'message': 'Team not found'}), 404

# Player routes
@main_bp.route('/players', methods=['POST'])
def create_player():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Request data is missing"}), 422

    if "name" not in data or not isinstance(data["name"], str) or not data["name"].strip():
        return jsonify({"error": "Name is required and must be a non-empty string"}), 422
    if "position" not in data or not isinstance(data["position"], str) or not data["position"].strip():
        return jsonify({"error": "Position is required and must be a non-empty string"}), 422
    if "height" not in data or not isinstance(data["height"], (int, float)) or data["height"] <= 0:
        return jsonify({"error": "Height is required and must be a positive number"}), 422
    if "weight" not in data or not isinstance(data["weight"], (int, float)) or data["weight"] <= 0:
        return jsonify({"error": "Weight is required and must be a positive number"}), 422

    new_player = Player(
        name=data['name'],
        position=data['position'],
        height=data['height'],
        weight=data['weight'],
        team_id=data.get('team_id')
    )
    db.session.add(new_player)
    db.session.commit()
    return jsonify({'message': 'New Player created'}), 201

@main_bp.route('/players', methods=['GET'])
def get_players():
    players = Player.query.all()
    players_list = [{"id": player.id, "name": player.name, "position": player.position, "height": player.height, "weight": player.weight, "team_id": player.team_id} for player in players]
    return jsonify(players_list)

@main_bp.route('/players/<int:playerId>', methods=['GET'])
def get_player(playerId):
    player = Player.query.get(playerId)
    if player:
        return jsonify({"id": player.id, "name": player.name, "position": player.position, "height": player.height, "weight": player.weight, "team_id": player.team_id}), 200
    else:
        return jsonify({'message': 'Player not found'}), 404

@main_bp.route('/players/<int:playerId>', methods=['PUT'])
def update_player(playerId):
    data = request.get_json()
    if not data:
        return jsonify({"error": "Request data cannot be empty"}), 422

    player = Player.query.get(playerId)
    if player:
        # Validate fields if provided
        if 'name' in data:
            if not isinstance(data['name'], str) or not data['name'].strip():
                return jsonify({"error": "Name must be a non-empty string"}), 422
            player.name = data['name']
        if 'position' in data:
            if not isinstance(data['position'], str) or not data['position'].strip():
                return jsonify({"error": "Position must be a non-empty string"}), 422
            player.position = data['position']
        if 'height' in data:
            if not isinstance(data['height'], (int, float)) or data['height'] <= 0:
                return jsonify({"error": "Height must be a positive number"}), 422
            player.height = data['height']
        if 'weight' in data:
            if not isinstance(data['weight'], (int, float)) or data['weight'] <= 0:
                return jsonify({"error": "Weight must be a positive number"}), 422
            player.weight = data['weight']
        if 'team_id' in data:
            player.team_id = data['team_id']

        db.session.commit()
        return jsonify({'message': 'Player updated'}), 200

    return jsonify({'message': 'Player not found'}), 404

@main_bp.route('/players/<int:playerId>', methods=['DELETE'])
def delete_player(playerId):
    player = Player.query.get(playerId)
    if player:
        db.session.delete(player)
        db.session.commit()
        return jsonify({'message': 'Player deleted'}), 204
    else:
        return jsonify({'message': 'Player not found'}), 404

# Venue routes
@main_bp.route('/venues', methods=['POST'])
def create_venue():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Request data is missing"}), 422

    if "name" not in data or not isinstance(data["name"], str) or not data["name"].strip():
        return jsonify({"error": "Name is required and must be a non-empty string"}), 422
    if "location" not in data or not isinstance(data["location"], str) or not data["location"].strip():
        return jsonify({"error": "Location is required and must be a non-empty string"}), 422
    if "capacity" not in data or not isinstance(data["capacity"], int) or data["capacity"] <= 0:
        return jsonify({"error": "Capacity is required and must be a positive integer"}), 422

    new_venue = Venue(
        name=data['name'],
        location=data['location'],
        capacity=data['capacity']
    )
    db.session.add(new_venue)
    db.session.commit()
    return jsonify({'message': 'New Venue created'}), 201

@main_bp.route('/venues', methods=['GET'])
def get_venues():
    venues = Venue.query.all()
    venues_list = [{"id": venue.id, "name": venue.name, "location": venue.location, "capacity": venue.capacity} for venue in venues]
    return jsonify(venues_list)

@main_bp.route('/venues/<int:venueId>', methods=['GET'])
def get_venue(venueId):
    venue = Venue.query.get(venueId)
    if venue:
        return jsonify({"id": venue.id, "name": venue.name, "location": venue.location, "capacity": venue.capacity}), 200
    else:
        return jsonify({'message': 'Venue not found'}), 404

@main_bp.route('/venues/<int:venueId>', methods=['PUT'])
def update_venue(venueId):
    data = request.get_json()
    if not data:
        return jsonify({"error": "Request data cannot be empty"}), 422

    venue = Venue.query.get(venueId)
    if venue:
        # Validate fields if provided
        if 'name' in data:
            if not isinstance(data['name'], str) or not data['name'].strip():
                return jsonify({"error": "Name must be a non-empty string"}), 422
            venue.name = data['name']
        if 'location' in data:
            if not isinstance(data['location'], str) or not data['location'].strip():
                return jsonify({"error": "Location must be a non-empty string"}), 422
            venue.location = data['location']
        if 'capacity' in data:
            if not isinstance(data['capacity'], int) or data['capacity'] <= 0:
                return jsonify({"error": "Capacity must be a positive integer"}), 422
            venue.capacity = data['capacity']

        db.session.commit()
        return jsonify({'message': 'Venue updated'}), 200

    return jsonify({'message': 'Venue not found'}), 404

@main_bp.route('/venues/<int:venueId>', methods=['DELETE'])
def delete_venue(venueId):
    venue = Venue.query.get(venueId)
    if venue:
        db.session.delete(venue)
        db.session.commit()
        return jsonify({'message': 'Venue deleted'}), 204
    else:
        return jsonify({'message': 'Venue not found'}), 404

# Match routes
@main_bp.route('/matches', methods=['POST'])
def create_match():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Request data is missing"}), 422

    required_fields = ["date", "home_team_id", "away_team_id", "venue_id"]
    for field in required_fields:
        if field not in data or data[field] is None:
            return jsonify({"error": f"{field} is required and cannot be null"}), 422

    if "home_team_score" in data and (not isinstance(data["home_team_score"], int) or data["home_team_score"] < 0):
        return jsonify({"error": "Home team score must be a non-negative integer"}), 422
    if "away_team_score" in data and (not isinstance(data["away_team_score"], int) or data["away_team_score"] < 0):
        return jsonify({"error": "Away team score must be a non-negative integer"}), 422

    new_match = Match(
        date=data['date'],
        home_team_id=data['home_team_id'],
        away_team_id=data['away_team_id'],
        venue_id=data['venue_id'],
        home_team_score=data.get('home_team_score', 0),
        away_team_score=data.get('away_team_score', 0)
    )
    db.session.add(new_match)
    db.session.commit()
    return jsonify({'message': 'New Match created'}), 201

@main_bp.route('/matches', methods=['GET'])
def get_matches():
    matches = Match.query.all()
    matches_list = [{"id": match.id, "date": match.date, "home_team_id": match.home_team_id, "away_team_id": match.away_team_id, "venue_id": match.venue_id, "home_team_score": match.home_team_score, "away_team_score": match.away_team_score} for match in matches]
    return jsonify(matches_list)

@main_bp.route('/matches/<int:matchId>', methods=['GET'])
def get_match(matchId):
    match = Match.query.get(matchId)
    if match:
        return jsonify({"id": match.id, "date": match.date, "home_team_id": match.home_team_id, "away_team_id": match.away_team_id, "venue_id": match.venue_id, "home_team_score": match.home_team_score, "away_team_score": match.away_team_score}), 200
    else:
        return jsonify({'message': 'Match not found'}), 404

@main_bp.route('/matches/<int:matchId>', methods=['PUT'])
def update_match(matchId):
    data = request.get_json()
    if not data:
        return jsonify({"error": "Request data cannot be empty"}), 422

    match = Match.query.get(matchId)
    if match:
        # Validate fields if provided
        if 'date' in data:
            match.date = data['date']
        if 'home_team_id' in data:
            match.home_team_id = data['home_team_id']
        if 'away_team_id' in data:
            match.away_team_id = data['away_team_id']
        if 'venue_id' in data:
            match.venue_id = data['venue_id']
        if 'home_team_score' in data:
            if not isinstance(data['home_team_score'], int) or data['home_team_score'] < 0:
                return jsonify({"error": "Home team score must be a non-negative integer"}), 422
            match.home_team_score = data['home_team_score']
        if 'away_team_score' in data:
            if not isinstance(data['away_team_score'], int) or data['away_team_score'] < 0:
                return jsonify({"error": "Away team score must be a non-negative integer"}), 422
            match.away_team_score = data['away_team_score']

        db.session.commit()
        return jsonify({'message': 'Match updated'}), 200

    return jsonify({'message': 'Match not found'}), 404

@main_bp.route('/matches/<int:matchId>', methods=['DELETE'])
def delete_match(matchId):
    match = Match.query.get(matchId)
    if match:
        db.session.delete(match)
        db.session.commit()
        return jsonify({'message': 'Match deleted'}), 204
    else:
        return jsonify({'message': 'Match not found'}), 404
