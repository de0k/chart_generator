import React, { useState, useEffect } from 'react';
import ChartRenderer from './ChartRenderer';
import CodeModal from './CodeModal';
import FileConvertModal from './FileConvertModal';
import ChartSettings from './ChartSettings';
import AdditionalSettings from './AdditionalSettings';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle } from 'chart.js';
import * as XLSX from 'xlsx';

// Chart.js 구성 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle);

function DirectInput({ onBack, initialData, defaultChartType }) {
    // 상태 관리
    const [activeChart, setActiveChart] = useState(defaultChartType || '');
    const [labels, setLabels] = useState(['라벨 1번', '라벨 2번', '라벨 3번', '라벨 4번']);
    const [innerdata, setInnerdata] = useState([[12, 19, 3, 5]]);
    const [backgroundColors, setBackgroundColors] = useState(['rgba(255, 99, 132, 0.6)']);
    const [borderColors, setBorderColors] = useState(['rgba(54, 162, 235, 1)']);
    const [borderWidth, setBorderWidth] = useState([1]);
    const [datasetLabels, setDatasetLabels] = useState(['데이터셋 1번']);
    const [savedCode, setSavedCode] = useState('');
    const [showCodeModal, setShowCodeModal] = useState(false);
    const [showFileConvertModal, setShowFileConvertModal] = useState(false);
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
        setShowCodeModal(true); // 모달 열기
    };

    // 섹션을 변경하는 함수
    const toggleSection = (section) => {
        setActiveSection((prev) => (prev === section ? '' : section));
    };

    // JSON 다운로드
    const downloadAsJson = () => {
        const dataOnly = {
            labels: labels,
            datasets: datasetLabels.map((label, index) => ({
                label: label,
                data: innerdata[index],
            })),
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataOnly));
        const anchor = document.createElement('a');
        anchor.href = dataStr;
        anchor.download = 'chart_data.json';
        anchor.click();
    };

    // CSV 다운로드
    const downloadAsCsv = () => {
        const rows = [
            ["Label", ...datasetLabels],
            ...labels.map((label, index) => [
                label,
                ...innerdata.map((dataset) => dataset[index] || 0),
            ]),
        ];

        const csvContent = rows.map((e) => e.join(",")).join("\n");
        const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
        const anchor = document.createElement('a');
        anchor.href = dataStr;
        anchor.download = 'chart_data.csv';
        anchor.click();
    };

    // XLSX 다운로드
    const downloadAsXlsx = () => {
        const rows = [
            ["Label", ...datasetLabels],
            ...labels.map((label, index) => [
                label,
                ...innerdata.map((dataset) => dataset[index] || 0),
            ]),
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Chart Data');
        XLSX.writeFile(workbook, 'chart_data.xlsx');
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
