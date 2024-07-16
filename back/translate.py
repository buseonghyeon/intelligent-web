from flask import request, jsonify
import openai
from Database_Server import app, db, Category
import re
from datetime import datetime
import os
from dotenv import load_dotenv
# .env 파일 로드
load_dotenv()

# OpenAI API Key 설정
openai.api_key = os.getenv('OPENAI_API_KEY')

def is_english(text):
    """입력된 텍스트가 영어인지 확인"""
    return bool(re.match(r'^[a-zA-Z\s]+$', text))

def get_image(example_sentence):
    """이미지 생성 요청을 캐싱하여 요청 빈도를 줄입니다."""
    try:
        # Check if the example sentence already has a cached image
        existing_entry = Category.query.filter_by(example_sentence=example_sentence).first()
        if existing_entry and existing_entry.image:
            return existing_entry.image

        # Generate image if not cached
        image_response = openai.Image.create(
            prompt=example_sentence,
            n=1,
            size="512x512"
        )
        image_url = image_response['data'][0]['url']
        return image_url
    except Exception as e:
        print(f"Error generating image: {e}")
        return None

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    user_id = data.get('userId')
    user_text = data['text']

    # 입력된 단어가 이미 존재하는지 확인
    existing_entry = None
    if is_english(user_text):
        existing_entry = Category.query.filter_by(english=user_text).first()
    else:
        existing_entry = Category.query.filter_by(korean=user_text).first()

    if existing_entry:
        # 기존 데이터 반환
        return jsonify({
            "Translation": existing_entry.english if not is_english(user_text) else existing_entry.korean,
            "Category": existing_entry.category,
            "Synonyms": existing_entry.synonym,
            "Example Sentence": existing_entry.example_sentence,
            "Translation in Korean": existing_entry.translation_in_korean,
            "image_url": existing_entry.image,
            "Definition": existing_entry.definition,
            "Synonym Definition": existing_entry.synonym_definition,
        })

    try:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": """
Role: You are a tutor who helps students study English.

Task 1: Translation

If the word entered by the user is in English, translate it to Korean.
Else if the word entered by the user is in Korean, translate it to English.

Task 2: Classification

Classify the English words (entered by the user or translated) according to their parts of speech.
Further classify them according to the suggested category. Only classify words within the given categories:

Categories:

- Animals
- Food
- Emotions
- People
- Places
- Objects
- Actions
- Clothing
- Transportation
- Time
- Technology
- Health
- Nature
- Art
- Science
- Architecture
- Law
- Politics
- Economy
- Culture

Task 3: Output

Provide only one synonym and only one example sentence (including conversation or song lyrics containing the word).
Translate these into Korean.

Output Format:

Translation: [Translated word in English]
Category: [Category]
Synonyms: [Synonym]
Example Sentence: [Example sentence]
Translation in Korean: [Korean translation of example sentence]
                    """
                },
                {
                    "role": "user",
                    "content": user_text,
                },
            ],
        )

        # Extract the response content
        response_content = completion.choices[0].message['content']
        print(response_content)  # Debugging: Print the response content

        try:
            # Parse the response content safely
            parts = {
                "Translation": None,
                "Category": None,
                "Synonyms": None,
                "Example Sentence": None,
                "Translation in Korean": None,
            }

            for part in parts:
                start = response_content.find(f"{part}:")
                if start != -1:
                    end = response_content.find("\n", start)
                    parts[part] = response_content[start + len(part) + 1:end].strip()

            if None in parts.values():
                raise IndexError("Not all parts were found in the response content.")

            # Fetch definitions for the translation and synonym
            translation_definition = get_definition(parts["Translation"])
            synonym_definition = get_definition(parts["Synonyms"])

            output_json = {
                "Translation": parts["Translation"],
                "Category": parts["Category"],
                "Synonyms": parts["Synonyms"],
                "Example Sentence": parts["Example Sentence"],
                "Translation in Korean": parts["Translation in Korean"],
                "Definition": translation_definition,
                "Synonym Definition": synonym_definition,
            }

            # Generate image based on example sentence
            image_url = get_image(parts["Example Sentence"])
            output_json["image_url"] = image_url

            # Save to database
            new_category = Category(
                user_id=user_id,
                category=parts["Category"],
                korean=user_text if not is_english(user_text) else parts["Translation"],
                english=user_text if is_english(user_text) else parts["Translation"],
                image=image_url,
                synonym=parts["Synonyms"],
                example_sentence=parts["Example Sentence"],
                translation_in_korean=parts["Translation in Korean"],
                definition=translation_definition,
                synonym_definition=synonym_definition,
                date=datetime.now().date()
            )

            db.session.add(new_category)
            db.session.commit()

        except (IndexError, AttributeError) as e:
            print(f"Error parsing response content: {e}")
            return jsonify({"error": "Failed to parse response content"}), 500

        return jsonify(output_json)

    except Exception as e:
        print(f"Error generating response: {e}")
        return jsonify({"error": "Failed to generate response"}), 500

def get_definition(word):
    try:
        definition_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": """
Role: You are a dictionary that provides definitions for words.

Task: Provide a brief definition for the given word only in Korean.

Output Format:
Definition: [Definition of the word]
                        """
                },
                {
                    "role": "user",
                    "content": word,
                },
            ],
        )
        return definition_response.choices[0].message['content'].strip()
    except Exception as e:
        print(f"Error fetching definition: {e}")
        return None
