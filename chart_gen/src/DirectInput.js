import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

// Chart.js 구성 요소 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

function DirectInput({ onBack }) {
    const [activeChart, setActiveChart] = useState(''); // 선택된 차트 타입
    const [savedCode, setSavedCode] = useState(''); // 생성된 HTML 코드

    // 차트 데이터
    const chartData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // 차트 타입별 렌더링 함수
    const renderChart = () => {
        switch (activeChart) {
            case 'Bar':
                return <Bar data={chartData} options={{ responsive: true }} />;
            case 'Line':
                return <Line data={chartData} options={{ responsive: true }} />;
            case 'Pie':
                return <Pie data={chartData} options={{ responsive: true }} />;
            default:
                return <p>차트 옵션을 설정 후 저장을 클릭하세요</p>;
        }
    };

    // HTML 코드 생성 및 저장
    const handleSaveChartCode = () => {
        if (!activeChart) {
            alert('차트 타입을 선택해주세요.');
            return;
        }

        const chartCode = `
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <canvas id="myChart" width="400" height="400"></canvas>
            <script>
            const ctx = document.getElementById('myChart').getContext('2d');
            new Chart(ctx, {
                type: '${activeChart.toLowerCase()}',
                data: ${JSON.stringify(chartData)},
                options: {
                responsive: true,
                },
            });
            </script>
        `.trim();

        setSavedCode(chartCode);
        alert('HTML 코드가 생성되었습니다.');
    };

    return (
        <div>
            <h2>직접 입력 화면</h2>
            <div className="chart_wrap">
                <div className="input_wrap">
                    <h3>차트 옵션</h3>
                    <div className="select_type">
                        <p>차트 타입을 선택해주세요.</p>
                
                        {/* 차트 타입 버튼 */}
                        <div style={{ marginBottom: '20px' }}>
                            <button
                                style={{
                                    marginRight: '10px',
                                    padding: '10px',
                                    backgroundColor: activeChart === 'Bar' ? 'lightblue' : 'white',
                                }}
                                onClick={() => setActiveChart('Bar')}
                            >
                                Bar Chart
                            </button>
                            <button
                                style={{
                                    marginRight: '10px',
                                    padding: '10px',
                                    backgroundColor: activeChart === 'Line' ? 'lightblue' : 'white',
                                }}
                                onClick={() => setActiveChart('Line')}
                            >
                                Line Chart
                            </button>
                            <button
                                style={{
                                    padding: '10px',
                                    backgroundColor: activeChart === 'Pie' ? 'lightblue' : 'white',
                                }}
                                onClick={() => setActiveChart('Pie')}
                            >
                                Pie Chart
                            </button>
                        </div>
                        <button
                            onClick={handleSaveChartCode}
                            style={{ padding: '10px', backgroundColor: 'lightgreen' }}
                        >
                            HTML 코드 생성
                        </button>
                    </div>
                </div>
                <div className="result_wrap">
                    <h3>현재 차트</h3>
                    {/* 차트 렌더링 */}
                    <div style={{ marginTop: '20px' }}>{renderChart()}</div>

                    <h3>생성된 HTML 코드</h3>
                    {savedCode && (
                        <pre
                            style={{
                                backgroundColor: '#f4f4f4',
                                padding: '10px',
                                borderRadius: '5px',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {savedCode}
                        </pre>
                    )}
                </div>
            </div>

            {/* 뒤로가기 버튼 */}
            <button onClick={onBack} style={{ marginTop: '20px' }}>
                뒤로가기
            </button>
        </div>
    );
}

export default DirectInput;
