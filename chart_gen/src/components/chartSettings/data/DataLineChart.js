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
                                            <div className='custom_item'>
                                                <div className='input-group'>
                                                    <label htmlFor={`bgc-${datasetIndex}`} className='input-group-text'>데이터 배경색</label>
                                                    <input
                                                        type="color"
                                                        className="form-control form-control-color"
                                                        id={`bgc-${datasetIndex}`}
                                                        value={rgbaToHex(dataset.backgroundColor)}
                                                        onChange={(e) => {
                                                            const rgbaColor = dataset.backgroundColor.match(/[\d.]+/g);
                                                            const alpha = rgbaColor ? parseFloat(rgbaColor[3] || 1) : 1;
                                                            handleDataChange(setChartInstance, 'backgroundColor_1', datasetIndex, 0, hexToRgba(e.target.value, alpha));
                                                        }}
                                                    />
                                                </div>
                                                <div className="input-group mt-1">
                                                    <label htmlFor={`alpha-${datasetIndex}`} className='input-group-text'>불투명도</label>
                                                    <input
                                                        type="range"
                                                        className="form-control form-range"
                                                        id={`alpha-${datasetIndex}`}
                                                        min="0"
                                                        max="1"
                                                        step="0.01"
                                                        value={parseFloat(dataset.backgroundColor.match(/[\d.]+/g)[3] || 1)}
                                                        onChange={(e) => {
                                                            const newAlpha = parseFloat(e.target.value);
                                                            handleDataChange(setChartInstance, 'backgroundColor_1', datasetIndex, 0, hexToRgba(rgbaToHex(dataset.backgroundColor), newAlpha));
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='custom_item mt-2'>
                                                <div className='input-group'>
                                                    <label htmlFor={`bdc-${datasetIndex}`} className='input-group-text'>데이터 테두리색</label>
                                                    <input
                                                        type="color"
                                                        className="form-control form-control-color"
                                                        id={`bdc-${datasetIndex}`}
                                                        value={rgbaToHex(dataset.borderColor)}
                                                        onChange={(e) => {
                                                            const rgbaColor = dataset.borderColor.match(/[\d.]+/g);
                                                            const alpha = rgbaColor ? parseFloat(rgbaColor[3] || 1) : 1;
                                                            handleDataChange(setChartInstance, 'borderColor_1', datasetIndex, 0, hexToRgba(e.target.value, alpha));
                                                        }}
                                                    />
                                                </div>
                                                <div className="input-group mt-1">
                                                    <label htmlFor={`alpha-${datasetIndex}`} className='input-group-text'>불투명도</label>
                                                    <input
                                                        type="range"
                                                        className="form-control form-range"
                                                        id={`alpha-${datasetIndex}`}
                                                        min="0"
                                                        max="1"
                                                        step="0.01"
                                                        value={parseFloat(dataset.borderColor.match(/[\d.]+/g)[3] || 1)}
                                                        onChange={(e) => {
                                                            const newAlpha = parseFloat(e.target.value);
                                                            handleDataChange(setChartInstance, 'borderColor_1', datasetIndex, 0, hexToRgba(rgbaToHex(dataset.borderColor), newAlpha));
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='input-group mt-2'>
                                                <label htmlFor={`ten-${datasetIndex}`} className='input-group-text'>곡선 부드러움</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-color"
                                                    id={`ten-${datasetIndex}`}
                                                    value={dataset.tension}
                                                    onChange={(e) => handleDataChange(setChartInstance, 'tension', datasetIndex, 0, e.target.value)}
                                                />
                                            </div>
                                            <div className='input-group custom_switch_box'>
                                                <label htmlFor={`steppedSwitch-${datasetIndex}`} className='input-group-text'>계단형 선</label>
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
                                                    value={
                                                        dataset.fill === false ? '없음' :
                                                            dataset.fill === 'origin' ? '기준선부터' :
                                                                dataset.fill === 'start' ? '최소값부터' :
                                                                    dataset.fill === 'end' ? '최대값까지' :
                                                                        ''
                                                    }
                                                    onChange={(e) => {
                                                        const selectedValue = e.target.value;

                                                        // ✅ UI 값 → Chart.js fill 값 변환
                                                        const fillValue = {
                                                            '없음': false,
                                                            '기준선부터': 'origin',
                                                            '최소값부터': 'start',
                                                            '최대값까지': 'end'
                                                        }[selectedValue] ?? false;

                                                        // ✅ 깊은 복사를 수행하여 상태를 안전하게 업데이트
                                                        setChartInstance(prevState => {
                                                            const updatedData = JSON.parse(JSON.stringify(prevState.data)); // 🔥 깊은 복사 (불변성 유지)
                                                            updatedData.datasets[datasetIndex].fill = fillValue;

                                                            return {
                                                                ...prevState,
                                                                data: updatedData
                                                            };
                                                        });
                                                    }}
                                                >
                                                    <option value="없음">없음</option>
                                                    <option value="기준선부터">기준선부터</option>
                                                    <option value="최소값부터">최소값부터</option>
                                                    <option value="최대값까지">최대값까지</option>
                                                </select>
                                                <label htmlFor={`fillSwitch-${datasetIndex}`}>채우기: </label>
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