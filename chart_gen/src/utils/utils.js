import * as XLSX from 'xlsx';
import pattern from "patternomaly";

// rgba 색상을 HEX 색상으로 변환
export const rgbaToHex = (rgba) => {
    const parts = rgba.match(/\d+/g);
    const r = parseInt(parts[0]).toString(16).padStart(2, '0');
    const g = parseInt(parts[1]).toString(16).padStart(2, '0');
    const b = parseInt(parts[2]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
};

// HEX 색상을 rgba 색상으로 변환
export const hexToRgba = (hex, alpha = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// JSON 데이터를 labels와 datasets 형식으로 변환
function formatJsonData(data) {
    const labels = data.labels || [];
    const datasets = data.datasets.map((dataset) => ({
        label: dataset.label,
        data: dataset.data,
    }));

    return { labels, datasets };
}

// XLSX 데이터를 labels와 datasets 형식으로 변환
function formatXlsxData(data) {
    // First column is labels, first row contains dataset labels
    const labels = data.slice(1).map(row => row[0]); // Exclude header and use first column as labels
    const datasets = data[0].slice(1).map((datasetLabel, colIndex) => ({
        label: datasetLabel || `데이터셋 ${colIndex + 1}`,
        data: data.slice(1).map(row => row[colIndex + 1] || 0), // Skip header row
    }));

    return { labels, datasets };
}

// 업로드된 파일(JSON 또는 XLSX)을 파싱하여 데이터 구조로 변환
export async function parseFileData(file, fileExtension) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                if (fileExtension === 'json') {
                    const data = JSON.parse(event.target.result);
                    resolve(formatJsonData(data));
                } else if (fileExtension === 'xlsx') {
                    const workbook = XLSX.read(event.target.result, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                    resolve(formatXlsxData(data));
                }
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => {
            reject(error);
        };

        if (fileExtension === 'json') {
            reader.readAsText(file);
        } else if (fileExtension === 'xlsx') {
            reader.readAsBinaryString(file);
        }
    });
}

// 파일 업로드 처리 함수
export const processFileUpload = async (file) => {
    if (!file) throw new Error('파일이 없습니다.');

    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!['json', 'xlsx'].includes(fileExtension)) {
        throw new Error('지원하지 않는 파일 형식입니다. JSON 또는 XLSX 파일만 업로드하세요.');
    }

    const parsedData = await parseFileData(file, fileExtension);
    return parsedData;
};

// 차트 HTML 코드 생성
export const generateChartCode = (activeChart, chartData) => {
    if (!activeChart) {
        throw new Error('차트 타입이 필요합니다.');
    }

    // 로컬 개발 환경인지 확인
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    // 환경에 따라 Chart.js 경로 선택
    const chartJsSrc = isLocal 
        ? "https://cdn.jsdelivr.net/npm/chart.js" 
        : "/pcms/common/plugins/Chartjs/Chartjs.js";

    return `
        <script src="${chartJsSrc}"></script>
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
};

// JSON 데이터 생성
export const prepareJsonData = (labels, datasetLabels, innerdata) => {
    return {
        labels: labels,
        datasets: datasetLabels.map((label, index) => ({
            label: label,
            data: innerdata[index],
        })),
    };
};

// JSON 다운로드
export const downloadJson = (data, fileName = 'chart_data.json') => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const anchor = document.createElement('a');
    anchor.href = dataStr;
    anchor.download = fileName;
    anchor.click();
};

// CSV 데이터 생성
export const prepareCsvData = (labels, datasetLabels, innerdata) => {
    const rows = [
        ["Label", ...datasetLabels], // 헤더 생성
        ...labels.map((label, index) => [
            label,
            ...innerdata.map((dataset) => dataset[index] || 0),
        ]),
    ];

    return rows.map((row) => row.join(",")).join("\n");
};

// CSV 다운로드
export const downloadCsv = (csvContent, fileName = 'chart_data.csv') => {
    const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    const anchor = document.createElement('a');
    anchor.href = dataStr;
    anchor.download = fileName;
    anchor.click();
};

// XLSX 데이터 생성
export const prepareXlsxData = (labels, datasetLabels, innerdata) => {
    const rows = [
        ["Label", ...datasetLabels], // 헤더 생성
        ...labels.map((label, index) => [
            label,
            ...innerdata.map((dataset) => dataset[index] || 0),
        ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Chart Data');

    return workbook;
};

// XLSX 다운로드
export const downloadXlsx = (workbook, fileName = 'chart_data.xlsx') => {
    XLSX.writeFile(workbook, fileName);
};


// 차트 초기값 정의 함수
export const initChart = (chartType) => {
    const chartConfig = {
        bar: {
            type: 'bar',
            data: {
                labels: ['Category 1', 'Category 2', 'Category 3'],
                datasets: [{
                    label: 'Dataset 1',
                    data: [10, 20, 30],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                },
            },
        },
        line: {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March'],
                datasets: [{
                    label: 'Dataset 1',
                    data: [15, 25, 35],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderWidth: 2,
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                },
            },
        },
        pie: {
            type: 'pie',
            data: {
                labels: ['Red', 'Blue', 'Yellow'],
                datasets: [{
                    data: [30, 50, 20],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                },
            },
        },
        doughnut: {
            type: 'doughnut',
            data: {
                labels: ['Red', 'Blue', 'Yellow'],
                datasets: [{
                    data: [40, 30, 30],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                },
            },
        },
    };

    return chartConfig[chartType] || {
        type: 'bar',
        data: {
            labels: [],
            datasets: [],
        },
        options: {},
    };
};

export const handleDataChange = (setChartInstance, property, datasetIndex, valueIndex, newValue) => {
    setChartInstance(prevState => {
        const updatedData = { ...prevState.data };

        if (property === 'labels') {
            updatedData.labels = [...updatedData.labels];
            updatedData.labels[valueIndex] = newValue;
        } else if (property === 'datasetsLabel') {
            updatedData.datasets = [...updatedData.datasets];
            updatedData.datasets[datasetIndex] = { 
                ...updatedData.datasets[datasetIndex], 
                label: newValue 
            };
        } else if (property === 'data') {
            updatedData.datasets = [...updatedData.datasets];
            updatedData.datasets[datasetIndex] = { 
                ...updatedData.datasets[datasetIndex], 
                data: [...updatedData.datasets[datasetIndex].data]
            };
            updatedData.datasets[datasetIndex].data[valueIndex] = newValue;
        } else if (property === 'backgroundColor') {
            updatedData.datasets = [...updatedData.datasets];
            updatedData.datasets[datasetIndex] = { 
                ...updatedData.datasets[datasetIndex], 
                backgroundColor: [...updatedData.datasets[datasetIndex].backgroundColor]
            };
            updatedData.datasets[datasetIndex].backgroundColor[valueIndex] = newValue;
        } else if (property === 'borderColor') {
            updatedData.datasets = [...updatedData.datasets];
            updatedData.datasets[datasetIndex] = { 
                ...updatedData.datasets[datasetIndex], 
                borderColor: [...updatedData.datasets[datasetIndex].borderColor]
            };
            updatedData.datasets[datasetIndex].borderColor[valueIndex] = newValue;
        } else if (property === 'borderWidth') {
            updatedData.datasets = [...updatedData.datasets];
            updatedData.datasets[datasetIndex] = { 
                ...updatedData.datasets[datasetIndex], 
                borderWidth: newValue 
            };
        }

        return {
            ...prevState,
            data: updatedData
        };
    });
};

// 데이터셋 추가
export const handleAddDataset = (setChartInstance, chartInstance, chartType) => {
    if (!chartInstance) return;

    if (chartInstance.data.datasets.length >= 10) {
        alert('데이터셋은 최대 10개까지 추가할 수 있습니다.');
        return;
    }

    let newDataset = {};

    // 차트 타입별로 newDataset을 다르게 설정
    if (chartType === 'bar' || chartType === 'line') {
        newDataset = {
            label: `Dataset ${chartInstance.data.datasets.length + 1}`,
            data: Array(chartInstance.data.labels.length).fill(10), // 기본값 10으로 초기화
            backgroundColor: Array(chartInstance.data.labels.length).fill(
                `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`
            ),
            borderColor: Array(chartInstance.data.labels.length).fill(
                `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`
            ),
            borderWidth: 1,
        };
        console.log(newDataset.backgroundColor);
    } else if (chartType === 'pie' || chartType === 'doughnut') {
        newDataset = {
            data: Array(chartInstance.data.labels.length).fill(10), // 기본값 10으로 초기화
            backgroundColor: chartInstance.data.labels.map(() =>
                `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`
            ),
        };
    } else {
        alert("지원되지 않는 차트 타입입니다.");
        return;
    }

    // 차트 상태 업데이트
    const newChartInstance = {
        ...chartInstance,
        data: {
            ...chartInstance.data,
            datasets: [...chartInstance.data.datasets, newDataset],
        },
    };

    setChartInstance(newChartInstance);
};

// 데이터셋 제거
export const handleRemoveDataset = (setChartInstance, chartInstance, datasetIndex) => {
    if (!chartInstance) return;

    // 데이터셋이 하나도 없으면 삭제할 수 없음
    if (chartInstance.data.datasets.length === 1) {
        alert("삭제할 데이터셋이 없습니다.");
        return;
    }

    const newChartInstance = {
        ...chartInstance,
        data: {
            ...chartInstance.data,
            datasets: chartInstance.data.datasets.filter((_, index) => index !== datasetIndex) // 해당 데이터셋 삭제
        }
    };

    setChartInstance(newChartInstance);
};

