import React, { useState } from "react";
import axios from "axios";

function App() {
    const [inputText, setInputText] = useState("");
    const [result, setResult] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setImageUrl(null);  // Reset image URL when a new request is made

        const userId = localStorage.getItem('userId'); // 로컬 스토리지에서 사용자 ID 가져오기

        try {
            const response = await axios.post("http://localhost:5000/translate", {
                userId, // 사용자 ID 포함
                text: inputText,
            });

            setResult(response.data);

            // Automatically generate image after translation
            if (response.data && response.data["Example Sentence"]) {
                try {
                    const imageResponse = await axios.post(
                        "http://localhost:5000/generate-image",
                        {
                            example_sentence: response.data["Example Sentence"],
                        }
                    );

                    setImageUrl(imageResponse.data.image_url);
                } catch (error) {
                    console.error("Error generating image:", error);
                }
            }
        } catch (error) {
            console.error("Error translating text:", error);
        }
    };

    return (
        <div className="App">
            <h1>Translation and Classification</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="Enter a word"
                />
                <button type="submit">Translate</button>
            </form>
            {result && (
                <div>
                    <h2>Result</h2>
                    <p>
                        <strong>Translation:</strong> {result.Translation}
                    </p>
                    <p>
                        <strong>Category:</strong> {result.Category}
                    </p>
                    <p>
                        <strong>Synonyms:</strong> {result.Synonyms}
                    </p>
                    <p>
                        <strong>Example Sentence:</strong> {result["Example Sentence"]}
                    </p>
                    <p>
                        <strong>Translation in Korean:</strong>{" "}
                        {result["Translation in Korean"]}
                    </p>
                </div>
            )}
            {imageUrl && (
                <div>
                    <h2>Generated Image</h2>
                    <img src={imageUrl} alt="Generated from example sentence" />
                </div>
            )}
        </div>
    );
}

export default App;
