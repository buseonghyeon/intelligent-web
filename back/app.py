from flask import Blueprint, request, jsonify
from flask_cors import CORS
import openai
import os
from google.cloud import speech
import logging

chat_bp = Blueprint('chat_bp', __name__)
CORS(chat_bp, resources={r"/*": {"origins": "*"}})

# Google Cloud Speech-to-Text 및 OpenAI API 키 설정
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\LAPTOP\PycharmProjects\intelligent-web\back\speech-to-text.json"
openai.api_key = "API Key"

# 로깅 설정
logging.basicConfig(level=logging.DEBUG)

@chat_bp.route('/chat', methods=['POST'])
def chat():
    try:
        audio_file = request.files['file']
        audio_content = audio_file.read()

        # Google Speech-to-Text
        client = speech.SpeechClient()
        audio = speech.RecognitionAudio(content=audio_content)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.ENCODING_UNSPECIFIED,  # Auto-detect encoding
            sample_rate_hertz=48000,  # Set sample rate to 48000 Hz
            language_code="en-US",
        )

        response = client.recognize(config=config, audio=audio)

        if not response.results:
            return jsonify({'error': 'No speech recognized'}), 400

        text = response.results[0].alternatives[0].transcript

        # OpenAI GPT-3.5
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": text}
                ],
                max_tokens=150
            )
            answer = response.choices[0].message['content'].strip()
        except Exception as e:
            logging.error(f"OpenAI API error: {str(e)}")
            return jsonify({'error': str(e)}), 500

        return jsonify({'text': text, 'response': answer})

    except Exception as e:
        logging.error(f"Error processing request: {str(e)}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500
