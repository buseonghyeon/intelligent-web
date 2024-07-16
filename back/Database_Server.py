from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # CORS 설정 추가

# MySQL database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1234@localhost/Intelligent-web-db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Define the User model
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.String(255), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)

# Define the Category model
class Category(db.Model):
    __tablename__ = 'Category'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(255), db.ForeignKey('user.id'), nullable=False)
    category = db.Column(db.String(256), nullable=False)
    korean = db.Column(db.String(256), nullable=False)
    english = db.Column(db.String(256), nullable=False)
    image = db.Column(db.String(512), nullable=True)
    synonym = db.Column(db.String(256), nullable=True)
    example_sentence = db.Column(db.String(512), nullable=True)
    translation_in_korean = db.Column(db.String(512), nullable=True)
    definition = db.Column(db.String(1024), nullable=True)
    synonym_definition = db.Column(db.String(1024), nullable=True)
    date = db.Column(db.Date, nullable=False, default=datetime.utcnow)

class Favorite(db.Model):
    __tablename__ = 'favorite'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(255), db.ForeignKey('user.id'), nullable=False)
    word = db.Column(db.String(256), nullable=False)
    korean = db.Column(db.String(256), nullable=False)

class Es(db.Model):
    __tablename__ = 'es'
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(256), nullable=False)
    meaning = db.Column(db.String(256), nullable=False)
    example = db.Column(db.String(256), nullable=True)
    example_meaning = db.Column(db.String(256), nullable=True)

class Ms(db.Model):
    __tablename__ = 'ms'
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(256), nullable=False)
    meaning = db.Column(db.String(256), nullable=False)
    example = db.Column(db.String(256), nullable=True)
    example_meaning = db.Column(db.String(256), nullable=True)

class Hs(db.Model):
    __tablename__ = 'hs'
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(256), nullable=False)
    meaning = db.Column(db.String(256), nullable=False)
    example = db.Column(db.String(256), nullable=True)
    example_meaning = db.Column(db.String(256), nullable=True)


class UserWords(db.Model):
    __tablename__ = 'user_words'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(255), db.ForeignKey('user.id'), nullable=False)
    word = db.Column(db.String(256), nullable=False)
    meaning = db.Column(db.String(256), nullable=False)
    example = db.Column(db.String(512), nullable=True)
    example_meaning = db.Column(db.String(512), nullable=True)