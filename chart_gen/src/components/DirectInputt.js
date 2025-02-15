import React, { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { screenState, chartInstanceState, uploadedDataState } from '../recoil/atoms';
import { handleChartType, handleDataChange, handleAddLabel, handleRemoveLabel } from '../utils/utils';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Collapse } from 'react-bootstrap';
import DataBarChart from './DataBarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import DoughnutChart from './DoughnutChart';
import OptionsBarChart from './OptionsBarChart';

// Chart.js 구성 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle);

function DirectInputt() {
    const setScreen = useSetRecoilState(screenState);
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);
    const [activeSection, setActiveSection] = useState('chart');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [uploadedData, setUploadedData] = useRecoilState(uploadedDataState);

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
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection('chart');
                                }}
                                aria-controls="chart-setting-default"
                                aria-expanded={activeSection === 'chart'}
                            >
                                차트 설정
                            </button>
                        </div>
                        <Collapse in={activeSection === 'chart'}>
                            <div id="chart-setting-default" className="card-body">
                                <div className="input_item select_type input-group">
                                    <div className="label_text input-group-text col-lg-2">종류</div>
                                    <div className='set_box form-control col-lg-10'>
                                        <button className='btn btn-secondary' onClick={() => handleChartType('bar', setChartInstance, uploadedData)}>Bar Chart</button>
                                        <button className='btn btn-secondary' onClick={() => handleChartType('line', setChartInstance, uploadedData)}>Line Chart</button>
                                        <button className='btn btn-secondary' onClick={() => handleChartType('pie', setChartInstance, uploadedData)}>Pie Chart</button>
                                        <button className='btn btn-secondary' onClick={() => handleChartType('doughnut', setChartInstance, uploadedData)}>Doughnut Chart</button>
                                    </div>
                                </div>
                                <div className='input_item set_dataset input-group'>
                                    <div className="label_text input-group-text col-lg-2">라벨 & <br />데이터셋</div>
                                    <div className="set_box form-control col-lg-10">
                                        <div className='label_box'>
                                            {chartInstance ? (
                                                <>
                                                    <button className='btn btn-primary btn_add' onClick={() => handleAddLabel(chartInstance, setChartInstance)}>라벨 추가</button>
                                                    <div className='sticky-top'>
                                                        {chartInstance.data.labels.map((label, index) => (
                                                            <div className='input-group' key={index}>
                                                                <input
                                                                    type="text"
                                                                    value={label}
                                                                    className='form-control'
                                                                    onChange={(e) => handleDataChange(setChartInstance, 'labels', 0, index, e.target.value)}
                                                                />
                                                                <button className="btn btn-success" type="button" onClick={() => handleRemoveLabel(chartInstance, setChartInstance, index)}>X</button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : (
                                                <p>차트 타입을 선택해주세요.</p>
                                            )}
                                        </div>
                                        {chartInstance && chartInstance.type === 'bar' && <DataBarChart />}
                                        {chartInstance && chartInstance.type === 'line' && <LineChart />}
                                        {chartInstance && chartInstance.type === 'pie' && <PieChart />}
                                        {chartInstance && chartInstance.type === 'doughnut' && <DoughnutChart />}
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <button
                                type='button'
                                className="title"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection('more');
                                }}
                                aria-controls="chart-setting-more"
                                aria-expanded={activeSection === 'more'}
                            >
                                추가 설정
                            </button>
                        </div>
                        <Collapse in={activeSection === 'more'}>
                            <div id="chart-setting-more" className="card-body">
                                <div className="input_item input-group">
                                </div>
                                <div className="input_item input-group">
                                    {chartInstance && chartInstance.type === 'bar' && <OptionsBarChart />}   
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
