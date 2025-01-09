import React, { useState, useEffect } from 'react';
import ChartRenderer from './ChartRenderer';
import CodeModal from './CodeModal';
import ChartSettings from './ChartSettings';
import AdditionalSettings from './AdditionalSettings';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle } from 'chart.js';
// Chart.js 구성 요소 등록
ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,ArcElement,PointElement,LineElement,Filler,Decimation,SubTitle);

function DirectInput({ onBack, initialData, defaultChartType }) {
    // 차트 설정 상태 관리
    const [activeChart, setActiveChart] = useState(defaultChartType || '');
    const [labels, setLabels] = useState(['라벨 1번', '라벨 2번', '라벨 3번', '라벨 4번']);
    const [innerdata, setInnerdata] = useState([[12, 19, 3, 5]]);
    const [backgroundColors, setBackgroundColors] = useState(['rgba(255, 99, 132, 0.6)']);
    const [borderColors, setBorderColors] = useState(['rgba(54, 162, 235, 1)']);
    const [borderWidth, setBorderWidth] = useState([1]);
    const [datasetLabels, setDatasetLabels] = useState(['데이터셋 1번']);
    const [savedCode, setSavedCode] = useState(''); 
    const [showModal, setShowModal] = useState(false); 
    const [activeTab, setActiveTab] = useState('data'); 
    const [activeSection, setActiveSection] = useState('chart'); 

    // 초기 데이터 로드
    useEffect(() => {
        if (initialData) {
            const { labels: initialLabels, datasets } = initialData;
            setLabels(initialLabels);
            setInnerdata(datasets.map((dataset) => dataset.data));
            setDatasetLabels(datasets.map((dataset) => dataset.label));
            setBackgroundColors(datasets.map(() => 'rgba(255, 99, 132, 0.6)'));
            setBorderColors(datasets.map(() => 'rgba(54, 162, 235, 1)'));
            setBorderWidth(datasets.map(() => 1));
        }
    }, [initialData]);

    // 차트 데이터 초기화
    const chartData = {
        labels: labels,
        datasets: datasetLabels.map((label, index) => ({
            label: label,
            data: innerdata[index],
            backgroundColor: backgroundColors[index],
            borderColor: borderColors[index],
            borderWidth: borderWidth[index],
        })),
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
