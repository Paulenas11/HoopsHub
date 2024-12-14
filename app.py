from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt
)
from routes import main_bp
from models import Role, User
from extensions import db
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

app.register_blueprint(main_bp)

# JWT Claims Loader
@jwt.additional_claims_loader
def add_claims_to_access_token(identity):
    user = User.query.get(identity)
    return {'role': user.role.name if user and user.role else 'guest'}

# Seeding Roles and Admin
def seed_roles_and_admin():
    with app.app_context():
        roles = ['guest', 'member', 'administrator']
        for role_name in roles:
            if not Role.query.filter_by(name=role_name).first():
                db.session.add(Role(name=role_name))
        db.session.commit()

        admin_role = Role.query.filter_by(name='administrator').first()
        if not User.query.filter_by(username='admin').first():
            admin_user = User(username='admin', role_id=admin_role.id)
            admin_user.set_password('admin123')
            db.session.add(admin_user)
            db.session.commit()

@app.route("/")
def index():
    return "Hello men!"

# Login Endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))
        return jsonify({"access_token": access_token, "refresh_token": refresh_token}), 200
    return jsonify({"error": "Invalid credentials"}), 401

# Register Endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"error": "Username and Password are required"}), 422

    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username already exists"}), 409

    # Fetch the 'member' role for new users
    member_role = Role.query.filter_by(name='member').first()
    if not member_role:
        return jsonify({"error": "Default role 'member' not found. Contact admin."}), 500

    # Create a new user with the member role
    new_user = User(username=data['username'], role_id=member_role.id)
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201



# Refresh Token Endpoint
import logging

logging.basicConfig(level=logging.DEBUG)


@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    app.logger.debug("Starting refresh endpoint")
    try:
        app.logger.debug("Headers: %s", request.headers)
        current_user = get_jwt_identity()
        app.logger.debug("Decoded user identity: %s", current_user)

        if not current_user:
            app.logger.error("No user identity found in token")
            return jsonify({"msg": "Invalid refresh token"}), 401

        new_access_token = create_access_token(identity=str(current_user))
        app.logger.info("Generated new access token: %s", new_access_token)
        return jsonify({"access_token": new_access_token}), 200
    except Exception as e:
        app.logger.error("Error in refresh endpoint: %s", e)
        return jsonify({"msg": "Token refresh failed"}), 400


# Logout Endpoint
BLACKLIST = set()

@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
    return jwt_payload["jti"] in BLACKLIST

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLACKLIST.add(jti)
    return jsonify({"message": "Logged out"}), 200

if __name__ == '__main__':
    seed_roles_and_admin()
    app.run(debug=True)
