import openai
import json
from flask import Flask, request, jsonify
from Database_Server import app, db, CustomWord

# Chat-GPT API 설정
openai.api_key = ''

def generate_custom_words(user_response):
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": f"""
The user provided the following answers:
Age: {user_response.get('age')}
Q2: {user_response.get('q2')}
Q3: {user_response.get('q3')}
Q4: {user_response.get('q4')}
Q5: {user_response.get('q5')}
Q6: {user_response.get('q6')}
Q7: {user_response.get('q7')}
Q8: {user_response.get('q8')}
Q9: {user_response.get('q9')}
Q10: {user_response.get('q10')}
Q11: {user_response.get('q11')}

Based on these answers, generate a list of 20 personalized words for the user along with their Korean meanings and example sentences.
Provide the following format:
- English Word
- Korean Meaning
- Example Sentence in English
- Korean Translation of the Example Sentence
"""}
    ]

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=2000,
        n=1,
        stop=None,
        temperature=0.7,
    )

    response_text = response.choices[0].message['content'].strip()
    # 응답 텍스트를 새로운 단어 단위로 나누기
    words_sections = response_text.split('\n\n')
    custom_words = []

    for section in words_sections:
        parts = section.split('\n')
        if len(parts) >= 4:
            custom_words.append({
                'english_word': parts[0].strip('- '),
                'korean_meaning': parts[1].strip(),
                'english_sentence': parts[2].strip(),
                'korean_sentence_meaning': parts[3].strip()
            })
    return custom_words[:20]

@app.route('/generate_words', methods=['POST'])
def generate_words():
    data = request.get_json()
    user_id = data.get('user_id')  # 사용자의 ID를 데이터에서 가져옴
    user_response = data.get('answers')

    if not user_id or not user_response:
        return jsonify({'error': 'Missing user_id or answers'}), 400

    custom_words = generate_custom_words(user_response)

    for word in custom_words:
        new_word = CustomWord(
            user_id=user_id,
            english_word=word['english_word'],
            korean_meaning=word['korean_meaning'],
            english_sentence=word['english_sentence'],
            korean_sentence_meaning=word['korean_sentence_meaning']
        )
        db.session.add(new_word)
    db.session.commit()

    return jsonify({'message': 'Words generated and saved successfully!'})

@app.route('/custom', methods=['GET'])
def get_custom_words():
    user_id = request.args.get('userId')
    custom_words = CustomWord.query.filter_by(user_id=user_id).all()
    if not custom_words:
        return jsonify({"message": "No words found"}), 404

    words_data = [{"word": word.english_word, "meaning": word.korean_meaning, "example": word.english_sentence, "example_meaning": word.korean_sentence_meaning} for word in custom_words]
    return jsonify(words_data)

if __name__ == '__main__':
    app.run(debug=True)
