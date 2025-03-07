import * as XLSX from 'xlsx';

/* 
    ● rgba 색상을 HEX 색상으로 변환
    rgba를 매개변수로 받아 숫자만 추출하여 parts에 저장
    각각 r,g,b에 저장 ( parseInt() -> 숫자로 변환 / .toString(16) -> 16진수 문자열로 변환 / .padStart(2, '0') -> 한 자리일 경우 앞에 0을 추가 (예: 9 → 09) )
    hex 형태로 반환
*/
export const rgbaToHex = (rgba) => {
    const parts = rgba.match(/\d+(\.\d+)?/g);
    if (!parts || parts.length < 3) return rgba; // 유효하지 않은 값 처리

    const r = parseInt(parts[0]).toString(16).padStart(2, '0');
    const g = parseInt(parts[1]).toString(16).padStart(2, '0');
    const b = parseInt(parts[2]).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`; // 6자리 HEX 반환
};



/* 
    ● HEX 색상을 rgba 색상으로 변환
    alpha(투명도), hex를 매개변수로 받아 ex) "#ff6347"
    각각 r,g,b에 16진수로 변환하여 저장 ( r -> ff, g -> 63, b -> 47 )
    rgba 형태로 반환
*/
export const hexToRgba = (hex, alpha = 1) => {
    if (!hex.startsWith("#")) return hex; // 유효하지 않은 HEX 값 처리

    let r, g, b;
    
    if (hex.length === 7) { // #RRGGBB 포맷
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
    } else {
        return hex; // 유효하지 않은 경우 원본 반환
    }

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

/* 
    ● XLSX 데이터를 labels와 datasets 형식으로 변환

    ex)
    labels   데이터셋 1번
    ---------------------
    라벨 1번       12
    라벨 2번       19
    라벨 3번        3
    라벨 4번       25

    data.slice(1) -> ["라벨 1번", 12], ["라벨 2번", 19], ["라벨 3번", 3], ["라벨 4번", 25]
    .map(row => row[0]); -> labels: ["라벨 1번", "라벨 2번", "라벨 3번", "라벨 4번"],
    data[0].slice(1) -> 데이터셋 1번
    data: data.slice(1).map(row => row[colIndex + 1] || 0), -> 헤더 제거 후 라벨을 제외한 data들만 추출
*/
function formatXlsxData(data) {
    const labels = data.slice(1).map(row => row[0]);
    const datasets = data[0].slice(1).map((datasetLabel, colIndex) => ({
        label: datasetLabel || `데이터셋 ${colIndex + 1}`,
        // data: data.slice(1).map(row => row[colIndex + 1] || 0),
        data: data.slice(1).map(row => {
            let value = row[colIndex + 1] || 0;
            return (data.length > 1 && Array.isArray(data[1]) && data[1].length > 1) ? [0, value] : value; 
            // Bar 차트의 경우 [x, y] 형태로 변환
        }),
    }));

    return { labels, datasets };
}

/* 
    ● 업로드된 파일(JSON 또는 XLSX)을 파싱하여 데이터 구조로 변환

    - return new Promise((resolve, reject) => { ... });
    : 비동기 파일 처리를 위해 Promise를 사용.
      성공적으로 파일을 읽으면 resolve(data), 실패하면 reject(error)

    - const reader = new FileReader(); : FileReader 객체 생성

    - reader.onload : 파일 읽기 완료 후 실행
    - 파일 확장자가 "json"이면:
    - event.target.result → JSON 형식의 텍스트 데이터를 가져옴
    - JSON.parse(event.target.result) → JSON을 파싱하여 객체로 변환
    - formatJsonData(data) → 데이터를 변환하는 함수 실행 (위에 해당함수 참고)
    - 변환된 데이터를 resolve()로 반환
    - 파일 확장자가 "xlsx"이면:
    - XLSX.read(event.target.result, { type: 'binary' }) → 엑셀 파일을 바이너리로 읽음
    - workbook.SheetNames[0] → 첫 번째 시트의 이름 가져오기
    - workbook.Sheets[sheetName] → 해당 시트의 내용 가져오기
    - XLSX.utils.sheet_to_json(sheet, { header: 1 }) → 엑셀 데이터를 배열 형식으로 변환
    - formatXlsxData(data) → 데이터를 변환하는 함수 실행 (위에 해당함수 참고)
    - 변환된 데이터를 resolve()로 반환

    - 파일 읽기 실패 시 처리 (reader.onerror)

    - JSON 파일 → reader.readAsText(file) : 텍스트 형식으로 파일을 읽음
    - XLSX 파일 → reader.readAsBinaryString(file)
      : 바이너리 형식으로 파일을 읽음 (엑셀 파일은 바이너리 데이터를 처리해야 함)
*/
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
export const generateChartCode = (chartInstance) => {
    if (!chartInstance.type) {
        throw new Error('차트 타입이 필요합니다.');
    }

    // 로컬 개발 환경인지 확인
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    // 환경에 따라 Chart.js 경로 선택
    const chartJsSrc = isLocal
        ? "https://cdn.jsdelivr.net/npm/chart.js@3.9.0"
        : "/pcms/common/plugins/Chartjs/Chartjs.js";

    return `
        <script src="${chartJsSrc}"></script>
        <canvas id="myChart" width="400" height="400"></canvas>
        <script>
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: '${chartInstance.type}',
            data: ${JSON.stringify(chartInstance.data)},
            options: ${JSON.stringify(chartInstance.options)},
        });
        </script>
    `.trim();
};

// JSON 데이터 생성
export const prepareJsonData = (chartInstance) => {
    if (!chartInstance || !chartInstance.data) {
        throw new Error("유효한 chartInstance가 필요합니다.");
    }
    return {
        labels: chartInstance.data.labels,
        datasets: chartInstance.data.datasets.map((dataset) => ({
            label: dataset.label,
            data: dataset.data,
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
export const prepareCsvData = (chartInstance) => {
    if (!chartInstance || !chartInstance.data) {
        throw new Error("유효한 chartInstance가 필요합니다.");
    }

    const { labels, datasets } = chartInstance.data;
    const datasetLabels = datasets.map(dataset => dataset.label);
    const innerdata = datasets.map(dataset => dataset.data);

    const rows = [
        ["Label", ...datasetLabels], // 헤더 생성
        ...labels.map((label, index) => [
            label,
            // ...innerdata.map((dataset) => dataset[index] || 0),
            ...innerdata.map((dataset) => {
                let value = dataset[index] || 0;
                return (chartInstance.type === 'bar' && Array.isArray(value)) ? value[1] : value; // Bar 차트의 경우 Y값만 저장
            }),
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
export const prepareXlsxData = (chartInstance) => {
    if (!chartInstance || !chartInstance.data) {
        throw new Error("유효한 chartInstance가 필요합니다.");
    }

    const { labels, datasets } = chartInstance.data;
    const datasetLabels = datasets.map(dataset => dataset.label);
    const innerdata = datasets.map(dataset => dataset.data);

    const rows = [
        ["Label", ...datasetLabels], // 헤더 생성
        ...labels.map((label, index) => [
            label,
            // ...innerdata.map((dataset) => dataset[index] || 0),
            ...innerdata.map((dataset) => {
                let value = dataset[index] || 0;
                return (chartInstance.type === 'bar' && Array.isArray(value)) ? value[1] : value; // Bar 차트의 경우 Y값만 저장
            }),
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
    var commonOptions = {
        responsive: true, // 차트가 반응형 동작
        maintainAspectRatio: true,
        plugins: {
            title: { // 차트 제목 설정
                display: true, // 차트 제목 표시 여부
                fullWidth: true, // 차트 전체 너비 설정 여부
                text: "차트 제목입니다.",
                position: "top",
                color: "#aa7942",
                font: { size: 16 },
                padding: {
                    top: 5,
                    bottom: 5,
                },
            },
            subtitle: {
                display: true,
                text: '차트 부제목입니다.',
                position: "top",
                color: '#000',
                font: {
                    size: 12,
                },
                padding: {
                    top: 5,
                    bottom: 5,
                },
            },
            legend: { // 범례 설정
                display: true,
                fullWidth: true,
                position: "top",
                labels: {
                    color: "#000",
                    font: { size: 16 },
                    padding: 5,
                },
                title: {
                    display: true,
                    text: '범례 제목 입니다.',
                    position: 'center',
                    padding: 5,
                    color: "#000",
                },
                align: 'center',
            },
        },
        interaction: {
            mode: "nearest",
            intersect: true,
        },
    };

    const isStacked = false;

    const bar_dataset = {
        label: '데이터셋 1',
        data: [[0, 10], [0, 20], [0, 30]],
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
        borderRadius: 0,
        order: 0,
        borderSkipped: false,
    };

    if (isStacked) {
        bar_dataset.stack = 'Stack 0';
    }

    const chartConfig = {
        bar: {
            type: 'bar',
            data: {
                labels: ['라벨 1', '라벨 2', '라벨 3'],
                datasets: [bar_dataset],
            },
            options: {
                ...commonOptions,
                indexAxis: 'x',
                scales: {
                    x: { type: 'category', beginAtZero: true, stacked: isStacked },
                    y: { type: 'linear', beginAtZero: true, stacked: isStacked },
                },
            },
        },
        line: {
            type: 'line',
            data: {
                labels: ['라벨 1', '라벨 2', '라벨 3'],
                datasets: [{
                    label: '데이터셋 1',
                    data: [15, 25, 35],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0,
                    fill: false,
                    stepped: false,
                    order: 0,
                    // pointStyle: ['circle','circle','circle'],
                    // pointRadius: [10,10,10],
                    // pointHoverRadius: [15,15,15],
                }],
            },
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    filler: {
                        propagate: false,
                    },
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: "x축 제목", // X축 제목 추가
                            color: "#000",
                            font: {
                                size: 16,
                            }
                        },
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'y축 제목',
                            color: "#000",
                            font: {
                                size: 16,
                            }
                        },
                    }
                }
            },
        },
        pie: {
            type: 'pie',
            data: {
                labels: ['라벨 1', '라벨 2', '라벨 3'],
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
                ...commonOptions,
            },
        },
        doughnut: {
            type: 'doughnut',
            data: {
                labels: ['라벨 1', '라벨 2', '라벨 3'],
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
                ...commonOptions,
            },
        },
        polarArea: {
            type: 'polarArea',
            data: {
                labels: ['라벨 1', '라벨 2', '라벨 3'],
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
                ...commonOptions,
                scales: {
                    r: {
                        pointLabels: {
                            display: true,
                            centerPointLabels: true,
                            font: {
                                size: 15
                            },
                            color: "#000",
                        }
                    }
                },
            },
        },
        radar: {
            type: 'radar',
            data: {
                labels: ['라벨 1', '라벨 2', '라벨 3'],
                datasets: [{
                    label: '데이터셋 1',
                    data: [15, 25, 35],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                    order: 0,
                }],
            },
            options: {
                ...commonOptions,
                scales: {
                    r: {
                        pointLabels: {
                            display: true,
                            centerPointLabels: true,
                            font: {
                                size: 15
                            },
                            color: "#000",
                        }
                    }
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

/* 
    ● 차트 타입에 따른 초기화 함수
    - chartType으로 차트 초기화 및 상태 업데이트
    - 업로드데이터가 있으면 
    - ...prevChart, ...prevChart.data, ...dataset, 기존 차트 상태 불러와서 데이터 덮어 씌움
    - backgroundColor: Array.from({ length: uploadedData.labels.length } -> 업로드된 데이터가 차트 초기값 보다 많을 수 있어서 해당 속성 업로드된 데이터 갯수만큼 생성
    - (_, i) -> _는 첫 번째 매개변수(배열 요소 값) 를 의미하는데, 여기선 필요 없으므로 _로 무시함. i는 현재 인덱스를 의미함.
*/
export const handleChartType = (chartType, setChartInstance, uploadedData) => {
    let options = initChart(chartType);
    console.log(options);
    setChartInstance(options);

    if (uploadedData) {
        setChartInstance(prevChart => {
            const isStacked = prevChart.options?.scales?.x?.stacked && prevChart.options?.scales?.y?.stacked; // 스택 여부 확인

            return {
                ...prevChart,
                data: {
                    ...prevChart.data,
                    labels: uploadedData.labels,
                    datasets: uploadedData.datasets.map((dataset, index) => {
                        // 기존 차트의 dataset이 있다면 사용, 없으면 기본값(initChart에서 가져옴) 적용
                        const baseDataset = prevChart.data.datasets[index] || options.data.datasets[0] || {};

                        const newDataset = {
                            ...baseDataset,
                            label: dataset.label,
                            // data -> [1,3,5] 이면 bar차트의 경우 [[0,1],[0,3],[0,5]]로 바꿔줌
                            data: chartType === 'bar'
                                ? dataset.data.map(value =>
                                    Array.isArray(value) ? value : [0, value]
                                )
                                : dataset.data,
                                backgroundColor: Array.from({ length: uploadedData.labels.length }, (_, i) =>
                                    baseDataset.backgroundColor?.[i] ||
                                    dataset.backgroundColor?.[i] ||
                                    `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`
                                ),
                        };

                        if (chartType === 'bar') {
                            newDataset.borderColor = Array.from({ length: uploadedData.labels.length }, (_, i) =>
                                baseDataset.borderColor?.[i] ||
                                dataset.borderColor?.[i] ||
                                `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`
                            );                        
                            newDataset.borderWidth = dataset.borderWidth ?? baseDataset.borderWidth ?? 1;
                            newDataset.borderRadius = dataset.borderRadius ?? baseDataset.borderRadius ?? 0;
                            newDataset.order = dataset.order ?? baseDataset.order ?? 0;
                            newDataset.borderSkipped = dataset.borderSkipped ?? baseDataset.borderSkipped ?? false;
                            // options.scales.x.stacked 및 options.scales.y.stacked가 true일 경우만 stack 적용
                            if (isStacked) {
                                newDataset.stack = baseDataset.stack || 'Stack 0';
                            } else {
                                delete newDataset.stack; // 스택이 비활성화되면 stack 속성 제거
                            }
                        }

                        if (chartType === 'line') {
                            newDataset.backgroundColor = dataset.backgroundColor ?? baseDataset.backgroundColor ?? `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
                            newDataset.borderColor = dataset.borderColor ?? baseDataset.borderColor ?? `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
                            newDataset.tension = dataset.tension ?? baseDataset.tension ?? 0;
                            newDataset.fill = dataset.fill ?? baseDataset.fill ?? false;
                            newDataset.stepped = dataset.stepped ?? baseDataset.stepped ?? false;
                            newDataset.order = dataset.order ?? baseDataset.order ?? 0;

                            // newDataset.pointStyle = Array.from({ length: uploadedData.labels.length }, (_, i) =>
                            //     dataset.pointStyle[i] || 'circle'
                            // );
                            // newDataset.pointRadius = Array.from({ length: uploadedData.labels.length }, (_, i) =>
                            //     dataset.pointRadius[i] || 10
                            // );
                            // newDataset.pointHoverRadius = Array.from({ length: uploadedData.labels.length }, (_, i) =>
                            //     dataset.pointHoverRadius[i] || 15
                            // );
                        }

                        if (chartType === 'radar') {
                            newDataset.backgroundColor = dataset.backgroundColor ?? baseDataset.backgroundColor ?? `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
                            newDataset.borderColor = dataset.borderColor ?? baseDataset.borderColor ?? `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
                            newDataset.order = dataset.order ?? baseDataset.order ?? 0;
                        }

                        console.log("적용될 데이터셋: ", newDataset);

                        return newDataset;
                    }),
                },
            };
        });
    }
};

// 차트 data 속성 핸들링 함수
export const handleDataChange = (setChartInstance, property, datasetIndex, valueIndex, newValue, minMax = false) => {
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

            // ✅ Floating Bar Chart 지원
            if (Array.isArray(updatedData.datasets[datasetIndex].data[valueIndex])) {
                if (minMax) {
                    updatedData.datasets[datasetIndex].data[valueIndex] = newValue; // [min, max] 값 직접 전달
                } else {
                    updatedData.datasets[datasetIndex].data[valueIndex] = [
                        updatedData.datasets[datasetIndex].data[valueIndex][0],
                        newValue
                    ]; // max 값만 변경
                }
            } else {
                // ✅ 기존 데이터가 단일 값일 때
                if (minMax) {
                    updatedData.datasets[datasetIndex].data[valueIndex] = newValue; // [min, max] 값 직접 전달
                } else {
                    // ✅ Bar Chart가 아닌 경우는 그대로 단일 값 유지
                    updatedData.datasets[datasetIndex].data[valueIndex] = newValue;
                }
            }
        } else if (property === 'backgroundColor') {
            updatedData.datasets = [...updatedData.datasets];
            updatedData.datasets[datasetIndex] = {
                ...updatedData.datasets[datasetIndex],
                backgroundColor: [...updatedData.datasets[datasetIndex].backgroundColor]
            };
            updatedData.datasets[datasetIndex].backgroundColor[valueIndex] = newValue;
        } else if (property === 'backgroundColor_1') {
            updatedData.datasets = [...updatedData.datasets];
            updatedData.datasets[datasetIndex] = {
                ...updatedData.datasets[datasetIndex],
                backgroundColor: newValue
            };
        } else if (property === 'borderColor') {
            updatedData.datasets = [...updatedData.datasets];
            updatedData.datasets[datasetIndex] = {
                ...updatedData.datasets[datasetIndex],
                borderColor: [...updatedData.datasets[datasetIndex].borderColor]
            };
            updatedData.datasets[datasetIndex].borderColor[valueIndex] = newValue;
        } else if (property === 'borderColor_1') {
            updatedData.datasets = [...updatedData.datasets];
            updatedData.datasets[datasetIndex] = {
                ...updatedData.datasets[datasetIndex],
                borderColor: newValue
            };
        } else if (property === 'borderWidth') {
            updatedData.datasets = [...updatedData.datasets];
            updatedData.datasets[datasetIndex] = {
                ...updatedData.datasets[datasetIndex],
                borderWidth: newValue
            };
        } else if (property === 'borderRadius') {
            updatedData.datasets = [...updatedData.datasets];
            updatedData.datasets[datasetIndex] = {
                ...updatedData.datasets[datasetIndex],
                borderRadius: newValue
            };
        } else if (property === 'tension') {
            updatedData.datasets = [...updatedData.datasets];
            updatedData.datasets[datasetIndex] = {
                ...updatedData.datasets[datasetIndex],
                tension: newValue
            };
        } else if (property === 'fill') {
            // if (newValue === '없음') {newValue = false;}
            // else if (newValue === '기준선부터') {newValue = 'origin';}
            // else if (newValue === '최소값부터') {newValue = 'start';}
            // else if (newValue === '최대값까지') {newValue = 'end';}
            // updatedData.datasets = [...updatedData.datasets];
            updatedData.datasets[datasetIndex] = {
                ...updatedData.datasets[datasetIndex],
                fill: newValue
            };
        } else if (property === 'stepped') {
            updatedData.datasets = [...updatedData.datasets];
            updatedData.datasets[datasetIndex] = {
                ...updatedData.datasets[datasetIndex],
                stepped: newValue
            };
        } else if (property === 'order') {
            updatedData.datasets = [...updatedData.datasets];
            updatedData.datasets[datasetIndex] = {
                ...updatedData.datasets[datasetIndex],
                order: newValue
            };
        } else if (property === 'stack') {
            updatedData.datasets = [...updatedData.datasets];
            updatedData.datasets[datasetIndex] = {
                ...updatedData.datasets[datasetIndex],
                stack: newValue
            };
        }


        // else if (property === 'datasets_pointStyle') {
        //     updatedData.datasets = [...updatedData.datasets];
        //     updatedData.datasets[datasetIndex] = {
        //         ...updatedData.datasets[datasetIndex],
        //         pointStyle: [...updatedData.datasets[datasetIndex].pointStyle]
        //     };
        //     updatedData.datasets[datasetIndex].pointStyle[valueIndex] = newValue;
        // } else if (property === 'datasets_pointRadius') {
        //     updatedData.datasets = [...updatedData.datasets];
        //     updatedData.datasets[datasetIndex] = {
        //         ...updatedData.datasets[datasetIndex],
        //         pointRadius: [...updatedData.datasets[datasetIndex].pointRadius]
        //     };
        //     updatedData.datasets[datasetIndex].pointRadius[valueIndex] = newValue;
        // } else if (property === 'datasets_pointHoverRadius') {
        //     updatedData.datasets = [...updatedData.datasets];
        //     updatedData.datasets[datasetIndex] = {
        //         ...updatedData.datasets[datasetIndex],
        //         pointHoverRadius: [...updatedData.datasets[datasetIndex].pointHoverRadius]
        //     };
        //     updatedData.datasets[datasetIndex].pointHoverRadius[valueIndex] = newValue;
        // }

        return {
            ...prevState,
            data: updatedData
        };
    });
};

// 차트 options 속성 핸들링 함수
export const handleOptionsChange = (setChartInstance, property, newValue) => {
    setChartInstance(prevState => {
        let updatedOptions = JSON.parse(JSON.stringify(prevState.options));

        if (property === 'indexAxis') {
            updatedOptions.indexAxis = newValue;

            updatedOptions.scales = newValue === 'y'
                ? { x: { beginAtZero: true, stacked: updatedOptions.scales?.x?.stacked || false }, y: { type: 'category' } }
                : { x: { type: 'category' }, y: { beginAtZero: true, stacked: updatedOptions.scales?.y?.stacked || false } };
        } else if (property === 'titleDisplay') {
            updatedOptions.plugins.title.display = newValue;
        } else if (property === 'titleFullWidth') {
            updatedOptions.plugins.title.fullWidth = newValue;
        } else if (property === 'titleText') {
            updatedOptions.plugins.title.text = newValue;
        } else if (property === 'titlePositon') {
            updatedOptions.plugins.title.position = newValue;
        } else if (property === 'titleColor') {
            updatedOptions.plugins.title.color = newValue;
        } else if (property === 'titleSize') {
            updatedOptions.plugins.title.font.size = newValue;
        } else if (property === 'title_padding_top') {
            updatedOptions.plugins.title.padding.top = newValue;
        } else if (property === 'title_padding_bottom') {
            updatedOptions.plugins.title.padding.bottom = newValue;
        } else if (property === 'subtitleDisplay') {
            updatedOptions.plugins.subtitle.display = newValue;
        } else if (property === 'subtitleText') {
            updatedOptions.plugins.subtitle.text = newValue;
        } else if (property === 'subtitlePositon') {
            updatedOptions.plugins.subtitle.position = newValue;
        } else if (property === 'subtitleColor') {
            updatedOptions.plugins.subtitle.color = newValue;
        } else if (property === 'subtitleSize') {
            updatedOptions.plugins.subtitle.font.size = newValue;
        } else if (property === 'subtitle_padding_top') {
            updatedOptions.plugins.subtitle.padding.top = newValue;
        } else if (property === 'subtitle_padding_bottom') {
            updatedOptions.plugins.subtitle.padding.bottom = newValue;
        } else if (property === 'legendDisplay') {
            updatedOptions.plugins.legend.display = newValue;
        } else if (property === 'legendFullWidth') {
            updatedOptions.plugins.legend.fullWidth = newValue;
        } else if (property === 'legendPositon') {
            updatedOptions.plugins.legend.position = newValue;
        } else if (property === 'legendColor') {
            updatedOptions.plugins.legend.labels.color = newValue;
        } else if (property === 'legendSize') {
            updatedOptions.plugins.legend.labels.font.size = newValue;
        } else if (property === 'legend_align') {
            updatedOptions.plugins.legend.align = newValue;
        } else if (property === 'legend_title_display') {
            updatedOptions.plugins.legend.title.display = newValue;
        } else if (property === 'legend_title_text') {
            updatedOptions.plugins.legend.title.text = newValue;
        } else if (property === 'legend_title_position') {
            updatedOptions.plugins.legend.title.position = newValue;
        } else if (property === 'legend_title_color') {
            updatedOptions.plugins.legend.title.color = newValue;
        } else if (property === 'legend_labels_padding') {
            updatedOptions.plugins.legend.labels.padding = newValue;
        } else if (property === 'legend_title_padding') {
            updatedOptions.plugins.legend.title.padding = newValue;
        } else if (property === 'interaction_intersect') {
            updatedOptions.interaction.intersect = newValue;
        } else if (property === 'interaction_mode') {
            updatedOptions.interaction.mode = newValue;
            updatedOptions.interaction.mode = newValue === 'index' ? "index" : 'nearest';
        } else if (property === 'scales_x_display') {
            updatedOptions.scales.x.display = newValue;
        } else if (property === 'scales_x_title_display') {
            updatedOptions.scales.x.title.display = newValue;
        } else if (property === 'scales_x_title_text') {
            updatedOptions.scales.x.title.text = newValue;
        } else if (property === 'scales_x_title_color') {
            updatedOptions.scales.x.title.color = newValue;
        } else if (property === 'scales_x_title_font_size') {
            updatedOptions.scales.x.title.font.size = newValue;
        } else if (property === 'scales_y_display') {
            updatedOptions.scales.y.display = newValue;
        } else if (property === 'scales_y_title_display') {
            updatedOptions.scales.y.title.display = newValue;
        } else if (property === 'scales_y_title_text') {
            updatedOptions.scales.y.title.text = newValue;
        } else if (property === 'scales_y_title_color') {
            updatedOptions.scales.y.title.color = newValue;
        } else if (property === 'scales_y_title_font_size') {
            updatedOptions.scales.y.title.font.size = newValue;
        } else if (property === 'scales_r_pointLabels_display') {
            updatedOptions.scales.r.pointLabels.display = newValue;
        } else if (property === 'scales_r_pointLabels_title_font_size') {
            updatedOptions.scales.r.pointLabels.font.size = newValue;
        } else if (property === 'scales_r_pointLabels_color') {
            updatedOptions.scales.r.pointLabels.color = newValue;
        } else if (property === 'scales_stacked') {
            updatedOptions.scales.x.stacked = newValue;
            updatedOptions.scales.y.stacked = newValue;

            return {
                ...prevState,
                options: updatedOptions,
                data: {
                    ...prevState.data,
                    datasets: prevState.data.datasets.map(dataset => {
                        let updatedDataset = { ...dataset };
                        if (newValue) {
                            updatedDataset.stack = dataset.stack || 'Stack 0';
                        } else {
                            delete updatedDataset.stack;
                        }
                        return updatedDataset;
                    }),
                },
            };
        }



        console.log('Before Update:', prevState);
        console.log('After Update:', updatedOptions);

        return {
            ...prevState,
            options: updatedOptions
        };
    });
};

// 차트 라벨 & 데이터 추가
export const handleAddLabel = (chartInstance, setChartInstance) => {
    if (!chartInstance) return;
    if (chartInstance.data.labels.length >= 10) {
        alert('데이터셋은 최대 10개까지 추가할 수 있습니다.');
        return;
    }

    const newLabel = `라벨 ${chartInstance.data.labels.length + 1}`;

    // 스택 활성화 여부 확인
    const isStacked = chartInstance.options?.scales?.x?.stacked && chartInstance.options?.scales?.y?.stacked;

    const newChartInstance = {
        ...chartInstance,
        data: {
            ...chartInstance.data,
            labels: [...chartInstance.data.labels, newLabel],
            datasets: chartInstance.data.datasets.map(dataset => {
                if (chartInstance.type === 'bar') {
                    return {
                        ...dataset,
                        data: [
                            ...dataset.data.map(value => Array.isArray(value) ? value : [0, value]), // 기존 데이터가 숫자면 변환
                            [0, 10] // 새 데이터 추가
                        ],
                        backgroundColor: [...dataset.backgroundColor, 'rgba(255, 99, 132, 0.2)'],
                        borderColor: [...dataset.borderColor, 'rgba(255, 99, 132, 0.2)'],
                        borderWidth: 1,
                        borderRadius: 0,
                        order: 0,
                        borderSkipped: false,
                        ...(isStacked ? { stack: 'Stack 0' } : {}), // 스택이 활성화되었을 때만 stack 추가
                    };
                } else if (chartInstance.type === 'line') {
                    return {
                        ...dataset,
                        data: [...dataset.data, 10],
                        backgroundColor: dataset.backgroundColor,
                        borderColor: dataset.borderColor,
                        tension: dataset.tension,
                        fill: dataset.fill,
                        stepped: dataset.stepped,
                        order: 0,
                        // pointStyle: [...dataset.pointStyle, 'circle'],
                        // pointRadius: [...dataset.pointRadius, 10],
                        // pointHoverRadius: [...dataset.pointHoverRadius, 15],
                    };
                } else if (chartInstance.type === 'pie' || chartInstance.type === 'doughnut') {
                    return {
                        ...dataset,
                        data: [...dataset.data, 10],
                        backgroundColor: [...dataset.backgroundColor, 'rgba(255, 99, 132, 0.2)'],
                    };
                } else if (chartInstance.type === 'polarArea') {
                    return {
                        ...dataset,
                        data: [...dataset.data, 10],
                        backgroundColor: [...dataset.backgroundColor, 'rgba(255, 99, 132, 0.2)'],
                    };
                } else if (chartInstance.type === 'radar') {
                    return {
                        ...dataset,
                        data: [...dataset.data, 10],
                        backgroundColor: dataset.backgroundColor,
                        borderColor: dataset.borderColor,
                        order: 0,
                    };
                } else {
                    return dataset;
                }
            }),
        },
    };

    setChartInstance(newChartInstance);
};

/*
    차트 라벨 & 데이터 제거
    labels: chartInstance.data.labels.filter((_, index) => index !== labelIndex),
    -> ex) labels: ["A", "B", "C", "D"], `labelIndex = 1` (B) 삭제
    -> chartInstance.data.labels.filter((_, index) => index !== 1);
    -> ["A", "C", "D"]
*/
export const handleRemoveLabel = (chartInstance, setChartInstance, labelIndex) => {
    if (!chartInstance) return;

    // 라벨이 하나도 없으면 삭제할 수 없음
    if (chartInstance.data.labels.length === 1) {
        alert("삭제할 라벨이 없습니다.");
        return;
    }

    const newChartInstance = {
        ...chartInstance,
        data: {
            ...chartInstance.data,
            labels: chartInstance.data.labels.filter((_, index) => index !== labelIndex), // 해당 라벨 삭제
            datasets: chartInstance.data.datasets.map(dataset => {
                // 차트 유형에 따라 분기 처리
                if (chartInstance.type === 'bar') {
                    return {
                        ...dataset,
                        data: dataset.data.filter((_, index) => index !== labelIndex)
                            .map(value => Array.isArray(value) ? value : [0, value]), // 데이터가 단일값이면 [0, value] 변환
                        backgroundColor: dataset.backgroundColor.filter((_, index) => index !== labelIndex),
                        borderColor: dataset.borderColor.filter((_, index) => index !== labelIndex),
                    };
                } else if (chartInstance.type === 'line') {
                    return {
                        ...dataset,
                        data: dataset.data.filter((_, index) => index !== labelIndex),
                        // pointStyle: dataset.pointStyle.filter((_, index) => index !== labelIndex),
                        // pointRadius: dataset.pointRadius.filter((_, index) => index !== labelIndex),
                        // pointHoverRadius: dataset.pointHoverRadius.filter((_, index) => index !== labelIndex),
                    };
                } else if (chartInstance.type === 'pie' || chartInstance.type === 'doughnut') {
                    return {
                        ...dataset,
                        data: dataset.data.filter((_, index) => index !== labelIndex), // 데이터 삭제
                        backgroundColor: dataset.backgroundColor.filter((_, index) => index !== labelIndex), // 배경색 삭제
                    };
                } else if (chartInstance.type === 'polarArea') {
                    return {
                        ...dataset,
                        data: dataset.data.filter((_, index) => index !== labelIndex), // 데이터 삭제
                        backgroundColor: dataset.backgroundColor.filter((_, index) => index !== labelIndex), // 배경색 삭제
                    };
                } else if (chartInstance.type === 'radar') {
                    return {
                        ...dataset,
                        data: dataset.data.filter((_, index) => index !== labelIndex), // 데이터 삭제
                    };
                } else {
                    return dataset;
                }




            }),
        },
    };

    setChartInstance(newChartInstance);
};

// 차트 데이터셋 추가
export const handleAddDataset = (setChartInstance, chartInstance, chartType) => {
    if (!chartInstance) return;

    if (chartInstance.data.datasets.length >= 10) {
        alert('데이터셋은 최대 10개까지 추가할 수 있습니다.');
        return;
    }

    // 스택 활성화 여부 확인
    const isStacked = chartInstance.options?.scales?.x?.stacked && chartInstance.options?.scales?.y?.stacked;

    let newDataset = {};

    // 차트 타입별로 newDataset을 다르게 설정
    if (chartType === 'bar') {
        newDataset = {
            label: `Dataset ${chartInstance.data.datasets.length + 1}`,
            data: Array(chartInstance.data.labels.length).fill([0, 10]),
            backgroundColor: Array(chartInstance.data.labels.length).fill(
                `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`
            ),
            borderColor: Array(chartInstance.data.labels.length).fill(
                `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`
            ),
            borderWidth: 1,
            borderRadius: 0,
            order: 0,
            borderSkipped: false,
            ...(isStacked ? { stack: 'Stack 0' } : {}), // 스택 활성화 시 stack 추가
        };
    } else if (chartType === 'line') {
        newDataset = {
            label: `Dataset ${chartInstance.data.datasets.length + 1}`,
            data: Array(chartInstance.data.labels.length).fill(10), // 기본값 10으로 초기화
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0,
            fill: false,
            stepped: false,
            order: 0,
            // pointStyle: Array(chartInstance.data.labels.length).fill('circle'),
            // pointRadius: Array(chartInstance.data.labels.length).fill(10),
            // pointHoverRadius: Array(chartInstance.data.labels.length).fill(15),
        };
    } else if (chartType === 'pie' || chartType === 'doughnut') {
        newDataset = {
            data: Array(chartInstance.data.labels.length).fill(10), // 기본값 10으로 초기화
            backgroundColor: chartInstance.data.labels.map(() =>
                `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`
            ),
        };
    } else if (chartType === 'polarArea') {
        newDataset = {
            data: Array(chartInstance.data.labels.length).fill(10), // 기본값 10으로 초기화
            backgroundColor: chartInstance.data.labels.map(() =>
                `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`
            ),
        };
    } else if (chartType === 'radar') {
        newDataset = {
            label: `Dataset ${chartInstance.data.datasets.length + 1}`,
            data: Array(chartInstance.data.labels.length).fill(10), // 기본값 10으로 초기화
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            order: 0,
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

// 차트 데이터셋 제거
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

