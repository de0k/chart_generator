import React, { useState, useEffect } from 'react';

import { getDefaultChartOptions } from '../utils/utils';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle } from 'chart.js';

import { Chart } from 'react-chartjs-2';

import { Collapse } from 'react-bootstrap';

// Chart.js 구성 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle);


function DirectInputt({ onBack }) {
    const [chartOptions, setChartOptions] = useState(null);
    const [activeSection, setActiveSection] = useState('chart');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);


    // useEffect(() => {
    //     const options = getDefaultChartOptions('bar');
    //     setChartOptions(options);
    // }, []);

    // 차트 종류 선택 (ChartRenderer)
    const handleChart = (chartName) => {
        const options = getDefaultChartOptions(chartName);
        setChartOptions(options);
    };

    return (
        <div className='main'>
            <div className="top_title_box n2">
                <button className='custom-btn custom-back btn btn-secondary' onClick={onBack}>뒤로가기</button>
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
                                        <button className='btn btn-secondary' onClick={() => handleChart('bar')}>Bar Chart</button>
                                        <button className='btn btn-secondary' onClick={() => handleChart('line')}>Line Chart</button>
                                        <button className='btn btn-secondary' onClick={() => handleChart('pie')}>Pie Chart</button>
                                        <button className='btn btn-secondary' onClick={() => handleChart('doughnut')}>Doughnut Chart</button>
                                    </div>
                                </div>
                                <div className='input_item set_dataset input-group'>
                                    <div className="label_text input-group-text col-lg-2">라벨 & <br />데이터셋</div>
                                    <div className="set_box form-control col-lg-10">
                                        <div className='label_box'>
                                            {chartOptions && chartOptions.data ? (
                                                <>
                                                    <button className='btn btn-primary btn_add'>라벨 추가</button>
                                                    <div className='sticky-top'>
                                                        {chartOptions.data.labels.map((label, index) => (
                                                            <div className='input-group' key={index}>
                                                                <input
                                                                    type="text"
                                                                    value={label}
                                                                    className='form-control'
                                                                />
                                                                <button className="btn btn-success" type="button">X</button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : (
                                                <p>차트 타입을 선택해주세요.</p>
                                            )}
                                        </div>
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

                    {chartOptions ? (
                        <div className='chart_rendering'>
                            <Chart
                                type={chartOptions.type}
                                data={chartOptions.data}
                                options={chartOptions.options}
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
