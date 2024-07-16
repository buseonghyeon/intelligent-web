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
    const [dailyStats, setDailyStats] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            setError('User ID is missing. Please log in.');
            return;
        }

        const fetchData = async () => {
            try {
                const searchLogResponse = await axios.get(`http://localhost:5000/search-log/${userId}/${format(date, 'yyyy-MM-dd')}`);
                const uniqueLogs = [...new Map(searchLogResponse.data.map(item => [item.english, item])).values()];
                setSearchLogs(uniqueLogs);

                const categoryStatsResponse = await axios.get(`http://localhost:5000/category-stats/${userId}`);
                setCategoryStats(categoryStatsResponse.data);

                const dailyStatsResponse = await axios.get(`http://localhost:5000/daily-stats/${userId}`);
                setDailyStats(dailyStatsResponse.data);
                console.log('Daily Stats:', dailyStatsResponse.data); // 데이터 확인

                setError(null);
            } catch (err) {
                setError('Error fetching data');
                console.error(err);
            }
        };

        fetchData();
    }, [date, userId]);

    const categoryData = {
        labels: categoryStats.map(stat => stat.category),
        datasets: [
            {
                label: 'Search Count',
                data: categoryStats.map(stat => stat.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E57373', '#BA68C8', '#FFD54F', '#4DD0E1', '#81C784', '#9575CD', '#FF8A65', '#4DB6AC', '#7986CB', '#F06292', '#64B5F6', '#DCE775', '#FFB74D', '#AED581']
            },
        ],
    };

    const dailyData = {
        labels: Array.from({ length: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() }, (_, i) => `${i + 1}`),
        datasets: [
            {
                label: 'Words Learned',
                data: Array.from({ length: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() }, (_, i) => {
                    const day = i + 1;
                    const stat = dailyStats.find(d => {
                        const searchDate = new Date(d.date);
                        return searchDate.getDate() === day && searchDate.getMonth() === date.getMonth() && searchDate.getFullYear() === date.getFullYear();
                    });
                    return stat ? stat.count : 0;
                }),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const dailyOptions = {
        scales: {
            y: {
                beginAtZero: true,
                max: 30, // y축 최대 값 설정
            },
            x: {
                ticks: {
                    autoSkip: false, // x축의 모든 라벨을 표시
                }
            }
        },
        maintainAspectRatio: false,
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const currentItems = searchLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(searchLogs.length / itemsPerPage);

    return (
        <>
            <Navbar />
            <div className="mystudy">
                <h1>My Study</h1>
                <div className="content-container">
                    <div className="calendar-container">
                        <Calendar onChange={setDate} value={date} locale="ko" />
                        <div className="search-log-container">
                            <h2>{format(date, 'yyyy년 MM월 dd일', { locale: ko })}</h2>
                            {error && <p>{error}</p>}
                            {searchLogs.length === 0 ? (
                                <p>해당 날짜에 대한 검색 기록이 없습니다.</p>
                            ) : (
                                <>
                                    <h3>학습한 단어 개수: {searchLogs.length}개</h3>
                                    <ul>
                                        {currentItems.map((log, index) => (
                                            <li key={index}>
                                                <p><strong>한국어:</strong> {log.korean}</p>
                                                <p><strong>영어:</strong> {log.english}</p>
                                                <p><strong>카테고리:</strong> {log.category}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pagination">
                                        {currentPage > 1 && <button onClick={() => handlePageChange(currentPage - 1)}>이전</button>}
                                        {currentPage < totalPages && <button onClick={() => handlePageChange(currentPage + 1)}>다음</button>}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="charts-container">
                        <div className="chart chart_top">
                            <h2>Words Learned by Day</h2>
                            <Bar data={dailyData} options={dailyOptions} />
                        </div>
                        <div className="chart chart_bottom">
                            <h2>Words by Category</h2>
                            <Pie data={categoryData} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyStudy;
