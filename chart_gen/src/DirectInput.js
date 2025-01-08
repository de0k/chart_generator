import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChartRenderer from './ChartRenderer';
import CodeModal from './CodeModal';
import ChartSettings from './ChartSettings';
import AdditionalSettings from './AdditionalSettings';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
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

    // 현재 열린 섹션 상태(Collapse)
    const [activeSection, setActiveSection] = useState('chart'); 

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

    // 섹션을 변경하는 함수
    const toggleSection = (section) => {
        setActiveSection((prev) => (prev === section ? '' : section));
    };

    return (
        <div className='main'>
            <div className="top_title_box n2">
                <button className='custom-btn custom-back btn btn-secondary' onClick={onBack}>뒤로가기</button>
                <strong className='title'>직접 입력</strong>
                <button className='btn btn-success' onClick={handleSaveChartCode}>코드 확인</button>
            </div>
            <div className="chart_wrap">
                <div className="input_wrap" id="chart_setting">
                    <ChartSettings
                        activeChart={activeChart}
                        setActiveChart={setActiveChart}
                        labels={labels}
                        setLabels={setLabels}
                        innerdata={innerdata}
                        setInnerdata={setInnerdata}
                        backgroundColors={backgroundColors}
                        setBackgroundColors={setBackgroundColors}
                        borderColors={borderColors}
                        setBorderColors={setBorderColors}
                        borderWidth={borderWidth}
                        setBorderWidth={setBorderWidth}
                        datasetLabels={datasetLabels}
                        setDatasetLabels={setDatasetLabels}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        activeSection={activeSection}
                        toggleSection={toggleSection}
                    />
                    <AdditionalSettings
                        activeSection={activeSection}
                        toggleSection={toggleSection}
                    />
                </div>
                <div className="result_wrap">
                    <ChartRenderer activeChart={activeChart} chartData={chartData} />
                    {showModal && (
                        <CodeModal
                            savedCode={savedCode}
                            closeModal={() => setShowModal(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default DirectInput;
