from flask import request, jsonify
import openai
from Database_Server import app, db, Category

# OpenAI API Key 설정
openai.api_key = ""

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    user_id = data.get('userId')
    user_text = data['text']

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

            output_json = {
                "Translation": parts["Translation"],
                "Category": parts["Category"],
                "Synonyms": parts["Synonyms"],
                "Example Sentence": parts["Example Sentence"],
                "Translation in Korean": parts["Translation in Korean"],
            }

            # Generate image based on example sentence
            image_response = openai.Image.create(
                prompt=parts["Example Sentence"],
                n=1,
                size="512x512"
            )
            image_url = image_response['data'][0]['url']

            # Save to database
            new_category = Category(
                user_id=user_id,
                category=parts["Category"],
                korean=user_text,
                english=parts["Translation"],
                image=image_url
            )
            db.session.add(new_category)
            db.session.commit()

            output_json["image_url"] = image_url

        except (IndexError, AttributeError) as e:
            print(f"Error parsing response content: {e}")
            return jsonify({"error": "Failed to parse response content"}), 500

        return jsonify(output_json)

    except Exception as e:
        print(f"Error generating response: {e}")
        return jsonify({"error": "Failed to generate response"}), 500
