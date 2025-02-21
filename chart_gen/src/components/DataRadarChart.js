import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState, activeTabState } from '../recoil/atoms';
import { rgbaToHex, handleDataChange, hexToRgba, handleAddDataset, handleRemoveDataset } from '../utils/utils';

function DataRadarChart() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);
    const [activeTab, setActiveTab] = useRecoilState(activeTabState);

    return (
        <div className='datasets_box'>
            <>
                <button className='btn btn-primary btn_add' onClick={() => handleAddDataset(setChartInstance, chartInstance, 'radar')}>데이터셋 추가</button>
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


export default DataRadarChart;