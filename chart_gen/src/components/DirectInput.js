import React, { useState, useEffect } from 'react';
import ChartRenderer from '../components/ChartRenderer';
import CodeModal from '../components/CodeModal';
import FileConvertModal from '../components/FileConvertModal';
import ChartSettings from '../components/ChartSettings';
import AdditionalSettings from '../components/AdditionalSettings';
import { generateChartCode, prepareJsonData, downloadJson, prepareCsvData, downloadCsv, prepareXlsxData, downloadXlsx } from '../utils/utils';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle } from 'chart.js';

// Chart.js 구성 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle);

function DirectInput({ onBack, initialData, defaultChartType }) {
    // 상태 관리
    const [activeChart, setActiveChart] = useState(defaultChartType || '');

    const [labels, setLabels] = useState(['라벨 1번', '라벨 2번', '라벨 3번', '라벨 4번']);
    const [innerdata, setInnerdata] = useState([[12, 19, 3, 5]]);
    const [datasetLabels, setDatasetLabels] = useState(['데이터셋 1번']);

    const [backgroundColors, setBackgroundColors] = useState(['rgba(255, 99, 132, 0.6)']);
    const [borderColors, setBorderColors] = useState(['rgba(54, 162, 235, 1)']);
    const [borderWidth, setBorderWidth] = useState([1]);

    const [savedCode, setSavedCode] = useState('');
    const [showCodeModal, setShowCodeModal] = useState(false);
    const [showFileConvertModal, setShowFileConvertModal] = useState(false);
    const [activeTab, setActiveTab] = useState('data');
    const [activeSection, setActiveSection] = useState('chart');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
        try {
            const chartCode = generateChartCode(activeChart, chartData);
            setSavedCode(chartCode);
            setShowCodeModal(true); // 모달 열기
        } catch (error) {
            alert(error.message);
        }
    };

    // JSON 다운로드
    const downloadAsJson = () => {
        const data = prepareJsonData(labels, datasetLabels, innerdata);
        downloadJson(data);
    };

    // CSV 다운로드
    const downloadAsCsv = () => {
        const csvContent = prepareCsvData(labels, datasetLabels, innerdata);
        downloadCsv(csvContent);
    };

    // XLSX 다운로드
    const downloadAsXlsx = () => {
        const workbook = prepareXlsxData(labels, datasetLabels, innerdata);
        downloadXlsx(workbook);
    };

    return (
        <div className='main'>
            <div className="top_title_box n2">
                <button className='custom-btn custom-back btn btn-secondary' onClick={onBack}>뒤로가기</button>
                <strong className='title'>직접 입력</strong>
                <div className='right_item d-flex gap-1'>
                    <button className='btn btn-success' onClick={handleSaveChartCode}>코드 확인</button>
                    <button className='btn btn-success' onClick={() => setShowFileConvertModal(true)}>파일 변환</button>
                </div>
            </div>
            <div className="chart_wrap">
                <div id="chart_setting"
                    className={`input_wrap w3-sidebar w3-bar-block w3-card w3-animate-left`}
                    style={{
                        display: isSidebarOpen ? "block" : "none",
                        width: isSidebarOpen ? "50%" : "0"
                    }}>
                    <ChartSettings
                        activeChart={activeChart}
                        setActiveChart={setActiveChart}
                        
                        labels={labels}
                        setLabels={setLabels}
                        innerdata={innerdata}
                        setInnerdata={setInnerdata}
                        datasetLabels={datasetLabels}
                        setDatasetLabels={setDatasetLabels}

                        backgroundColors={backgroundColors}
                        setBackgroundColors={setBackgroundColors}
                        borderColors={borderColors}
                        setBorderColors={setBorderColors}
                        borderWidth={borderWidth}
                        setBorderWidth={setBorderWidth}
                        
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        activeSection={activeSection}
                        toggleSection={(section) => setActiveSection((prev) => (prev === section ? '' : section))}
                    />
                    <AdditionalSettings
                        activeSection={activeSection}
                        toggleSection={(section) => setActiveSection((prev) => (prev === section ? '' : section))}
                    />
                </div>
                <div
                    className="result_wrap sticky-top"
                    style={{
                        flex: isSidebarOpen ? "1" : "auto"
                    }}
                >
                    {!isSidebarOpen ? (
                        <div className='btn_wrap'>
                            <button className="btn btn-primary" onClick={() => setIsSidebarOpen(true)}>
                                축소
                            </button>
                        </div>
                    ) : (
                        <div className='btn_wrap'>
                            <button className="btn btn-primary" onClick={() => setIsSidebarOpen(false)}>확대</button>
                        </div>
                    )}
                    <ChartRenderer activeChart={activeChart} chartData={chartData} isSidebarOpen={isSidebarOpen}/>
                </div>
            </div>
            {showCodeModal && (
                <CodeModal
                    savedCode={savedCode}
                    closeModal={() => setShowCodeModal(false)}
                />
            )}
            {showFileConvertModal && (
                <FileConvertModal
                    closeModal={() => setShowFileConvertModal(false)}
                    onDownload={{
                        downloadAsJson,
                        downloadAsCsv,
                        downloadAsXlsx,
                    }}
                />
            )}
        </div>
    );
}

export default DirectInput;
