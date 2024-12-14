
from flask_sqlalchemy import SQLAlchemy
from extensions import db
from datetime import datetime
from sqlalchemy.ext.hybrid import hybrid_property
from flask_bcrypt import generate_password_hash, check_password_hash

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128),nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
    role = db.relationship('Role',backref=db.backref('users',lazy=True))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)

class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    position = db.Column(db.String(50), nullable=False)
    height = db.Column(db.Float, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=True)
    team = db.relationship('Team', backref=db.backref('players', lazy=True))

class Venue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)


class Match(db.Model):
    __tablename__ = "match"

    id = db.Column(db.Integer, primary_key=True)
    _date = db.Column("date", db.Date, nullable=False)
    home_team_id = db.Column(db.Integer, nullable=False)
    away_team_id = db.Column(db.Integer, nullable=False)
    venue_id = db.Column(db.Integer, nullable=False)
    home_team_score = db.Column(db.Integer, nullable=False)
    away_team_score = db.Column(db.Integer, nullable=False)

    @hybrid_property
    def date(self):
        return self._date

    @date.setter
    def date(self, value):
        # If value is a string, parse it to a date object
        if isinstance(value, str):
            value = datetime.strptime(value, '%Y-%m-%d').date()
        self._date = value