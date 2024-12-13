import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

// Chart.js 구성 요소 등록
ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,ArcElement,PointElement,LineElement);

function DirectInput({ onBack }) {
    // 차트 설정 상태 관리
    const [activeChart, setActiveChart] = useState('');
    const [labels, setLabels] = useState(['라벨 1번', '라벨 2번', '라벨 3번', '라벨 4번']);
    const [innerdata, setInnerdata] = useState([12, 19, 3, 5]);
    const [backgroundColors, setBackgroundColors] = useState(['rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)']);
    const [borderColors, setBorderColors] = useState(['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)']);
    const [borderWidth, setBorderWidth] = useState(1);
    const [datasetLabels, setDatasetLabels] = useState(['데이터셋 1번']); 

    // 생성된 HTML 코드
    const [savedCode, setSavedCode] = useState(''); 
    // 모달 상태
    const [showModal, setShowModal] = useState(false); 
    // 현재 활성화된 탭 상태
    const [activeTab, setActiveTab] = useState('data'); 

    // 차트 데이터 초기화
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: datasetLabels,
                data: innerdata,
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
                return <div className='chart_option_none'><p>차트 옵션을 설정 후 저장을 클릭하세요</p></div>;
        }
    };

    // 차트 설정 변경 핸들러
    const handleChartDataChange = (chartData,setChartData,index,value) => {
        const updatedChartData = [...chartData];
        updatedChartData[index] = value;
        setChartData(updatedChartData);
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
                <button className='custom-btn custom-back btn btn-secondary' onClick={onBack}>뒤로가기</button>
                <strong className='title'>직접 입력</strong>
                <div></div>
            </div>
            <div className="chart_wrap">
                <div className="input_wrap">
                    <strong className='title'>차트 설정</strong>
                    <div className='input_box'>
                        <div className="input_item select_type">
                            <div className="label_text">종류</div>
                            <div className='set_box'>
                                <button onClick={() => setActiveChart('Bar')}>Bar Chart</button>
                                <button onClick={() => setActiveChart('Line')}>Line Chart</button>
                                <button onClick={() => setActiveChart('Pie')}>Pie Chart</button>
                            </div>
                        </div>
                        <div className='input_item set_label'>
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
                                                    onChange={(e) => handleChartDataChange(labels, setLabels, index, e.target.value)}
                                                />
                                                <button>X</button>
                                            </div>
                                        ))}
                                        <button>라벨 추가</button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className='input_item set_dataset'>
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
                                                            {innerdata.map((data, index) => (
                                                                <div key={index}>
                                                                    <input
                                                                        type="text"
                                                                        value={data}
                                                                        onChange={(e) => handleChartDataChange(innerdata, setInnerdata, index, e.target.value)}
                                                                    />
                                                                    <button>X</button>
                                                                </div>
                                                            ))}
                                                            <button>데이터 추가</button>
                                                        </>
                                                    </div>
                                                )}
                                                {activeTab === 'option' && (
                                                    <div className="container tab-pane active">
                                                        <div>
                                                            <div className="label_text">데이터셋명</div>
                                                            <input
                                                                type="text"
                                                                value={datasetLabels}
                                                                onChange={(e) => handleChartDataChange(datasetLabels, setDatasetLabels, 0, e.target.value)}
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="label_text">backgroundColors</div>
                                                            {labels.map((label, index) => (
                                                                <div key={index}>
                                                                    {label}:
                                                                    <input
                                                                        type="color"
                                                                        value={rgbaToHex(backgroundColors[index])}
                                                                        onChange={(e) => {
                                                                            const updatedColor = hexToRgba(e.target.value);
                                                                            handleChartDataChange(backgroundColors, setBackgroundColors, index, updatedColor);
                                                                        }}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div>
                                                            <div className="label_text">borderColors</div>
                                                            {labels.map((label, index) => (
                                                                <div key={index}>
                                                                    {label}:
                                                                    <input
                                                                        type="color"
                                                                        value={rgbaToHex(borderColors[index])}
                                                                        onChange={(e) => {
                                                                            const updatedColor = hexToRgba(e.target.value);
                                                                            handleChartDataChange(borderColors, setBorderColors, index, updatedColor);
                                                                        }}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div>
                                                            <div className="label_text">borderWidth</div>
                                                            <select
                                                                value={borderWidth}
                                                                onChange={(e) => setBorderWidth(Number(e.target.value))} // 상태 업데이트
                                                            >
                                                                {[1, 2, 3, 4, 5].map((value) => (
                                                                    <option key={value} value={value}>
                                                                        {value}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
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
                    </div>
                    <button onClick={handleSaveChartCode}>코드 확인</button>
                </div>
                <div className="result_wrap">
                    <div className='chart_rendering'>{renderChart()}</div>

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
