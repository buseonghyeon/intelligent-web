import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './css/MyPage.css';

const MyPage = () => {
    const [userInfo, setUserInfo] = useState({});
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const itemsPerPage = 5; // 한 페이지에 표시할 즐겨찾기 개수

    useEffect(() => {
        if (!userId) {
            setError('User ID is missing. Please log in.');
            return;
        }

        const fetchUserInfo = async () => {
            try {
                const userInfoResponse = await axios.get(`http://localhost:5000/user-info/${userId}`);
                setUserInfo(userInfoResponse.data);

                const favoritesResponse = await axios.get(`http://localhost:5000/favorites/${userId}`);
                setFavorites(favoritesResponse.data);

                setError(null);
            } catch (err) {
                setError('Error fetching data');
                console.error(err);
            }
        };

        fetchUserInfo();
    }, [userId]);

    const handleRemoveFavorite = async (favoriteId) => {
        try {
            await axios.delete(`http://localhost:5000/favorites/${favoriteId}`);
            setFavorites(favorites.filter(fav => fav.id !== favoriteId));
        } catch (err) {
            setError('Error removing favorite');
            console.error(err);
        }
    };

    const handleNavigateToMyStudy = () => {
        navigate('/MyStudy');
    };

    const totalPages = Math.ceil(favorites.length / itemsPerPage);
    const currentFavorites = favorites.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <Navbar />
            <div className="mypage">
                <h1>My Page</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="section">
                    <div className="user-info">
                        <h2>회원 정보</h2>
                        <p><strong>이름:</strong> {userInfo.name}</p>
                        <p><strong>이메일:</strong> {userInfo.email}</p>
                    </div>
                </div>
                <div className="section">
                    <div className="favorites">
                        <h2>즐겨찾기</h2>
                        <ul>
                            {currentFavorites.map((favorite) => (
                                <li key={favorite.id}>
                                    <strong>{favorite.word}</strong> - {favorite.korean}
                                    <button className="cancel" onClick={() => handleRemoveFavorite(favorite.id)}>★</button>
                                </li>
                            ))}
                        </ul>
                        <div className="pagination_mypage">
                                        {currentPage > 1 && <button className="pm" onClick={() => handlePageChange(currentPage - 1)}>이전</button>}
                                        {currentPage < totalPages && <button className="pm" onClick={() => handlePageChange(currentPage + 1)}>다음</button>}
                        </div>
                    </div>
                </div>
                <div className="section">
                    <button className="study-button" onClick={handleNavigateToMyStudy}>나의 학습현황</button>
                </div>
            </div>
        </>
    );
};

export default MyPage;
