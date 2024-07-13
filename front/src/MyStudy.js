import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import 'react-calendar/dist/Calendar.css';
import './css/MyStudy.css';
import axios from 'axios';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import Navbar from './components/Navbar';

// Chart.js 컴포넌트 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, ArcElement, Title, Tooltip, Legend);

const MyStudy = () => {
    const [date, setDate] = useState(new Date());
    const [searchLogs, setSearchLogs] = useState([]);
    const [categoryStats, setCategoryStats] = useState([]);
    const [monthlyStats, setMonthlyStats] = useState([]);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            setError('User ID is missing. Please log in.');
            return;
        }

        const fetchSearchLogs = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/search-log/${userId}/${format(date, 'yyyy-MM-dd')}`);
                setSearchLogs(response.data);
                setError(null);
            } catch (err) {
                setError('Error fetching search logs');
                console.error(err);
            }
        };

        const fetchCategoryStats = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/category-stats/${userId}`);
                setCategoryStats(response.data);
                setError(null);
            } catch (err) {
                setError('Error fetching category stats');
                console.error(err);
            }
        };

        const fetchMonthlyStats = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/monthly-stats/${userId}`);
                setMonthlyStats(response.data);
                setError(null);
            } catch (err) {
                setError('Error fetching monthly stats');
                console.error(err);
            }
        };

        fetchSearchLogs();
        fetchCategoryStats();
        fetchMonthlyStats();
    }, [date, userId]);

    const categoryData = {
        labels: categoryStats.map(stat => stat.category),
        datasets: [
            {
                label: 'Search Count',
                data: categoryStats.map(stat => stat.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            },
        ],
    };

    const monthlyData = {
        labels: monthlyStats.map(stat => format(new Date(stat.month), 'MMMM', { locale: ko })),
        datasets: [
            {
                label: 'Words Learned',
                data: monthlyStats.map(stat => stat.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <>
            <Navbar />
            <div className="mystudy">
                <h1>My Study</h1>
                <div className="content-container">
                    <div className="calendar-container">
                        <Calendar onChange={setDate} value={date} locale="ko" />
                    </div>
                    <div className="charts-container">
                        <div className="chart">
                            <h2>Words Learned by Month</h2>
                            <Bar data={monthlyData} />
                        </div>
                        <div className="chart">
                            <h2>Words by Category</h2>
                            <Pie data={categoryData} />
                        </div>
                    </div>
                    <div className="search-log-container">
                        <h2>{format(date, 'yyyy년 MM월 dd일', { locale: ko })}</h2>
                        {error && <p>{error}</p>}
                        {searchLogs.length === 0 ? (
                            <p>해당 날짜에 대한 검색 기록이 없습니다.</p>
                        ) : (
                            <>
                                <h3>학습한 단어 개수: {searchLogs.length}개</h3>
                                <ul>
                                    {searchLogs.map((log, index) => (
                                        <li key={index}>
                                            <p><strong>한국어:</strong> {log.korean}</p>
                                            <p><strong>영어:</strong> {log.english}</p>
                                            <p><strong>카테고리:</strong> {log.category}</p>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyStudy;
