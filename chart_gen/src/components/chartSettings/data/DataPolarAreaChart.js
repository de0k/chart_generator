import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState, activeTabState } from '../../../recoil/atoms';
import { rgbaToHex, handleDataChange, hexToRgba, handleAddDataset, handleRemoveDataset } from '../../../utils/utils';

function DataPolarAreaChart() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);
    const [activeTab, setActiveTab] = useRecoilState(activeTabState);

    return (
        <div className='datasets_box'>
            <>
                <button className='btn btn-primary btn_add' onClick={() => handleAddDataset(setChartInstance, chartInstance, 'polarArea')}>데이터셋 추가</button>
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
                                        <div className='input-group dataset_del_wrap'>
                                            <div className='input-group-text'>데이터 셋 제거</div>
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
                                        <div className='input-group dataset_del_wrap'>
                                            <div className='input-group-text'>데이터 셋 제거</div>
                                            <button className="btn btn-success" type="button" onClick={() => handleRemoveDataset(setChartInstance, chartInstance, datasetIndex)}>X</button>
                                        </div>
                                        <div className='option_inner'>
                                            {dataset.backgroundColor.map((bg, index) => {
                                                const rgbaColor = bg.match(/[\d.]+/g);
                                                const alpha = rgbaColor ? parseFloat(rgbaColor[3] || 1) : 1;

                                                return (
                                                    <div className='custom_item'>
                                                        <div className='custom_label'>{chartInstance.data.labels[index]}</div>
                                                        <div className='input-group'>
                                                            <label htmlFor={`bgc-${index}`} className='input-group-text'>데이터 배경색</label>
                                                            <input
                                                                type="color"
                                                                className="form-control form-control-color"
                                                                id={`bgc-${index}`}
                                                                value={rgbaToHex(bg)}
                                                                onChange={(e) => handleDataChange(setChartInstance, 'backgroundColor', datasetIndex, index, hexToRgba(e.target.value, alpha))}
                                                            />
                                                        </div>
                                                        {/* 추가된 투명도 조절 슬라이더 */}
                                                        <div className="input-group mt-2">
                                                            <label htmlFor={`alpha-${index}`} className='input-group-text'>불투명도</label>
                                                            <input
                                                                type="range"
                                                                className="form-control form-range"
                                                                id={`alpha-${index}`}
                                                                min="0"
                                                                max="1"
                                                                step="0.01"
                                                                value={alpha}
                                                                onChange={(e) => {
                                                                    const newAlpha = parseFloat(e.target.value);
                                                                    handleDataChange(setChartInstance, 'backgroundColor', datasetIndex, index, hexToRgba(rgbaToHex(bg), newAlpha));
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
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


export default DataPolarAreaChart;