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
    const [labels, setLabels] = useState(['라벨 1번', '라벨 2번', '라벨 3번', '라벨 4번', '라벨 5번', '라벨 6번']); // 라벨 상태
    const [data, setData] = useState([12, 19, 3, 5, 2, 3]); // 데이터 상태
    const [backgroundColors, setBackgroundColors] = useState([
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
    ]); // 배경색 상태
    const [borderColors, setBorderColors] = useState([
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ]); // 테두리색 상태
    const [borderWidth, setBorderWidth] = useState(1);
    const [savedCode, setSavedCode] = useState(''); // 생성된 HTML 코드
    const [showModal, setShowModal] = useState(false); // 모달 상태
    const [activeTab, setActiveTab] = useState('data'); // 현재 활성화된 탭 상태

    // 차트 데이터 초기화
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: '데이터셋 1번',
                data: data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: borderWidth,
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

    // 라벨 변경 핸들러
    const handleLabelChange = (index, value) => {
        const updatedLabels = [...labels];
        updatedLabels[index] = value;
        setLabels(updatedLabels);
    };

    // 데이터 변경 핸들러
    const handleDataChange = (index, value) => {
        const updatedData = [...data];
        updatedData[index] = value;
        setData(updatedData);
    };

    // 배경색 변경 핸들러
    const handleColorChange = (index, value) => {
        const updatedColors = [...backgroundColors];
        updatedColors[index] = value;
        setBackgroundColors(updatedColors);
    };

    // rgba -> hex 변환
    const rgbaToHex = (rgba) => {
        const parts = rgba.match(/[\d.]+/g);
        const r = parseInt(parts[0]).toString(16).padStart(2, '0');
        const g = parseInt(parts[1]).toString(16).padStart(2, '0');
        const b = parseInt(parts[2]).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
    };

    // hex -> rgba 변환 (투명도 기본값: 1)
    const hexToRgba = (hex, alpha = 1) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
        <div className='main'>
            <div className="top_title_box n2">
                <strong className='title'>직접 입력</strong>
                <button className='custom-btn custom-back' onClick={onBack}>뒤로가기</button>
            </div>
            <div className="chart_wrap">
                <div className="input_wrap">
                    <strong className='title'>차트 설정</strong>
                    <div className="input_box select_type">
                        <div className="label_text">종류</div>
                        <div className='set_box'>
                            <button onClick={() => setActiveChart('Bar')}>Bar Chart</button>
                            <button onClick={() => setActiveChart('Line')}>Line Chart</button>
                            <button onClick={() => setActiveChart('Pie')}>Pie Chart</button>
                        </div>
                    </div>
                    <div className='input_box set_label'>
                        <div className="label_text">라벨</div>
                        <div className="set_box">
                            {activeChart === '' ? (
                                <p>차트 타입을 선택해주세요.</p>
                            ) : (
                                <>
                                    {labels.map((label, index) => (
                                        <div key={index}>
                                            <input
                                                type="text"
                                                value={label}
                                                onChange={(e) => handleDataChange(index, e.target.value)}
                                            />
                                            <button>X</button>
                                        </div>
                                    ))}
                                    <button>라벨 추가</button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='input_box set_dataset'>
                        <div className="label_text">데이터셋</div>
                        <div className="set_box">
                            {activeChart === '' ? (
                                <p>차트 타입을 선택해주세요.</p>
                            ) : (
                                <>
                                    <div>
                                        <ul className="nav nav-tabs" role="tablist">
                                            <li className="nav-item">
                                                <button
                                                    className={`nav-link ${activeTab === 'data' ? 'active' : ''}`}
                                                    onClick={() => setActiveTab('data')}
                                                >
                                                    데이터 설정
                                                </button>
                                            </li>
                                            <li className="nav-item">
                                                <button
                                                    className={`nav-link ${activeTab === 'option' ? 'active' : ''}`}
                                                    onClick={() => setActiveTab('option')}
                                                >
                                                    옵션 설정
                                                </button>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            {activeTab === 'data' && (
                                                <div className="container tab-pane active">
                                                    <>
                                                        {data.map((data, index) => (
                                                            <div key={index}>
                                                                <input
                                                                    type="text"
                                                                    value={data}
                                                                    onChange={(e) => handleLabelChange(index, e.target.value)}
                                                                />
                                                                <button>X</button>
                                                            </div>
                                                        ))}
                                                        <button>라벨 추가</button>
                                                    </>
                                                </div>
                                            )}
                                            {activeTab === 'option' && (
                                                <div className="container tab-pane active">
                                                    <>
                                                        {labels.map((label, index) => (
                                                            <div key={index}>
                                                                {label}:
                                                                <input
                                                                    type="color"
                                                                    value={rgbaToHex(backgroundColors[index])}
                                                                    onChange={(e) => {
                                                                        const updatedColor = hexToRgba(e.target.value);
                                                                        handleColorChange(index, updatedColor);
                                                                    }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </>
                                                </div>
                                            )}
                                        </div>
                                        <button>X</button>
                                    </div>
                                    <button>데이터셋 추가</button>
                                </>
                            )}
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
        </div>
    );
}

export default DirectInput;
