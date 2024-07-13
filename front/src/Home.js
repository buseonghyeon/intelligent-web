import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Home.css';
import './App.css';
import Navbar from './components/Navbar';
import HomeMain from './components/HomeMain';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId'); // 로컬 스토리지에서 사용자 ID 가져오기

        try {
            const res = await axios.post("http://localhost:5000/translate", {
                userId, // 사용자 ID 포함
                text: searchTerm,
            });

            // Navigate to the WordDetail component with response data
            navigate(`/word?term=${encodeURIComponent(searchTerm)}`, { state: { ...res.data, searchTerm } });
        } catch (error) {
            console.error("Error translating text:", error);
            setError('Error translating text');
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div>
            <Navbar />
            <div className="search-container-home">
                <input
                    type="text"
                    placeholder="단어/문장을 입력하세요..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button-home" onClick={handleSearch}>
                    <span role="img" aria-label="search">🖱️</span>
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <HomeMain />
        </div>
    );
}

export default Home;
