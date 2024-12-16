from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import Player, Team, Venue, Match, Role, User, PositionEnum
from functools import wraps

main_bp = Blueprint('main', __name__)

# Utility function for checking roles
def role_required(required_roles):
    def wrapper(fn):
        @wraps(fn)
        def decorated_view(*args, **kwargs):
            identity = get_jwt_identity()
            user = User.query.get(identity)
            # Ensure user has a role and it is in the allowed roles
            if not user or not user.role or user.role.name not in required_roles:
                return jsonify({'error': 'Unauthorized access'}), 403
            return fn(*args, **kwargs)
        return decorated_view
    return wrapper

# --- TEAM ROUTES ---
@main_bp.route('/teams', methods=['POST'])
@jwt_required()
@role_required('administrator')
def create_team():
    data = request.get_json()
    if not data or not data.get('name') or not data.get('city'):
        return jsonify({"error": "Name and City are required"}), 422
    new_team = Team(name=data['name'], city=data['city'])
    db.session.add(new_team)
    db.session.commit()
    return jsonify({"message": "Team created", "id": new_team.id}), 201

@main_bp.route('/teams', methods=['GET'])
def get_teams():
    teams = Team.query.all()
    teams_list = [{"id": t.id, "name": t.name, "city": t.city} for t in teams]
    return jsonify(teams_list), 200

@main_bp.route('/teams/<int:teamId>', methods=['GET'])
def get_team(teamId):
    team = Team.query.get(teamId)
    if not team:
        return jsonify({'message': 'Team not found'}), 404
    return jsonify({"id": team.id, "name": team.name, "city": team.city}), 200

@main_bp.route('/teams/<int:teamId>', methods=['PUT'])
@jwt_required()
@role_required('administrator')
def update_team(teamId):
    team = Team.query.get(teamId)
    if not team:
        return jsonify({'message': 'Team not found'}), 404
    data = request.get_json()
    if 'name' in data:
        team.name = data['name']
    if 'city' in data:
        team.city = data['city']
    db.session.commit()
    return jsonify({"message": "Team updated"}), 200

@main_bp.route('/teams/<int:teamId>', methods=['DELETE'])
@jwt_required()
@role_required('administrator')
def delete_team(teamId):
    team = Team.query.get(teamId)
    if not team:
        return jsonify({'message': 'Team not found'}), 404
    db.session.delete(team)
    db.session.commit()
    return jsonify({"message": "Team deleted"}), 204

@main_bp.route('/teams/<int:teamId>/players', methods=['GET'])
def get_players_by_team(teamId):
    team = Team.query.get(teamId)
    if not team:
        return jsonify({'message': 'Team not found'}), 404
    players = Player.query.filter_by(team_id=teamId).all()
    players_list = [{"id": p.id, "name": p.name, "position": p.position} for p in players]
    return jsonify(players_list), 200

@main_bp.route('/teams/<int:teamId>/matches', methods=['GET'])
def get_matches_by_team(teamId):
    matches = Match.query.filter((Match.home_team_id == teamId) | (Match.away_team_id == teamId)).all()
    if not matches:
        return jsonify({'message': 'No matches found for this team'}), 404
    matches_list = [
        {"id": m.id, "date": m.date, "home_team_id": m.home_team_id, "away_team_id": m.away_team_id} for m in matches
    ]
    return jsonify(matches_list), 200

# --- PLAYER ROUTES ---
@main_bp.route('/players', methods=['POST'])
@jwt_required()
@role_required(['administrator', 'member'])  # Allow both user (member) and administrator roles
def create_player():
    data = request.get_json()

    # Validate the position
    valid_positions = [pos.name for pos in PositionEnum]  # Get valid position values (Guard, Forward, Center)
    if 'position' not in data or data['position'] not in valid_positions:
        return jsonify({"error": "Valid position (Guard, Forward, Center) is required"}), 422

    # Create new player
    new_player = Player(
        name=data['name'],
        position=data['position'],
        height=data.get('height', 0),
        weight=data.get('weight', 0),
        team_id=data.get('team_id')
    )

    db.session.add(new_player)
    db.session.commit()
    return jsonify({"message": "Player created", "id": new_player.id}), 201


@main_bp.route('/players', methods=['GET'])
def get_players():
    players = Player.query.all()
    players_list = [{"id": p.id, "name": p.name, "position": p.position.value, "team_id": p.team_id} for p in players]
    return jsonify(players_list), 200


@main_bp.route('/players/<int:playerId>', methods=['GET'])
def get_player(playerId):
    player = Player.query.get(playerId)
    if not player:
        return jsonify({'message': 'Player not found'}), 404
    return jsonify({
        "id": player.id,
        "name": player.name,
        "position": player.position,
        "team_id": player.team_id
    }), 200



@main_bp.route('/players/<int:playerId>', methods=['PUT'])
@jwt_required()
@role_required('administrator')
def update_player(playerId):
    player = Player.query.get(playerId)
    if not player:
        return jsonify({'message': 'Player not found'}), 404

    data = request.get_json()

    # Validate position
    if 'position' in data:
        valid_positions = [pos.name for pos in PositionEnum]
        if data['position'] not in valid_positions:
            return jsonify({"error": "Valid position (Guard, Forward, Center) is required"}), 422
        player.position = data['position']

    # Update other fields
    if 'name' in data:
        player.name = data['name']
    if 'height' in data:
        player.height = data['height']
    if 'weight' in data:
        player.weight = data['weight']

    db.session.commit()
    return jsonify({"message": "Player updated"}), 200


@main_bp.route('/players/<int:playerId>', methods=['DELETE'])
@jwt_required()
@role_required('administrator')
def delete_player(playerId):
    player = Player.query.get(playerId)
    if not player:
        return jsonify({'message': 'Player not found'}), 404
    db.session.delete(player)
    db.session.commit()
    return jsonify({"message": "Player deleted"}), 204

# --- VENUE ROUTES ---
@main_bp.route('/venues', methods=['POST'])
@jwt_required()
@role_required('administrator')
def create_venue():
    data = request.get_json()
    if not data or not data.get('name') or not data.get('location'):
        return jsonify({"error": "Name and Location are required"}), 422
    new_venue = Venue(name=data['name'], location=data['location'], capacity=data.get('capacity', 0))
    db.session.add(new_venue)
    db.session.commit()
    return jsonify({"message": "Venue created", "id": new_venue.id}), 201

@main_bp.route('/venues', methods=['GET'])
def get_venues():
    venues = Venue.query.all()
    venues_list = [{"id": v.id, "name": v.name, "location": v.location, "capacity": v.capacity} for v in venues]
    return jsonify(venues_list), 200

@main_bp.route('/venues/<int:venueId>', methods=['GET'])
def get_venue(venueId):
    venue = Venue.query.get(venueId)
    if not venue:
        return jsonify({'message': 'Venue not found'}), 404
    return jsonify({"id": venue.id, "name": venue.name, "location": venue.location, "capacity": venue.capacity}), 200

@main_bp.route('/venues/<int:venueId>', methods=['PUT'])
@jwt_required()
@role_required('administrator')
def update_venue(venueId):
    venue = Venue.query.get(venueId)
    if not venue:
        return jsonify({'message': 'Venue not found'}), 404
    data = request.get_json()
    if 'name' in data:
        venue.name = data['name']
    if 'location' in data:
        venue.location = data['location']
    db.session.commit()
    return jsonify({"message": "Venue updated"}), 200

@main_bp.route('/venues/<int:venueId>', methods=['DELETE'])
@jwt_required()
@role_required('administrator')
def delete_venue(venueId):
    venue = Venue.query.get(venueId)
    if not venue:
        return jsonify({'message': 'Venue not found'}), 404
    db.session.delete(venue)
    db.session.commit()
    return jsonify({"message": "Venue deleted"}), 204

# --- MATCH ROUTES ---
@main_bp.route('/matches', methods=['POST'])
@jwt_required()
@role_required('administrator')
def create_match():
    data = request.get_json()
    if not data or not data.get('date') or not data.get('home_team_id') or not data.get('away_team_id'):
        return jsonify({"error": "Date, Home Team, and Away Team are required"}), 422
    new_match = Match(
        date=data['date'],
        home_team_id=data['home_team_id'],
        away_team_id=data['away_team_id'],
        venue_id=data.get('venue_id'),
        home_team_score=data.get('home_team_score', 0),
        away_team_score=data.get('away_team_score', 0)
    )
    db.session.add(new_match)
    db.session.commit()
    return jsonify({"message": "Match created", "id": new_match.id}), 201

@main_bp.route('/matches', methods=['GET'])
def get_matches():
    matches = Match.query.all()
    matches_list = [{"id": m.id, "date": m.date, "home_team_id": m.home_team_id, "away_team_id": m.away_team_id} for m in matches]
    return jsonify(matches_list), 200

@main_bp.route('/matches/<int:matchId>', methods=['GET'])
def get_match(matchId):
    match = Match.query.get(matchId)
    if not match:
        return jsonify({'message': 'Match not found'}), 404
    return jsonify({"id": match.id, "date": match.date, "home_team_id": match.home_team_id, "away_team_id": match.away_team_id}), 200

@main_bp.route('/matches/<int:matchId>', methods=['PUT'])
@jwt_required()
@role_required('administrator')
def update_match(matchId):
    match = Match.query.get(matchId)
    if not match:
        return jsonify({'message': 'Match not found'}), 404
    data = request.get_json()
    if 'date' in data:
        match.date = data['date']
    db.session.commit()
    return jsonify({"message": "Match updated"}), 200

@main_bp.route('/matches/<int:matchId>', methods=['DELETE'])
@jwt_required()
@role_required('administrator')
def delete_match(matchId):
    match = Match.query.get(matchId)
    if not match:
        return jsonify({'message': 'Match not found'}), 404
    db.session.delete(match)
    db.session.commit()
    return jsonify({"message": "Match deleted"}), 204
