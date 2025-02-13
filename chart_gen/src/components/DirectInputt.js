import React, { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { screenState, chartInstanceState, uploadedDataState } from '../recoil/atoms';
import { initChart, handleDataChange } from '../utils/utils';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Collapse } from 'react-bootstrap';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import DoughnutChart from '../components/DoughnutChart';

// Chart.js 구성 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle);


function DirectInputt() {
    const setScreen = useSetRecoilState(screenState);
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);
    const [activeSection, setActiveSection] = useState('chart');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [uploadedData, setUploadedData] = useRecoilState(uploadedDataState);

    console.log(uploadedData);

    // 차트 종류 선택 (ChartRenderer)
    // const handleChartType = (chartType) => {
    //     const options = initChart(chartType);
    //     setChartInstance(options);
    // };

    const handleChartType = (chartType) => {
        let options = initChart(chartType);
        setChartInstance(options); // 먼저 초기 차트 설정
    
        if (uploadedData) {
            setChartInstance(prevChart => ({
                ...prevChart,
                data: {
                    ...prevChart.data,
                    labels: uploadedData.labels, // 모든 차트의 라벨 덮어씌우기
                    datasets: prevChart.data.datasets.map((dataset, index) => {
                        const newDataset = {
                            ...dataset,
                            data: uploadedData.datasets[index]?.data || dataset.data, // 데이터 덮어씌우기
                            backgroundColor: Array.from({ length: uploadedData.labels.length }, (_, i) => 
                                dataset.backgroundColor[i] || 'rgba(255, 99, 132, 0.2)'
                            ),
                        };
    
                        // bar, line 차트는 label, borderColor, borderWidth도 업데이트
                        if (chartType === 'bar' || chartType === 'line') {
                            newDataset.label = uploadedData.datasets[index]?.label || dataset.label;
                            newDataset.borderColor = Array.from({ length: uploadedData.labels.length }, (_, i) => 
                                dataset.borderColor?.[i] || 'rgba(255, 99, 132, 0.2)'
                            );
                            newDataset.borderWidth = dataset.borderWidth; // initChart 초기값 유지
                        }
    
                        return newDataset;
                    }),
                },
            }));
        }
    };
    

    

    // 라벨 추가
    const handleAddLabel = () => {
        if (!chartInstance) return;
        if (chartInstance.data.labels.length >= 10) {
            alert('데이터셋은 최대 10개까지 추가할 수 있습니다.');
            return;
        }
    
        const newLabel = `라벨 ${chartInstance.data.labels.length + 1}`;
        const newChartInstance = {
            ...chartInstance,
            data: {
                ...chartInstance.data,
                labels: [...chartInstance.data.labels, newLabel],
                datasets: chartInstance.data.datasets.map(dataset => {
                    // 차트 유형에 따른 분기
                    if (chartInstance.type === 'bar' || chartInstance.type === 'line') {
                        return {
                            ...dataset,
                            data: [...dataset.data, 10],
                            backgroundColor: [...dataset.backgroundColor, 'rgba(255, 99, 132, 0.2)'],
                            borderColor: [...dataset.borderColor, 'rgba(255, 99, 132, 0.2)'],
                            borderWidth: 1,
                        };
                    } else if (chartInstance.type === 'pie' || chartInstance.type === 'doughnut') {
                        return {
                            ...dataset,
                            data: [...dataset.data, 10],
                            backgroundColor: [...dataset.backgroundColor, 'rgba(255, 99, 132, 0.2)'],
                        };
                    } else {
                        return dataset;
                    }
                }),
            },
        };
    
        setChartInstance(newChartInstance);
    };

    // 라벨 제거
    const handleRemoveLabel = (labelIndex) => {
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
                    if (chartInstance.type === 'bar' || chartInstance.type === 'line') {
                        return {
                            ...dataset,
                            data: dataset.data.filter((_, index) => index !== labelIndex), // 데이터 삭제
                            backgroundColor: dataset.backgroundColor.filter((_, index) => index !== labelIndex), // 배경색 삭제
                            borderColor: dataset.borderColor.filter((_, index) => index !== labelIndex), // 테두리 색 삭제
                        };
                    } else if (chartInstance.type === 'pie' || chartInstance.type === 'doughnut') {
                        return {
                            ...dataset,
                            data: dataset.data.filter((_, index) => index !== labelIndex), // 데이터 삭제
                            backgroundColor: dataset.backgroundColor.filter((_, index) => index !== labelIndex), // 배경색 삭제
                        };
                    } else {
                        return dataset;
                    }
                }),
            },
        };

        setChartInstance(newChartInstance);
    };

    

    return (
        <div className='main'>
            <div className="top_title_box n2">
                <button className='custom-btn custom-back btn btn-secondary' onClick={() => setScreen('main')}>뒤로가기</button>
                <strong className='title'>직접 입력</strong>
                <div className='right_item d-flex gap-1'>
                </div>
            </div>
            <div className="chart_wrap">
                <div 
                    id="chart_setting"
                    className={`input_wrap w3-sidebar w3-bar-block w3-card w3-animate-left`}
                    style={{
                        display: isSidebarOpen ? "block" : "none",
                        width: isSidebarOpen ? "50%" : "0"
                    }}
                >

                    <div className='card'>
                        <div className='card-header'>
                            <button
                                type='button'
                                className="title"
                                aria-controls="chart-setting-default"
                            >
                                차트 설정
                            </button>
                        </div>
                        <Collapse in={activeSection === 'chart'}>
                            <div id="chart-setting-default" className="card-body">
                                <div className="input_item select_type input-group">
                                    <div className="label_text input-group-text col-lg-2">종류</div>
                                    <div className='set_box form-control col-lg-10'>
                                        <button className='btn btn-secondary' onClick={() => handleChartType('bar')}>Bar Chart</button>
                                        <button className='btn btn-secondary' onClick={() => handleChartType('line')}>Line Chart</button>
                                        <button className='btn btn-secondary' onClick={() => handleChartType('pie')}>Pie Chart</button>
                                        <button className='btn btn-secondary' onClick={() => handleChartType('doughnut')}>Doughnut Chart</button>
                                    </div>
                                </div>
                                <div className='input_item set_dataset input-group'>
                                    <div className="label_text input-group-text col-lg-2">라벨 & <br />데이터셋</div>
                                    <div className="set_box form-control col-lg-10">
                                        <div className='label_box'>
                                            {chartInstance ? (
                                                <>
                                                    <button className='btn btn-primary btn_add' onClick={handleAddLabel}>라벨 추가</button>
                                                    <div className='sticky-top'>
                                                        {chartInstance.data.labels.map((label, index) => (
                                                            <div className='input-group' key={index}>
                                                                <input
                                                                    type="text"
                                                                    value={label}
                                                                    className='form-control'
                                                                    onChange={(e) => handleDataChange(setChartInstance,'labels', 0,index, e.target.value)}
                                                                />
                                                                <button className="btn btn-success" type="button" onClick={() => handleRemoveLabel(index)}>X</button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : (
                                                <p>차트 타입을 선택해주세요.</p>
                                            )}
                                        </div>
                                        {chartInstance && chartInstance.type === 'bar' && <BarChart />}
                                        {chartInstance && chartInstance.type === 'line' && <LineChart />}
                                        {chartInstance && chartInstance.type === 'pie' && <PieChart />}
                                        {chartInstance && chartInstance.type === 'doughnut' && <DoughnutChart />}
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>

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

                    {chartInstance ? (
                        <div className='chart_rendering'>
                            <Chart
                                type={chartInstance.type}
                                data={chartInstance.data}
                                options={chartInstance.options}
                            />
                        </div>
                    ) : (
                        <div className='chart_option_none'>
                            <p>차트 옵션을 설정 후 저장을 클릭하세요</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};


export default DirectInputt;
