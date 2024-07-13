from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1234@localhost/Intelligent-web-db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)


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

@app.route('/categories', methods=['GET'])
def get_categories():
    user_id = request.args.get('userId')
    categories = Category.query.filter_by(user_id=user_id).all()
    categories_list = [{"english": c.english, "korean": c.korean, "image": c.image} for c in categories]
    return jsonify(categories_list)

if __name__ == '__main__':
    app.run(debug=True)
