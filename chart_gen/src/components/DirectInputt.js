import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { screenState } from '../recoil/atoms';

import { initChart, rgbaToHex, hexToRgba } from '../utils/utils';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle } from 'chart.js';

import { Chart } from 'react-chartjs-2';

import { Collapse } from 'react-bootstrap';

// Chart.js 구성 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle);


function DirectInputt() {
    const setScreen = useSetRecoilState(screenState);
    const [chartInstance, setChartInstance] = useState(null);
    const [activeSection, setActiveSection] = useState('chart');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('data');
    

    // useEffect(() => {
    //     const options = initChart('bar');
    //     setChartInstance(options);
    // }, []);

    // 차트 종류 선택 (ChartRenderer)
    const handleChartType = (chartType) => {
        const options = initChart(chartType);
        setChartInstance(options);
    };

    const handleLabelChange = (index, newValue) => {
        setChartInstance(prevState => {
            const updatedLabels = [...prevState.data.labels];
            updatedLabels[index] = newValue;

            return {
                ...prevState,
                data: {
                    ...prevState.data,
                    labels: updatedLabels
                }
            };
        });
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
                                                    <button className='btn btn-primary btn_add'>라벨 추가</button>
                                                    <div className='sticky-top'>
                                                        {chartInstance.data.labels.map((label, index) => (
                                                            <div className='input-group' key={index}>
                                                                <input
                                                                    type="text"
                                                                    value={label}
                                                                    className='form-control'
                                                                    onChange={(e) => handleLabelChange(index, e.target.value)}
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
                                        <div className='datasets_box'>
                                            {chartInstance ? (
                                                <>
                                                    <button className='btn btn-primary btn_add'>데이터셋 추가</button>
                                                    <div className='tab_wrap'>
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
                                                                <div className="tab-pane active">
                                                                    {chartInstance.data.datasets.map((dataset, datasetIndex) => (
                                                                        <div className='data_box inner_box' key={datasetIndex}>
                                                                            <div className='input-group'>
                                                                                <input
                                                                                    type="text"
                                                                                    value={dataset.label}
                                                                                    className='form-control'
                                                                                />
                                                                                <button className="btn btn-success" type="button">X</button>
                                                                            </div>
                                                                            <div className='data_inner'>
                                                                                {dataset.data.map((data, index) => (
                                                                                    <div className='form-floating' key={index}>
                                                                                        <input
                                                                                            type="text"
                                                                                            className='form-control'
                                                                                            placeholder={chartInstance.data.labels[index]}
                                                                                            value={data}
                                                                                        />
                                                                                        <label htmlFor={chartInstance.data.labels[index]}>{chartInstance.data.labels[index]}</label>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            {activeTab === 'option' && (
                                                                <div className="tab-pane active">
                                                                    {chartInstance.data.datasets.map((dataset, datasetIndex) => (
                                                                        <div className='option_box inner_box' key={`dataset-${datasetIndex}`}>
                                                                            <div className='input-group'>
                                                                                <input
                                                                                    type="text"
                                                                                    value={dataset.label}
                                                                                    className='form-control'
                                                                                />
                                                                                <button className="btn btn-success" type="button">X</button>
                                                                            </div>
                                                                            <div className='option_inner'>
                                                                                <div className='input-group'>
                                                                                    {dataset.backgroundColor.map((bg, index) => (
                                                                                        <>
                                                                                            <label htmlFor={`bgc-${index}`} className='input-group-text'>Background Color</label>
                                                                                            <input
                                                                                                type="color"
                                                                                                className="form-control form-control-color"
                                                                                                id={`bgc-${index}`}
                                                                                                value={rgbaToHex(bg)}
                                                                                            />
                                                                                        </>
                                                                                    ))}
                                                                                </div>
                                                                                <div className='input-group'>
                                                                                    {dataset.borderColor.map((bd, index) => (
                                                                                        <>
                                                                                            <label htmlFor={`bdc-${index}`} className='input-group-text'>Border Color</label>
                                                                                            <input
                                                                                                type="color"
                                                                                                className="form-control form-control-color"
                                                                                                id={`bdc-${index}`}
                                                                                                value={rgbaToHex(bd)}
                                                                                            />
                                                                                        </>
                                                                                    ))}
                                                                                </div>
                                                                                <div className='form-floating'>
                                                                                    <select
                                                                                        id={`bdw-${datasetIndex}`}
                                                                                        className='form-select'
                                                                                        value={dataset.borderWidth}
                                                                                    >
                                                                                        {[1, 2, 3, 4, 5].map((width) => (
                                                                                            <option key={width} value={width}>{width}</option>
                                                                                        ))}
                                                                                    </select>
                                                                                    <label htmlFor={`bdw-${datasetIndex}`}>Border Width: </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
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
