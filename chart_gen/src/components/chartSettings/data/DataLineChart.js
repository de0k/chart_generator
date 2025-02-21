import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState, activeTabState } from '../../../recoil/atoms';
import { rgbaToHex, handleDataChange, hexToRgba, handleAddDataset, handleRemoveDataset } from '../../../utils/utils';

function DataLineChart() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);
    const [activeTab, setActiveTab] = useRecoilState(activeTabState);

    return (
        <div className='datasets_box'>
            <>
                <button className='btn btn-primary btn_add' onClick={() => handleAddDataset(setChartInstance, chartInstance, 'line')}>데이터셋 추가</button>
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
                                                onChange={(e) => handleDataChange(setChartInstance, 'datasetsLabel', datasetIndex, 0, e.target.value)}
                                            />
                                            <button className="btn btn-success" type="button" onClick={() => handleRemoveDataset(setChartInstance, chartInstance, datasetIndex)}>X</button>
                                        </div>
                                        <div className='data_inner'>
                                            {dataset.data.map((data, index) => (
                                                <div className='form-floating' key={index}>
                                                    <input
                                                        type="text"
                                                        className='form-control'
                                                        placeholder={chartInstance.data.labels[index]}
                                                        value={data}
                                                        onChange={(e) => handleDataChange(setChartInstance, 'data', datasetIndex, index, e.target.value)}
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
                                                onChange={(e) => handleDataChange(setChartInstance, 'datasetsLabel', datasetIndex, 0, e.target.value)}
                                            />
                                            <button className="btn btn-success" type="button" onClick={() => handleRemoveDataset(setChartInstance, chartInstance, datasetIndex)}>X</button>
                                        </div>
                                        <div className='option_inner'>
                                            <div className='input-group'>
                                                <label htmlFor={`bgc-${datasetIndex}`} className='input-group-text'>Background Color</label>
                                                <input
                                                    type="color"
                                                    className="form-control form-control-color"
                                                    id={`bgc-${datasetIndex}`}
                                                    value={rgbaToHex(dataset.backgroundColor)}
                                                    onChange={(e) => handleDataChange(setChartInstance, 'backgroundColor_1', datasetIndex, 0, hexToRgba(e.target.value))}
                                                />
                                            </div>
                                            <div className='input-group'>
                                                <label htmlFor={`bdc-${datasetIndex}`} className='input-group-text'>Border Color</label>
                                                <input
                                                    type="color"
                                                    className="form-control form-control-color"
                                                    id={`bdc-${datasetIndex}`}
                                                    value={rgbaToHex(dataset.borderColor)}
                                                    onChange={(e) => handleDataChange(setChartInstance, 'borderColor_1', datasetIndex, 0, hexToRgba(e.target.value))}
                                                />
                                            </div>
                                            <div className='input-group'>
                                                <label htmlFor={`ten-${datasetIndex}`} className='input-group-text'>tension</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-color"
                                                    id={`ten-${datasetIndex}`}
                                                    value={dataset.tension}
                                                    onChange={(e) => handleDataChange(setChartInstance, 'tension', datasetIndex, 0, e.target.value)}
                                                />
                                            </div>
                                            <div className='input-group'>
                                                <label htmlFor={`steppedSwitch-${datasetIndex}`} className='input-group-text'>stepped</label>
                                                <div className="form-control form-check form-switch">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`steppedSwitch-${datasetIndex}`}
                                                        checked={dataset.stepped || false}
                                                        onChange={(event) => handleDataChange(setChartInstance, 'stepped', datasetIndex, 0, event.target.checked)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-floating'>
                                                <select
                                                    id={`fillSwitch-${datasetIndex}`}
                                                    className='form-select'
                                                    value={dataset.fill}
                                                    onChange={(e) => handleDataChange(setChartInstance, 'fill', datasetIndex, 0, e.target.value)}
                                                >
                                                    {['false', 'origin', 'start', 'end'].map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                                <label htmlFor={`fillSwitch-${datasetIndex}`}>fill: </label>
                                            </div>
                                            <div className='form-floating'>
                                                <input
                                                    id={`order-${datasetIndex}`}
                                                    type="number"
                                                    value={dataset.order}
                                                    className='form-control'
                                                    onChange={(e) => handleDataChange(setChartInstance, 'order', datasetIndex, 0, e.target.value)}
                                                />
                                                <label htmlFor={`order-${datasetIndex}`}>order: </label>
                                            </div>
                                            {/* {dataset.pointStyle.map((ps, index) => (
                                                <div>
                                                    <div>{chartInstance.data.labels[index]}</div>
                                                    <div className='input-group'>
                                                        <label htmlFor={`ps-${index}`} className='input-group-text'>pointStyle</label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-color"
                                                            id={`ps-${index}`}
                                                            value={ps}
                                                            onChange={(e) => handleDataChange(setChartInstance, 'datasets_pointStyle', datasetIndex, index, e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            {dataset.pointRadius.map((pr, index) => (
                                                <div>
                                                    <div>{chartInstance.data.labels[index]}</div>
                                                    <div className='input-group'>
                                                        <label htmlFor={`pr-${index}`} className='input-group-text'>pointRadius</label>
                                                        <input
                                                            type="number"
                                                            className="form-control form-control-color"
                                                            id={`pr-${index}`}
                                                            value={pr}
                                                            onChange={(e) => handleDataChange(setChartInstance, 'datasets_pointRadius', datasetIndex, index, e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            {dataset.pointHoverRadius.map((phr, index) => (
                                                <div>
                                                    <div>{chartInstance.data.labels[index]}</div>
                                                    <div className='input-group'>
                                                        <label htmlFor={`phr-${index}`} className='input-group-text'>pointHoverRadius</label>
                                                        <input
                                                            type="number"
                                                            className="form-control form-control-color"
                                                            id={`phr-${index}`}
                                                            value={phr}
                                                            onChange={(e) => handleDataChange(setChartInstance, 'datasets_pointHoverRadius', datasetIndex, index, e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            ))} */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </>
        </div>
    );
};


export default DataLineChart;