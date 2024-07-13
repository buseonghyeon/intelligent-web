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
    date = db.Column(db.Date, nullable=False, default=datetime.utcnow)  # Add the date column

if __name__ == '__main__':
    app.run(debug=True)
