import React from 'react';
import { Collapse } from 'react-bootstrap';
import { rgbaToHex, hexToRgba } from '../utils/utils';

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
    // 데이터 업데이트 함수
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
        setLabels([...labels, `라벨 ${labels.length + 1}번`]);
        setInnerdata(innerdata.map((data) => [...data, 10]));
    };

    // 라벨 제거
    const handleRemoveLabel = (index) => {
        if (labels.length <= 1) {
            alert('라벨은 최소 1개 이상이어야 합니다.');
            return;
        }
        setLabels(labels.filter((_, i) => i !== index));
        setInnerdata(innerdata.map((data) => data.filter((_, i) => i !== index)));
    };

    // 데이터셋 추가
    const handleAddDataset = () => {
        if (datasetLabels.length >= 10) {
            alert('데이터셋은 최대 10개까지 추가할 수 있습니다.');
            return;
        }
        setDatasetLabels([...datasetLabels, `데이터셋 ${datasetLabels.length + 1}번`]);
        setInnerdata([...innerdata, new Array(labels.length).fill(10)]);
        setBackgroundColors([...backgroundColors, 'rgba(255, 99, 132, 0.6)']);
        setBorderColors([...borderColors, 'rgba(54, 162, 235, 1)']);
        setBorderWidth([...borderWidth, 1]);
    };

    // 데이터셋 제거
    const handleRemoveDataset = (index) => {
        if (datasetLabels.length <= 1) {
            alert('데이터셋은 최소 1개 이상이어야 합니다.');
            return;
        }
        setDatasetLabels(datasetLabels.filter((_, i) => i !== index));
        setInnerdata(innerdata.filter((_, i) => i !== index));
        setBackgroundColors(backgroundColors.filter((_, i) => i !== index));
        setBorderColors(borderColors.filter((_, i) => i !== index));
        setBorderWidth(borderWidth.filter((_, i) => i !== index));
    };

    return (
        <div className='card'>
            <div className='card-header'>
                <button
                    type='button'
                    className="title"
                    onClick={(e) => {
                        e.preventDefault();
                        toggleSection('chart');
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
                            <button className='btn btn-secondary' onClick={() => setActiveChart('Bar')}>Bar Chart</button>
                            <button className='btn btn-secondary' onClick={() => setActiveChart('Line')}>Line Chart</button>
                            <button className='btn btn-secondary' onClick={() => setActiveChart('Pie')}>Pie Chart</button>
                            <button className='btn btn-secondary' onClick={() => setActiveChart('Doughnut')}>Doughnut Chart</button>
                        </div>
                    </div>
                    <div className='input_item set_dataset input-group'>
                        <div className="label_text input-group-text col-lg-2">라벨 & <br />데이터셋</div>
                        <div className="set_box form-control col-lg-10">
                            <div className='label_box'>
                                {activeChart === '' ? (
                                    <p>차트 타입을 선택해주세요.</p>
                                ) : (
                                    <>
                                        <button className='btn btn-primary btn_add' onClick={handleAddLabel}>라벨 추가</button>
                                        <div className='sticky-top'>
                                            {labels.map((label, index) => (
                                                <div className='input-group' key={index}>
                                                    <input
                                                        type="text"
                                                        value={label}
                                                        className='form-control'
                                                        onChange={(e) => handleChartDataChange(labels, setLabels, index, e.target.value)}
                                                    />
                                                    <button className="btn btn-success" type="button" onClick={() => handleRemoveLabel(index)}>X</button>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='datasets_box'>
                                {activeChart === '' ? (
                                    <p>차트 타입을 선택해주세요.</p>
                                ) : (
                                    <>
                                        <button className='btn btn-primary btn_add' onClick={handleAddDataset}>데이터셋 추가</button>
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
                                                        {innerdata.map((dataSet, datasetIndex) => (
                                                            <div className='data_box inner_box' key={datasetIndex}>
                                                                <div className='input-group'>
                                                                    <input
                                                                        type="text"
                                                                        value={datasetLabels[datasetIndex]}
                                                                        className='form-control'
                                                                        onChange={(e) => handleChartDataChange(datasetLabels, setDatasetLabels, datasetIndex, e.target.value)}
                                                                    />
                                                                    <button className="btn btn-success" type="button" onClick={() => handleRemoveDataset(datasetIndex)}>X</button>
                                                                </div>
                                                                <div className='data_inner'>
                                                                    {dataSet.map((data, index) => (
                                                                        <div className='form-floating' key={index}>
                                                                            <input
                                                                                type="text"
                                                                                className='form-control'
                                                                                placeholder={labels[index]}
                                                                                value={data}
                                                                                onChange={(e) => handleChartDataChange(innerdata[datasetIndex], (updatedData) => {
                                                                                    const newInnerData = [...innerdata];
                                                                                    newInnerData[datasetIndex] = updatedData;
                                                                                    setInnerdata(newInnerData);
                                                                                }, index, e.target.value)}
                                                                            />
                                                                            <label htmlFor={labels[index]}>{labels[index]}</label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {activeTab === 'option' && (
                                                    <div className="tab-pane active">
                                                        {datasetLabels.map((label, datasetIndex) => (
                                                            <div className='option_box inner_box' key={`dataset-${datasetIndex}`}>
                                                                <div className='input-group'>
                                                                    <input
                                                                        type="text"
                                                                        value={datasetLabels[datasetIndex]}
                                                                        className='form-control'
                                                                        onChange={(e) => handleChartDataChange(datasetLabels, setDatasetLabels, datasetIndex, e.target.value)}
                                                                    />
                                                                    <button className="btn btn-success" type="button" onClick={() => handleRemoveDataset(datasetIndex)}>X</button>
                                                                </div>
                                                                <div className='option_inner'>
                                                                    <div className='input-group'>
                                                                        <label htmlFor={`bgc-${datasetIndex}`} className='input-group-text'>Background Color</label>
                                                                        <input
                                                                            type="color"
                                                                            className="form-control form-control-color"
                                                                            id={`bgc-${datasetIndex}`}
                                                                            value={rgbaToHex(backgroundColors[datasetIndex])}
                                                                            onChange={(e) => handleChartDataChange(backgroundColors, setBackgroundColors, datasetIndex, hexToRgba(e.target.value))}
                                                                        />
                                                                    </div>
                                                                    <div className='input-group'>
                                                                        <label htmlFor={`bdc-${datasetIndex}`} className='input-group-text'>Border Color</label>
                                                                        <input
                                                                            type="color"
                                                                            className="form-control form-control-color"
                                                                            id={`bdc-${datasetIndex}`}
                                                                            value={rgbaToHex(borderColors[datasetIndex])}
                                                                            onChange={(e) => handleChartDataChange(borderColors, setBorderColors, datasetIndex, hexToRgba(e.target.value))}
                                                                        />
                                                                    </div>
                                                                    <div className='form-floating'>
                                                                        <select
                                                                            id={`bdw-${datasetIndex}`}
                                                                            className='form-select'
                                                                            value={borderWidth[datasetIndex]}
                                                                            onChange={(e) => handleChartDataChange(borderWidth, setBorderWidth, datasetIndex, parseInt(e.target.value))}
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>
    );
}

export default ChartSettings;
