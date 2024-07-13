import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/WordDetail.css';
import Navbar from './components/Navbar';

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
            navigate(`/word?term=${encodeURIComponent(newSearchTerm)}`, { state: { ...res.data, searchTerm: newSearchTerm } });
        } catch (error) {
            setError('Error searching new term');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="word-detail">
                <div className="word-header">
                    <button
                        className="favorite-button"
                        onClick={toggleFavorite}
                        style={{ color: favorite ? 'yellow' : 'white' }}>
                        ★
                    </button> &nbsp;&nbsp;
                    <input
                        type="text"
                        className="word-input"
                        value={newSearchTerm}
                        onChange={(e) => setNewSearchTerm(e.target.value)}
                        placeholder="새로운 검색어를 입력하세요"
                    />
                    <button className="search-button" onClick={handleNewSearch}>
                        <span role="img" aria-label="search">🖱️</span>
                    </button>
                </div>
                <div className="word-content">
                    {error && <p className="error-message">{error}</p>}
                    {data ? (
                        <div className="book-container">
                            <div className="book-page left-page">
                                <div className="word-image">
                                    <img src={data.image_url} alt="Word" />
                                    <h1>{data.Translation}</h1>
                                </div>
                            </div>
                            <div className="book-page right-page">
                                <div className="word-content">
                                    <h2>[정의]</h2>
                                    <p>{data.Translation}</p>
                                    <h2>[관련단어]</h2>
                                    <p>{data.Synonyms}</p>
                                    <h2>[예문]</h2>
                                    <p>{data['Example Sentence']}</p>
                                    <h2>[번역]</h2>
                                    <p>{data['Translation in Korean']}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WordDetail;
