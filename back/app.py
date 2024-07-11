from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

# Initialize the OpenAI client
openai.api_key = ""

@app.route('/generate-image', methods=['POST'])
def generate_image():
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

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
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
Example Sentences: [Example sentence]
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
            translation = response_content.split("Translation:")[1].split("Category:")[0].strip()
            category = response_content.split("Category:")[1].split("Synonyms:")[0].strip()
            synonyms = response_content.split("Synonyms:")[1].split("Example Sentences:")[0].strip()
            example_sentences = response_content.split("Example Sentences:")[1].split("Translation in Korean:")[0].strip()
            translation_in_korean = response_content.split("Translation in Korean:")[1].strip()

            output_json = {
                "Translation": translation,
                "Category": category,
                "Synonyms": synonyms,
                "Example Sentences": example_sentences,
                "Translation in Korean": translation_in_korean
            }

        except IndexError as e:
            print(f"Error parsing response content: {e}")
            return jsonify({"error": "Failed to parse response content"}), 500

        return jsonify(output_json)

    except Exception as e:
        print(f"Error generating response: {e}")
        return jsonify({"error": "Failed to generate response"}), 500

if __name__ == '__main__':
    app.run(debug=True)
