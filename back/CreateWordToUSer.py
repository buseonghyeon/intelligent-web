from flask import Flask, request, jsonify
import openai
from Database_Server import app, db, UserWords
import logging

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

    prompt = f"Create 10 English words per day for 10 days for a user who is {age} years old and scored {score} out of 10 in a basic English test. Provide the word, its meaning in Korean, an example sentence, and its meaning in Korean."

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    word_data = response.choices[0].message['content']
    logging.debug("OpenAI response: %s", word_data)

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
        if line[0].isdigit() and '. ' in line:
            if current_word:
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
                db.session.add(db_word)

            parts = line.split('. ', 1)
            word_and_meaning = parts[1].split(' (', 1)
            current_word = word_and_meaning[0].strip()
            current_meaning = word_and_meaning[1].rstrip(')').strip()
            current_example = None
            current_example_meaning = None
        elif line.startswith('Example sentence: '):
            current_example = line.replace('Example sentence: ', '').strip()
        elif line.startswith('Meaning in Korean: '):
            current_example_meaning = line.replace('Meaning in Korean: ', '').strip()

    if current_word:
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
        db.session.add(db_word)

    db.session.commit()

    return jsonify({"message": "Words created successfully!", "words": parsed_words})

@app.route('/custom', methods=['GET'])
def get_custom_words():
    user_id = request.args.get('userId')
    custom_words = UserWords.query.filter_by(user_id=user_id).all()
    if not custom_words:
        return jsonify({"message": "No words found"}), 404

    words_data = [{"word": word.word, "meaning": word.meaning, "example": word.example, "example_meaning": word.example_meaning} for word in custom_words]
    return jsonify(words_data)
