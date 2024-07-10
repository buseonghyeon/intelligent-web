from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

# Initialize the OpenAI client
client = OpenAI(api_key="Your-APi_KEY")

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    user_text = data['text']

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": """
Role: You are a tutor who helps students study English.

Task 1: Translation

If the word entered by the user is not in English, translate it to English.
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

    # Convert the response to a dictionary
    completion_dict = completion.to_dict()

    # Extract the response content
    response_content = completion_dict['choices'][0]['message']['content']

    # Debugging: Print the response content to see its structure
    print(response_content)

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

if __name__ == '__main__':
    app.run(debug=True)
