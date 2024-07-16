from flask import Flask, request, jsonify
import openai
from Database_Server import app, db, UserWords
import logging
import json
import os
from dotenv import load_dotenv
# .env 파일 로드
load_dotenv()

# OpenAI API Key 설정
openai.api_key = os.getenv('OPENAI_API_KEY')
# 로깅 설정
logging.basicConfig(level=logging.DEBUG)

@app.route('/create-word', methods=['POST'])
def create_word():
    data = request.json
    user_id = data['userId']
    answers = data['answers']

    age = answers['age']
    score = sum(1 for key, value in answers.items() if value in ('a', 'b', 'c', 'd'))

    prompt = (f"Create 30 English words for a user who is {age} years old and scored {score} out of 10 in a basic English test. "
              f"Provide each word with its meaning in Korean, an example sentence, and the meaning of the example sentence in Korean "
              f"in the following format:\n"
              f"1. Word: [English word]\n"
              f"   Meaning: [Korean meaning]\n"
              f"   Example sentence: [English example sentence]\n"
              f"   Example sentence meaning: [Korean example sentence meaning]")

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    word_data = response.choices[0].message['content']

    # 원본 응답 데이터 로그 출력
    logging.debug("OpenAI raw response: %s", word_data)

    parsed_words = []

    # 응답 데이터 파싱
    lines = word_data.split('\n')
    current_word = None
    current_meaning = None
    current_example = None
    current_example_meaning = None

    for line in lines:
        line = line.strip()
        if not line:
            continue
        if line.startswith('Word: '):
            current_word = line.replace('Word: ', '').strip()
        elif line.startswith('Meaning: '):
            current_meaning = line.replace('Meaning: ', '').strip()
        elif line.startswith('Example sentence: '):
            current_example = line.replace('Example sentence: ', '').strip()
        elif line.startswith('Example sentence meaning: '):
            current_example_meaning = line.replace('Example sentence meaning: ', '').strip()

            if current_word and current_meaning and current_example and current_example_meaning:
                new_word = {
                    "word": current_word,
                    "meaning": current_meaning,
                    "example": current_example,
                    "example_meaning": current_example_meaning
                }
                parsed_words.append(new_word)

                db_word = UserWords(
                    user_id=user_id,
                    word=current_word,
                    meaning=current_meaning,
                    example=current_example,
                    example_meaning=current_example_meaning
                )
                logging.debug("Adding word to database: %s", new_word)
                db.session.add(db_word)

                current_word = None
                current_meaning = None
                current_example = None
                current_example_meaning = None

    try:
        db.session.commit()
        logging.debug("Database commit successful")
    except Exception as e:
        logging.error("Database commit failed: %s", str(e))
        db.session.rollback()

    # 응답 데이터를 JSON 형식으로 콘솔에 출력
    logging.debug("OpenAI response JSON: %s", json.dumps(parsed_words, ensure_ascii=False, indent=4))

    return jsonify({"message": "Words created successfully!", "words": parsed_words})

@app.route('/custom', methods=['GET'])
def get_custom_words():
    user_id = request.args.get('userId')
    custom_words = UserWords.query.filter_by(user_id=user_id).all()
    if not custom_words:
        return jsonify({"message": "No words found"}), 404

    words_data = [{"word": word.word, "meaning": word.meaning, "example": word.example, "example_meaning": word.example_meaning} for word in custom_words]
    return jsonify(words_data)
