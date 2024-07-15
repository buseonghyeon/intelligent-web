from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from google.cloud import texttospeech
import os

app = Flask(__name__)

# CORS 설정
CORS(app, resources={r"/*": {"origins": "*"}})

# 데이터베이스 설정
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///intelligent-web-db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# 엔드포인트 파일 임포트
import login
import register
import generate_image
import translate
import search_log
import Chat  # Chat 모듈을 임포트

# Chat 모듈의 엔드포인트 추가
app.register_blueprint(Chat.chat_bp)

@app.route('/categories', methods=['GET'])
def get_categories():
    user_id = request.args.get('userId')
    categories = Category.query.filter_by(user_id=user_id).all()
    categories_list = [{"english": c.english, "korean": c.korean, "image": c.image} for c in categories]
    return jsonify(categories_list)

@app.route('/speak', methods=['POST'])
def speak():
    data = request.get_json()
    text = data.get('text', '')

    if not text:
        return jsonify({'error': 'Text is required'}), 400

    # JSON 키 파일의 절대 경로를 가져옴
    key_path = os.path.join(os.path.dirname(__file__), 'service-account.json')
    client = texttospeech.TextToSpeechClient.from_service_account_json(key_path)

    synthesis_input = texttospeech.SynthesisInput(text=text)
    voice = texttospeech.VoiceSelectionParams(language_code='en-US', ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL)
    audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)

    response = client.synthesize_speech(input=synthesis_input, voice=voice, audio_config=audio_config)

    audio_content = response.audio_content
    # MP3 파일을 저장할 경로 설정
    mp3_dir = os.path.join(os.path.dirname(__file__), 'mp3')
    if not os.path.exists(mp3_dir):
        os.makedirs(mp3_dir)

    file_name = os.path.join(mp3_dir, f"output-{text[:10]}.mp3")

    with open(file_name, 'wb') as out:
        out.write(audio_content)

    return send_file(file_name, as_attachment=True, mimetype='audio/mp3', download_name='output.mp3')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # 데이터베이스 테이블 생성
    app.run(debug=True, port=5000)
