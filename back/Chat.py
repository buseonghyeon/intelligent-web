from flask import Blueprint, request, jsonify
from google.cloud import speech_v1p1beta1 as speech
import openai
import os
import logging

# 로깅 설정
logging.basicConfig(level=logging.INFO)

chat_bp = Blueprint('chat', __name__)

# OpenAI API 키 설정
openai.api_key = ''

# Google Cloud 인증 파일 경로 설정
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'C:/Users/82103/PycharmProjects/intelligent_web/back/speech-to-text.json'

@chat_bp.route('/chat', methods=['POST'])
def chat():
    try:
        audio_file = request.files['file']
        audio_content = audio_file.read()

        # Speech-to-Text 클라이언트 생성
        client = speech.SpeechClient()

        audio = speech.RecognitionAudio(content=audio_content)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.ENCODING_UNSPECIFIED,
            language_code="ko-KR"
        )

        response = client.recognize(config=config, audio=audio)
        if not response.results:
            logging.error("Speech not recognized")
            return jsonify({'error': 'Speech not recognized'}), 400

        text = response.results[0].alternatives[0].transcript
        logging.info(f"Recognized text: {text}")

        # OpenAI GPT-3.5 API 호출 (Chat Completion 엔드포인트 사용)
        openai_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": text}
            ]
        )
        reply = openai_response['choices'][0]['message']['content'].strip()
        logging.info(f"OpenAI response: {reply}")

        return jsonify({'text': text, 'response': reply})

    except Exception as e:
        logging.error(f"Error: {e}")
        return jsonify({'error': str(e)}), 500


