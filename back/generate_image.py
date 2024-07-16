from flask import request, jsonify
import openai
from Database_Server import app
import os
from dotenv import load_dotenv
# .env 파일 로드
load_dotenv()

# OpenAI API Key 설정
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/generate-image', methods=['POST'])
def Generate_image():
    data = request.get_json()
    example_sentence = data['example_sentence']

    try:
        response = openai.Image.create(
            prompt=example_sentence,
            n=1,
            size="512x512"
        )

        image_url = response['data'][0]['url']
        return jsonify({"image_url": image_url})

    except Exception as e:
        print(f"Error generating image: {e}")
        return jsonify({"error": "Failed to generate image"}), 500
