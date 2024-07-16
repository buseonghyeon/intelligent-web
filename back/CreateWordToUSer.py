from flask import Flask, request, jsonify, current_app
import openai
from Database_Server import app, db, UserWords
import logging
import json
from sqlalchemy.exc import SQLAlchemyError

# OpenAI API 키 설정
openai.api_key = ""
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
              f"{{\"word\": \"[English word]\", \"meaning\": \"[Korean meaning]\", \"example\": \"[English example sentence]\", \"example_meaning\": \"[Korean example sentence meaning]\"}}")

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

    try:
        parsed_words = json.loads(word_data.strip())
    except json.JSONDecodeError as e:
        logging.error(f"Failed to parse JSON from OpenAI response: {str(e)}")
        return jsonify({"error": "Failed to parse JSON from OpenAI response", "response_text": word_data}), 500

    with current_app.app_context():
        try:
            for word_data in parsed_words:
                if not all(isinstance(v, str) and v for v in word_data.values()):
                    logging.warning(f"Incomplete or invalid word data: {word_data}")
                    continue

                db_word = UserWords(
                    user_id=user_id,
                    word=word_data['word'],
                    meaning=word_data['meaning'],
                    example=word_data.get('example'),
                    example_meaning=word_data.get('example_meaning')
                )
                db.session.add(db_word)
                logging.debug(f"Added word to session: {word_data['word']}")

            db.session.commit()
            logging.info(f"Successfully committed {len(parsed_words)} words to database")
        except SQLAlchemyError as e:
            db.session.rollback()
            logging.error(f"Database error: {str(e)}")
            return jsonify({"error": "Failed to save words to database", "details": str(e)}), 500
        except Exception as e:
            db.session.rollback()
            logging.error(f"Unexpected error: {str(e)}")
            return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

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

if __name__ == '__main__':
    app.run(debug=True)
