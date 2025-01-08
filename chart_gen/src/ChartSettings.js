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
    // 차트 데이터 핸들링
    const handleChartDataChange = (chartData, setChartData, index, value) => {
        const updatedChartData = [...chartData];
        updatedChartData[index] = value;
        setChartData(updatedChartData);
    };

    // 라벨 추가
    const handleAddLabel = () => {
        if (labels.length >= 30) {
            alert('라벨은 최대 30개까지 추가할 수 있습니다.');
            return;
        }
        setLabels([...labels, `라벨 ${labels.length + 1}`]);
        setInnerdata([...innerdata, 0]);
        setBackgroundColors([...backgroundColors, 'rgba(0, 0, 0, 0.1)']);
        setBorderColors([...borderColors, 'rgba(0, 0, 0, 1)']);
    };

    // 라벨 제거
    const handleRemoveLabel = (index) => {
        if (labels.length <= 1) {
            alert('라벨은 최소 1개 이상이어야 합니다.');
            return;
        }
        const updatedLabels = labels.filter((_, i) => i !== index);
        const updatedInnerdata = innerdata.filter((_, i) => i !== index);
        const updatedBackgroundColors = backgroundColors.filter((_, i) => i !== index);
        const updatedBorderColors = borderColors.filter((_, i) => i !== index);

        setLabels(updatedLabels);
        setInnerdata(updatedInnerdata);
        setBackgroundColors(updatedBackgroundColors);
        setBorderColors(updatedBorderColors);
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
                                            <button onClick={() => handleRemoveLabel(index)}>X</button>
                                        </div>
                                    ))}
                                    <button onClick={handleAddLabel}>라벨 추가</button>
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