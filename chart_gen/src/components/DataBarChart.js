import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState, activeTabState } from '../recoil/atoms';
import { rgbaToHex, handleDataChange, hexToRgba, handleAddDataset, handleRemoveDataset } from '../utils/utils';

function DataBarChart() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);
    const [activeTab, setActiveTab] = useRecoilState(activeTabState);

    return (
        <div className='datasets_box'>
            <>
                <button className='btn btn-primary btn_add' onClick={() => handleAddDataset(setChartInstance, chartInstance, 'bar')}>데이터셋 추가</button>
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
                                                    <div className="d-flex">
                                                        <label htmlFor={chartInstance.data.labels[index]}>{chartInstance.data.labels[index]}</label>
                                                        {/* Min 값 입력 */}
                                                        <input
                                                            type="text"
                                                            className='form-control me-2'
                                                            placeholder={`Min ${chartInstance.data.labels[index]}`}
                                                            value={data[0]}
                                                            onChange={(e) =>
                                                                handleDataChange(setChartInstance, 'data', datasetIndex, index, [Number(e.target.value), data[1]], true)}
                                                        />
                                                        {/* Max 값 입력 */}
                                                        <input
                                                            type="text"
                                                            className='form-control'
                                                            placeholder={`Max ${chartInstance.data.labels[index]}`}
                                                            value={data[1]}
                                                            onChange={(e) =>
                                                                handleDataChange(setChartInstance, 'data', datasetIndex, index, [data[0], Number(e.target.value)], true)}
                                                        />
                                                    </div>
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
                                            {dataset.backgroundColor.map((bg, index) => (
                                                <div>
                                                    <div>{chartInstance.data.labels[index]}</div>
                                                    <div className='input-group'>
                                                        <label htmlFor={`bgc-${index}`} className='input-group-text'>Background Color</label>
                                                        <input
                                                            type="color"
                                                            className="form-control form-control-color"
                                                            id={`bgc-${index}`}
                                                            value={rgbaToHex(bg)}
                                                            onChange={(e) => handleDataChange(setChartInstance, 'backgroundColor', datasetIndex, index, hexToRgba(e.target.value))}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            {dataset.borderColor.map((bd, index) => (
                                                <div>
                                                    <div>{chartInstance.data.labels[index]}</div>
                                                    <div className='input-group'>
                                                        <label htmlFor={`bdc-${index}`} className='input-group-text'>Border Color</label>
                                                        <input
                                                            type="color"
                                                            className="form-control form-control-color"
                                                            id={`bdc-${index}`}
                                                            value={rgbaToHex(bd)}
                                                            onChange={(e) => handleDataChange(setChartInstance, 'borderColor', datasetIndex, index, hexToRgba(e.target.value))}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            <div className='form-floating'>
                                                <select
                                                    id={`bdw-${datasetIndex}`}
                                                    className='form-select'
                                                    value={dataset.borderWidth}
                                                    onChange={(e) => handleDataChange(setChartInstance, 'borderWidth', datasetIndex, 0, e.target.value)}
                                                >
                                                    {[0, 1, 2, 3, 4, 5].map((width) => (
                                                        <option key={width} value={width}>{width}</option>
                                                    ))}
                                                </select>
                                                <label htmlFor={`bdw-${datasetIndex}`}>Border Width: </label>
                                            </div>
                                            <div className='form-floating'>
                                                <input
                                                    id={`bdw-${datasetIndex}`}
                                                    type="number"
                                                    value={dataset.borderRadius}
                                                    className='form-control'
                                                    onChange={(e) => handleDataChange(setChartInstance, 'borderRadius', datasetIndex, 0, e.target.value)}
                                                />
                                                <label htmlFor={`bdw-${datasetIndex}`}>Border Radius: </label>
                                            </div>
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


export default DataBarChart;