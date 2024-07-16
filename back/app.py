from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_migrate import Migrate
from io import BytesIO
import os
from google.cloud import texttospeech
from Database_Server import app, db, User, Category, Favorite


import login
import register
import generate_image
import translate
import search_log
import game
import CreateWordToUSer

from Chat import chat_bp  # Chat 블루프린트 임포트

# CORS 설정
CORS(app, resources={r"/*": {"origins": "*"}})

migrate = Migrate(app, db)

# 블루프린트 등록
app.register_blueprint(chat_bp)

# Google Cloud 인증 파일 경로 설정
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'C:/Users/syung-hyun/intelligent-web/back/service-account.json'

@app.route('/speak', methods=['POST'])
def speak():
    data = request.get_json()
    text = data.get('text', '')

    client = texttospeech.TextToSpeechClient()
    synthesis_input = texttospeech.SynthesisInput(text=text)
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
    )
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    response = client.synthesize_speech(
        input=synthesis_input,
        voice=voice,
        audio_config=audio_config
    )

    audio_content = response.audio_content
    audio_stream = BytesIO(audio_content)

    return send_file(audio_stream, mimetype='audio/mp3', as_attachment=True, download_name='output.mp3')

@app.route('/categories', methods=['GET'])
def get_categories():
    user_id = request.args.get('userId')
    categories = Category.query.filter_by(user_id=user_id).all()
    categories_list = [{"english": c.english, "korean": c.korean, "image": c.image} for c in categories]
    return jsonify(categories_list)

@app.route('/user-info/<user_id>', methods=['GET'])
def get_user_info(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user:
        user_info = {
            'name': user.name,
            'email': user.email
        }
        return jsonify(user_info)
    else:
        return jsonify({'error': 'User not found'}), 404

@app.route('/add-favorite', methods=['POST'])
def add_favorite():
    data = request.get_json()
    user_id = data.get('userId')
    word = data.get('word')

    # Category 테이블에서 영어 또는 한국어가 일치하는 항목을 찾음
    category_entry = Category.query.filter(
        (Category.english == word) | (Category.korean == word),
        Category.user_id == user_id
    ).first()

    if not category_entry:
        return jsonify({"error": "Word not found in category"}), 404

    favorite = Favorite(user_id=user_id, word=category_entry.english, korean=category_entry.korean)
    db.session.add(favorite)
    db.session.commit()

    return jsonify({"message": "Favorite added successfully!"})

@app.route('/quiz-words/<user_id>', methods=['GET'])
def get_quiz_words(user_id):
    quiz_words = Category.query.filter_by(user_id=user_id, source='quiz').all()
    words = [{'english': q.english, 'korean': q.korean} for q in quiz_words]
    return jsonify(words)

@app.route('/wrong-words/<user_id>', methods=['GET'])
def get_wrong_words(user_id):
    wrong_words = Category.query.filter_by(user_id=user_id, source='wrong').all()
    words = [{'english': w.english, 'korean': w.korean} for w in wrong_words]
    return jsonify(words)

@app.route('/favorites/<user_id>', methods=['GET'])
def get_favorites(user_id):
    favorites = Favorite.query.filter_by(user_id=user_id).all()
    favorites_list = [{"id": f.id, "word": f.word, "korean": f.korean} for f in favorites]
    return jsonify(favorites_list)

@app.route('/favorites/<int:favorite_id>', methods=['DELETE'])
def delete_favorite(favorite_id):
    favorite = Favorite.query.get(favorite_id)
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"message": "Favorite deleted successfully!"})
    return jsonify({"error": "Favorite not found"}), 404

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # 데이터베이스 테이블 생성
    app.run(debug=True)
