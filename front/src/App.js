import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState(null);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/translate', {
                text: inputText
            });

            setResult(response.data);
        } catch (error) {
            console.error('Error translating text:', error);
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
                    <p><strong>Translation:</strong> {result.Translation}</p>
                    <p><strong>Category:</strong> {result.Category}</p>
                    <p><strong>Synonyms:</strong> {result.Synonyms}</p>
                    <p><strong>Example Sentences:</strong> {result["Example Sentences"]}</p>
                    <p><strong>Translation in Korean:</strong> {result["Translation in Korean"]}</p>
                </div>
            )}
        </div>
    );
}

export default App;
