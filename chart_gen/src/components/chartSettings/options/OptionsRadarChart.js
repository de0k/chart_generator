import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState, optionRadarActiveTabState } from '../../../recoil/atoms';
import { handleOptionsChange, rgbaToHex, hexToRgba } from '../../../utils/utils';

function OptionsRadarChart() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);
    const [optionRadarActiveTab, setOptionRadarActiveTab] = useRecoilState(optionRadarActiveTabState);

    return (
        <>
            <div className='tab_wrap options_common_wrap'>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${optionRadarActiveTab === 'pointLabels' ? 'active' : ''}`}
                            onClick={() => setOptionRadarActiveTab('pointLabels')}
                        >
                            pointLabels 설정
                        </button>
                    </li>
                </ul>
                <div className="tab-content">
                    {optionRadarActiveTab === 'pointLabels' && (
                        <div className='set_box form-control option_inner'>
                            <div className='input-group custom_switch_box'>
                                <label className='input-group-text' htmlFor={`scales_r_pointLabels_display`}>표시 여부</label>
                                <div className="form-control form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`scales_r_pointLabels_display`}
                                        checked={chartInstance?.options?.scales?.r?.pointLabels?.display || false}
                                        onChange={(event) => handleOptionsChange(setChartInstance, 'scales_r_pointLabels_display', event.target.checked)}
                                    />
                                </div>
                            </div>
                            <div className='input-group custom_input_box'>
                                <label htmlFor={`scales_r_pointLabels_color`} className='input-group-text'>색 설정: </label>
                                <input
                                    type="color"
                                    className="form-control form-control-color"
                                    id={`scales_r_pointLabels_color`}
                                    value={rgbaToHex(chartInstance?.options?.scales?.r?.pointLabels?.color)}
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'scales_r_pointLabels_color', hexToRgba(e.target.value))}
                                />
                            </div>
                            <div className='form-floating'>
                                <input
                                    id={`scales_r_pointLabels_title_font_size`}
                                    type="number"
                                    value={chartInstance?.options?.scales?.r?.pointLabels?.font?.size}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'scales_r_pointLabels_title_font_size', e.target.value)}
                                />
                                <label htmlFor={`scales_r_pointLabels_title_font_size`}>크기: </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};


export default OptionsRadarChart;