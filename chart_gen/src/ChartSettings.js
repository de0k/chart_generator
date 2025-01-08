import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { rgbaToHex, hexToRgba } from './utils';

function ChartSettings({ 
    activeChart, setActiveChart, 
    labels, setLabels, 
    innerdata, setInnerdata, 
    backgroundColors, setBackgroundColors, 
    borderColors, setBorderColors, 
    borderWidth, setBorderWidth, 
    datasetLabels, setDatasetLabels, 
    activeTab, setActiveTab, 
    activeSection, toggleSection 
}) {
    const handleChartDataChange = (chartData, setChartData, index, value) => {
        const updatedChartData = [...chartData];
        updatedChartData[index] = value;
        setChartData(updatedChartData);
    };

    return (
        <div className='card'>
            <div className='card-header'>
                <a
                    href="#"
                    className="title"
                    onClick={(e) => {
                        e.preventDefault();
                        toggleSection('chart');
                    }}
                    aria-controls="chart-setting-default"
                    aria-expanded={activeSection === 'chart'}
                >
                    차트 설정
                </a>
            </div>
            <Collapse in={activeSection === 'chart'}>
                <div id="chart-setting-default" className="card-body">
                    <div className="input_item select_type input-group row">
                        <div className="label_text input-group-text col-lg-2">종류</div>
                        <div className='set_box form-control col-lg-10'>
                            <button onClick={() => setActiveChart('Bar')}>Bar Chart</button>
                            <button onClick={() => setActiveChart('Line')}>Line Chart</button>
                            <button onClick={() => setActiveChart('Pie')}>Pie Chart</button>
                        </div>
                    </div>
                    <div className='input_item set_label input-group row'>
                        <div className="label_text input-group-text col-lg-2">라벨</div>
                        <div className="set_box form-control col-lg-10">
                            {activeChart === '' ? (
                                <p>차트 타입을 선택해주세요.</p>
                            ) : (
                                <>
                                    {labels.map((label, index) => (
                                        <div key={index}>
                                            <input
                                                type="text"
                                                value={label}
                                                onChange={(e) => handleChartDataChange(labels, setLabels, index, e.target.value)}
                                            />
                                            <button>X</button>
                                        </div>
                                    ))}
                                    <button>라벨 추가</button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='input_item set_dataset input-group row'>
                        <div className="label_text input-group-text col-lg-2">데이터셋</div>
                        <div className="set_box form-control col-lg-10">
                            {activeChart === '' ? (
                                <p>차트 타입을 선택해주세요.</p>
                            ) : (
                                <>
                                    <div>
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
                                                <div className="container tab-pane active">
                                                    <>
                                                        {innerdata.map((data, index) => (
                                                            <div key={index}>
                                                                <input
                                                                    type="text"
                                                                    value={data}
                                                                    onChange={(e) => handleChartDataChange(innerdata, setInnerdata, index, e.target.value)}
                                                                />
                                                                <button>X</button>
                                                            </div>
                                                        ))}
                                                        <button>데이터 추가</button>
                                                    </>
                                                </div>
                                            )}
                                            {activeTab === 'option' && (
                                                <div className="container tab-pane active">
                                                    <div>
                                                        <div className="label_text">데이터셋명</div>
                                                        <input
                                                            type="text"
                                                            value={datasetLabels}
                                                            onChange={(e) => handleChartDataChange(datasetLabels, setDatasetLabels, 0, e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="label_text">backgroundColors</div>
                                                        {labels.map((label, index) => (
                                                            <div key={index}>
                                                                {label}:
                                                                <input
                                                                    type="color"
                                                                    value={rgbaToHex(backgroundColors[index])}
                                                                    onChange={(e) => {
                                                                        const updatedColor = hexToRgba(e.target.value);
                                                                        handleChartDataChange(backgroundColors, setBackgroundColors, index, updatedColor);
                                                                    }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div>
                                                        <div className="label_text">borderColors</div>
                                                        {labels.map((label, index) => (
                                                            <div key={index}>
                                                                {label}:
                                                                <input
                                                                    type="color"
                                                                    value={rgbaToHex(borderColors[index])}
                                                                    onChange={(e) => {
                                                                        const updatedColor = hexToRgba(e.target.value);
                                                                        handleChartDataChange(borderColors, setBorderColors, index, updatedColor);
                                                                    }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div>
                                                        <div className="label_text">borderWidth</div>
                                                        <select
                                                            value={borderWidth}
                                                            onChange={(e) => setBorderWidth(Number(e.target.value))}
                                                        >
                                                            {[1, 2, 3, 4, 5].map((value) => (
                                                                <option key={value} value={value}>
                                                                    {value}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button>데이터셋 추가</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>
    );
}

export default ChartSettings;