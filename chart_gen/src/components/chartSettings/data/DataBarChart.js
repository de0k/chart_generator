import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState, activeTabState } from '../../../recoil/atoms';
import { rgbaToHex, handleDataChange, hexToRgba, handleAddDataset, handleRemoveDataset } from '../../../utils/utils';

function DataBarChart() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);
    const [activeTab, setActiveTab] = useRecoilState(activeTabState);

    // 스택 활성화 여부 확인
    const isStacked = chartInstance.options?.scales?.x?.stacked && chartInstance.options?.scales?.y?.stacked;

    return (
        <div className='datasets_box bar_data'>
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
                                                    <div className="custom_item">
                                                        <label className='custom_label' htmlFor={chartInstance.data.labels[index]}>{chartInstance.data.labels[index]}</label>
                                                        <div className='d-flex'>
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
                                                <label htmlFor={`bdw-${datasetIndex}`}>데이터 테두리 굵기: </label>
                                            </div>
                                            <div className='form-floating'>
                                                <input
                                                    id={`bdw-${datasetIndex}`}
                                                    type="number"
                                                    value={dataset.borderRadius}
                                                    className='form-control'
                                                    onChange={(e) => handleDataChange(setChartInstance, 'borderRadius', datasetIndex, 0, e.target.value)}
                                                />
                                                <label htmlFor={`bdw-${datasetIndex}`}>데이터 모서리 둥글기: </label>
                                            </div>
                                            <div className='form-floating'>
                                                <input
                                                    id={`order-${datasetIndex}`}
                                                    type="number"
                                                    value={dataset.order}
                                                    className='form-control'
                                                    onChange={(e) => handleDataChange(setChartInstance, 'order', datasetIndex, 0, e.target.value)}
                                                />
                                                <label htmlFor={`order-${datasetIndex}`}>순서(데이터가 겹쳐 있을 때): </label>
                                            </div>
                                            {/* stack 옵션: stacked가 활성화된 경우만 표시 */}
                                            {isStacked && (
                                                <div className='form-floating'>
                                                    <input
                                                        id={`stack-${datasetIndex}`}
                                                        type="text"
                                                        value={dataset.stack}
                                                        className='form-control'
                                                        onChange={(e) => handleDataChange(setChartInstance, 'stack', datasetIndex, 0, e.target.value)}
                                                    />
                                                    <label htmlFor={`stack-${datasetIndex}`}>stack: </label>
                                                </div>
                                            )}
                                            <div className='custom_item_wrap'>
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
                                            {dataset.borderColor.map((bd, index) => {
                                                const rgbaColor = bd.match(/[\d.]+/g);
                                                const alpha = rgbaColor ? parseFloat(rgbaColor[3] || 1) : 1;

                                                return (
                                                    <div className='custom_item'>
                                                        <div className='custom_label'>{chartInstance.data.labels[index]}</div>
                                                        <div className='input-group'>
                                                            <label htmlFor={`bdc-${index}`} className='input-group-text'>데이터 테두리색</label>
                                                            <input
                                                                type="color"
                                                                className="form-control form-control-color"
                                                                id={`bdc-${index}`}
                                                                value={rgbaToHex(bd)}
                                                                onChange={(e) => handleDataChange(setChartInstance, 'borderColor', datasetIndex, index, hexToRgba(e.target.value, alpha))}
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
                                                                    handleDataChange(setChartInstance, 'borderColor', datasetIndex, index, hexToRgba(rgbaToHex(bd), newAlpha));
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


export default DataBarChart;