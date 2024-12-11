import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    const [showModal, setShowModal] = useState(false); // 모달 상태

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
        setShowModal(true); // 모달 열기
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
                        <div>
                            <button onClick={() => setActiveChart('Bar')}>Bar Chart</button>
                            <button onClick={() => setActiveChart('Line')}>Line Chart</button>
                            <button onClick={() => setActiveChart('Pie')}>Pie Chart</button>
                        </div>
                    </div>
                    <div className='set_chartData'>
                        <p>차트 라벨, 데이터셋, 데이터를 설정해주세요</p>
                        <div className="inner_box">
                            <div className="label_box">
                                
                            </div>
                            <div className="dataset_wrap">

                            </div>
                        </div>
                    </div>
                    <button onClick={handleSaveChartCode}>코드 확인</button>
                </div>
                <div className="result_wrap">
                    {/* 차트 렌더링 */}
                    <div>{renderChart()}</div>

                    {/* 모달 */}
                    {showModal && (
                        <div
                            className="modal show"
                            style={{ display: 'block' }}
                            tabIndex="-1"
                            role="dialog"
                        >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">생성된 코드</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setShowModal(false)}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
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
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setShowModal(false)}
                                        >
                                            닫기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
