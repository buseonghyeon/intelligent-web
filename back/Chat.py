from flask import Blueprint, request, jsonify
from google.cloud import speech_v1p1beta1 as speech
import openai
import os

# OpenAI API 키 설정
openai.api_key = ''

@app.route('/chat', methods=['POST'])
def chat():
    audio_file = request.files['file']
    audio_content = audio_file.read()

    # Speech-to-Text 클라이언트 생성
    client = speech.SpeechClient.from_service_account_json('C:/Users/LAPTOP/PycharmProjects/intelligent-web/back/speech-to-text.json')

    audio = speech.RecognitionAudio(content=audio_content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="en-US"
    )

    response = client.recognize(config=config, audio=audio)
    text = response.results[0].alternatives[0].transcript

    # OpenAI GPT-3.5 API 호출
    openai_response = openai.Completion.create(
        engine="gpt-3.5-turbo",
        prompt=text,
        max_tokens=150
    )
    reply = openai_response.choices[0].text.strip()

    return jsonify({'text': text, 'response': reply})
