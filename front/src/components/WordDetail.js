import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/WordDetail.css';

function WordDetail() {
  const [favorite, setFavorite] = useState(false);
  const [newSearchTerm, setNewSearchTerm] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const stateData = location.state;
    if (stateData) {
      setData(stateData);
      setNewSearchTerm(stateData.searchTerm || '');
      if (stateData["Example Sentence"]) {
        // Automatically generate image after translation
        axios.post("http://localhost:5000/generate-image", {
          example_sentence: stateData["Example Sentence"],
        })
        .then((imageRes) => {
          stateData.image_url = imageRes.data.image_url;
          setData(stateData);
        })
        .catch((imageError) => {
          console.error("Error generating image:", imageError);
        });
      }
    }
  }, [location.state]);

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const handleNewSearch = async () => {
    try {
      const res = await axios.post("http://localhost:5000/translate", {
        text: newSearchTerm,
      });
      navigate(`/app/word?term=${encodeURIComponent(newSearchTerm)}`, { state: { ...res.data, searchTerm: newSearchTerm } });
    } catch (error) {
      setError('Error searching new term');
    }
  };

  return (
    <div className="word-detail">
      <div className="word-header">
        <input
          type="text"
          className="word-input"
          value={newSearchTerm}
          onChange={(e) => setNewSearchTerm(e.target.value)}
          placeholder="새로운 검색어를 입력하세요"
        />
        <button className="search-button" onClick={handleNewSearch}>
          <span role="img" aria-label="search">🔍</span>
        </button>
        <button
          className="favorite-button"
          onClick={toggleFavorite}
          style={{ color: favorite ? 'yellow' : 'white' }}>
          ★
        </button>
      </div>
      <div className="word-content">
        {error && <p className="error-message">{error}</p>}
        {data && (
          <table className="word-table">
            <tbody>
              <tr>
                <td className="word-image" rowSpan="2">
                  {data.image_url ? (
                    <img src={data.image_url} alt="Generated from example sentence" />
                  ) : (
                    "단어이미지"
                  )}
                </td>
                <td className="word-definition">정의: {data.Translation}</td>
              </tr>
              <tr>
                <td className="word-related">관련단어: {data.Synonyms}</td>
              </tr>
              <tr>
                <td className="word-example" colSpan="2">
                  예문: {data['Example Sentence']}<br />
                  번역: {data['Translation in Korean']}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default WordDetail;
