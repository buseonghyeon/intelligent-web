from flask import request, jsonify
from Database_Server import app, db, bcrypt, User

@app.route('/login', methods=['POST'])
def Login():
    data = request.get_json()
    id = data['id']
    password = data['password']

    user = User.query.filter_by(id=id).first()

    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"error": "Invalid credentials"}), 401
