import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState, optionLineActiveTabState } from '../../../recoil/atoms';
import { handleOptionsChange, rgbaToHex, hexToRgba } from '../../../utils/utils';

function OptionsLineChart() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);
    const [optionLineActiveTab, setOptionLineActiveTab] = useRecoilState(optionLineActiveTabState);

    return (
        <>
            <div className='tab_wrap options_common_wrap'>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${optionLineActiveTab === 'scales_x' ? 'active' : ''}`}
                            onClick={() => setOptionLineActiveTab('scales_x')}
                        >
                            x축 설정
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${optionLineActiveTab === 'scales_y' ? 'active' : ''}`}
                            onClick={() => setOptionLineActiveTab('scales_y')}
                        >
                            y축 설정
                        </button>
                    </li>
                </ul>
                <div className="tab-content">
                    {optionLineActiveTab === 'scales_x' && (
                        <div className='set_box form-control option_inner'>
                            <div className='input-group custom_switch_box'>
                                <label className='input-group-text' htmlFor={`scales_x_display`}>표시 여부</label>
                                <div className="form-control form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`scales_x_display`}
                                        checked={chartInstance?.options?.scales?.x?.display || false}
                                        onChange={(event) => handleOptionsChange(setChartInstance, 'scales_x_display', event.target.checked)}
                                    />
                                </div>
                            </div>
                            <div className='input-group custom_switch_box'>
                                <label className='input-group-text' htmlFor={`scales_x_title_display`}>제목 표시 여부</label>
                                <div className="form-control form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`scales_x_title_display`}
                                        checked={chartInstance?.options?.scales?.x?.title?.display || false}
                                        onChange={(event) => handleOptionsChange(setChartInstance, 'scales_x_title_display', event.target.checked)}
                                    />
                                </div>
                            </div>
                            <div className='input-group custom_input_box'>
                                <label htmlFor={`scales_x_title_color`} className='input-group-text'>제목 색 설정: </label>
                                <input
                                    type="color"
                                    className="form-control form-control-color"
                                    id={`scales_x_title_color`}
                                    value={rgbaToHex(chartInstance?.options?.scales?.x?.title?.color)}
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'scales_x_title_color', hexToRgba(e.target.value))}
                                />
                            </div>
                            <div className='form-floating'>
                                <input
                                    type="text"
                                    id={`scales_x_title_text`}
                                    value={chartInstance?.options?.scales?.x?.title?.text}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'scales_x_title_text', e.target.value)}
                                />
                                <label htmlFor={`scales_x_title_text`}>제목: </label>
                            </div>
                            <div className='form-floating'>
                                <input
                                    id={`scales_x_title_font_size`}
                                    type="number"
                                    value={chartInstance?.options?.scales?.x?.title?.font?.size}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'scales_x_title_font_size', e.target.value)}
                                />
                                <label htmlFor={`scales_x_title_font_size`}>제목 크기: </label>
                            </div>
                        </div>
                    )}
                    {optionLineActiveTab === 'scales_y' && (
                        <div className='set_box form-control option_inner'>
                            <div className='input-group custom_switch_box'>
                                <label className='input-group-text' htmlFor={`scales_y_display`}>표시 여부</label>
                                <div className="form-control form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`scales_y_display`}
                                        checked={chartInstance?.options?.scales?.y?.display || false}
                                        onChange={(event) => handleOptionsChange(setChartInstance, 'scales_y_display', event.target.checked)}
                                    />
                                </div>
                            </div>
                            <div className='input-group custom_switch_box'>
                                <label className='input-group-text' htmlFor={`scales_y_title_display`}>제목 표시 여부</label>
                                <div className="form-control form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`scales_y_title_display`}
                                        checked={chartInstance?.options?.scales?.y?.title?.display || false}
                                        onChange={(event) => handleOptionsChange(setChartInstance, 'scales_y_title_display', event.target.checked)}
                                    />
                                </div>
                            </div>
                            <div className='input-group custom_input_box'>
                                <label htmlFor={`scales_y_title_color`} className='input-group-text'>제목 색 설정: </label>
                                <input
                                    type="color"
                                    className="form-control form-control-color"
                                    id={`scales_y_title_color`}
                                    value={rgbaToHex(chartInstance?.options?.scales?.y?.title?.color)}
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'scales_y_title_color', hexToRgba(e.target.value))}
                                />
                            </div>
                            <div className='form-floating'>
                                <input
                                    type="text"
                                    id={`scales_y_title_text`}
                                    value={chartInstance?.options?.scales?.y?.title?.text}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'scales_y_title_text', e.target.value)}
                                />
                                <label htmlFor={`scales_y_title_text`}>제목: </label>
                            </div>
                            <div className='form-floating'>
                                <input
                                    id={`scales_y_title_font_size`}
                                    type="number"
                                    value={chartInstance?.options?.scales?.y?.title?.font?.size}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'scales_y_title_font_size', e.target.value)}
                                />
                                <label htmlFor={`scales_y_title_font_size`}>제목 크기: </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};


export default OptionsLineChart;