import React from 'react';
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
        setDatasetLabels([...datasetLabels, `데이터셋 ${datasetLabels.length + 1}번`]);
        setInnerdata([...innerdata, new Array(labels.length).fill(10)]);
        setBackgroundColors([...backgroundColors, 'rgba(255, 99, 132, 0.6)']);
        setBorderColors([...borderColors, 'rgba(54, 162, 235, 1)']);
        setBorderWidth([...borderWidth, 1]);
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
                                                <div className="container tab-pane active">
                                                    {innerdata.map((dataSet, datasetIndex) => (
                                                        <div key={datasetIndex}>
                                                            <strong>{datasetLabels[datasetIndex]}</strong>
                                                            {dataSet.map((data, index) => (
                                                                <div key={index}>
                                                                    {labels[index]}: 
                                                                    <input
                                                                        type="text"
                                                                        value={data}
                                                                        onChange={(e) => handleChartDataChange(innerdata[datasetIndex], (updatedData) => {
                                                                            const newInnerData = [...innerdata];
                                                                            newInnerData[datasetIndex] = updatedData;
                                                                            setInnerdata(newInnerData);
                                                                        }, index, e.target.value)}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {activeTab === 'option' && (
                                                <div className="container tab-pane active">
                                                    {datasetLabels.map((label, datasetIndex) => (
                                                        <div key={datasetIndex}>
                                                            <div className="label_text">{label}</div>
                                                            <div>
                                                                <label>Background Color: </label>
                                                                <input
                                                                    type="color"
                                                                    value={rgbaToHex(backgroundColors[datasetIndex])}
                                                                    onChange={(e) => handleChartDataChange(backgroundColors, setBackgroundColors, datasetIndex, hexToRgba(e.target.value))}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label>Border Color: </label>
                                                                <input
                                                                    type="color"
                                                                    value={rgbaToHex(borderColors[datasetIndex])}
                                                                    onChange={(e) => handleChartDataChange(borderColors, setBorderColors, datasetIndex, hexToRgba(e.target.value))}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label>Border Width: </label>
                                                                <select
                                                                    value={borderWidth[datasetIndex]}
                                                                    onChange={(e) => handleChartDataChange(borderWidth, setBorderWidth, datasetIndex, parseInt(e.target.value))}
                                                                >
                                                                    {[1, 2, 3, 4, 5].map((width) => (
                                                                        <option key={width} value={width}>{width}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button onClick={handleAddDataset}>데이터셋 추가</button>
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
