from flask import request, jsonify
from Database_Server import app, db, bcrypt, User

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    id = data['id']
    name = data['name']
    email = data['email']
    password = data['password']

    # 비밀번호 해싱
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # 새 사용자 생성
    new_user = User(id=id, name=name, email=email, password=hashed_password)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"})
    except Exception as e:
        print(f"Error registering user: {e}")
        return jsonify({"error": "Failed to register user"}), 500
