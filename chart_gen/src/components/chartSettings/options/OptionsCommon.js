import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState, optionActiveTabState } from '../../../recoil/atoms';
import { handleOptionsChange, hexToRgba } from '../../../utils/utils';

function OptionsCommon() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);
    const [optionActiveTab, setOptionActiveTab] = useRecoilState(optionActiveTabState);

    return (
        <>
            <div className='tab_wrap options_common_wrap'>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${optionActiveTab === 'title' ? 'active' : ''}`}
                            onClick={() => setOptionActiveTab('title')}
                        >
                            제목 설정
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${optionActiveTab === 'subtitle' ? 'active' : ''}`}
                            onClick={() => setOptionActiveTab('subtitle')}
                        >
                            부제목 설정
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${optionActiveTab === 'legend' ? 'active' : ''}`}
                            onClick={() => setOptionActiveTab('legend')}
                        >
                            범례 설정
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${optionActiveTab === 'other' ? 'active' : ''}`}
                            onClick={() => setOptionActiveTab('other')}
                        >
                            기타 설정
                        </button>
                    </li>
                </ul>
                <div className="tab-content">
                    {optionActiveTab === 'title' && (
                        <div className='set_box form-control option_inner'>
                            <div className='input-group custom_switch_box'>
                                <label htmlFor={`titleDisplaySwitch`} className='input-group-text'>표시 여부</label>
                                <div className="form-control form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`titleDisplaySwitch`}
                                        checked={chartInstance?.options?.plugins?.title?.display || false}
                                        onChange={(event) => handleOptionsChange(setChartInstance, 'titleDisplay', event.target.checked)}
                                    />
                                </div>
                            </div>
                            <div className='input-group custom_switch_box'>
                                <label className='input-group-text' htmlFor={`titleFullWidthSwitch`}>전체 너비 설정 여부</label>
                                <div className="form-control form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`titleFullWidthSwitch`}
                                        checked={chartInstance?.options?.plugins?.title?.fullWidth || false}
                                        onChange={(event) => handleOptionsChange(setChartInstance, 'titleFullWidth', event.target.checked)}
                                    />
                                </div>
                            </div>
                            <div className='input-group custom_input_box'>
                                <label htmlFor={`title_color`} className='input-group-text'>색 설정: </label>
                                <input
                                    type="color"
                                    className="form-control form-control-color"
                                    id={`title_color`}
                                    value={chartInstance?.options?.plugins?.title?.color}
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'titleColor', hexToRgba(e.target.value))}
                                />
                            </div>
                            <div className='form-floating'>
                                <input
                                    type="text"
                                    id={`title_text`}
                                    value={chartInstance?.options?.plugins?.title?.text}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'titleText', e.target.value)}
                                />
                                <label htmlFor={`title_text`}>제목: </label>
                            </div>
                            <div className='form-floating'>
                                <select
                                    id={`title_position`}
                                    className='form-select'
                                    value={chartInstance?.options?.plugins?.title?.position}
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'titlePositon', e.target.value)}
                                >
                                    {["top", "left", "bottom", "right"].map((position) => (
                                        <option key={position} value={position}>{position}</option>
                                    ))}
                                </select>
                                <label htmlFor={`title_position`}>위치 설정: </label>
                            </div>
                            <div className='form-floating'>
                                <input
                                    id={`title_size`}
                                    type="number"
                                    value={chartInstance?.options?.plugins?.title?.font?.size}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'titleSize', e.target.value)}
                                />
                                <label htmlFor={`title_size`}>크기: </label>
                            </div>
                            <div className='form-floating'>
                                <input
                                    id={`title_padding_top`}
                                    type="number"
                                    value={chartInstance?.options?.plugins?.title?.padding?.top}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'title_padding_top', e.target.value)}
                                />
                                <label htmlFor={`title_padding_top`}>간격(상): </label>
                            </div>
                            <div className='form-floating'>
                                <input
                                    id={`title_padding_bottom`}
                                    type="number"
                                    value={chartInstance?.options?.plugins?.title?.padding?.bottom}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'title_padding_bottom', e.target.value)}
                                />
                                <label htmlFor={`title_padding_bottom`}>간격(하): </label>
                            </div>
                        </div>
                    )}
                    {optionActiveTab === 'subtitle' && (
                        <div className='set_box form-control option_inner'>
                            <div className='input-group custom_switch_box'>
                                <label htmlFor={`subtitleDisplaySwitch`} className='input-group-text'>표시 여부</label>
                                <div className="form-control form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`subtitleDisplaySwitch`}
                                        checked={chartInstance?.options?.plugins?.subtitle?.display || false}
                                        onChange={(event) => handleOptionsChange(setChartInstance, 'subtitleDisplay', event.target.checked)}
                                    />
                                </div>
                            </div>
                            <div className='input-group custom_input_box'>
                                <label htmlFor={`subtitle_color`} className='input-group-text'>색 설정: </label>
                                <input
                                    type="color"
                                    className="form-control form-control-color"
                                    id={`subtitle_color`}
                                    value={chartInstance?.options?.plugins?.subtitle?.color}
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'subtitleColor', hexToRgba(e.target.value))}
                                />
                            </div>
                            <div className='form-floating'>
                                <input
                                    type="text"
                                    id={`subtitle_text`}
                                    value={chartInstance?.options?.plugins?.subtitle?.text}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'subtitleText', e.target.value)}
                                />
                                <label htmlFor={`subtitle_text`}>부제목: </label>
                            </div>
                            <div className='form-floating'>
                                <select
                                    id={`subtitle_position`}
                                    className='form-select'
                                    value={chartInstance?.options?.plugins?.subtitle?.position}
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'subtitlePositon', e.target.value)}
                                >
                                    {["top", "left", "bottom", "right"].map((position) => (
                                        <option key={position} value={position}>{position}</option>
                                    ))}
                                </select>
                                <label htmlFor={`subtitle_position`}>위치 설정: </label>
                            </div>
                            <div className='form-floating'>
                                <input
                                    id={`subtitle_size`}
                                    type="number"
                                    value={chartInstance?.options?.plugins?.subtitle?.font?.size}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'subtitleSize', e.target.value)}
                                />
                                <label htmlFor={`subtitle_size`}>크기: </label>
                            </div>
                            <div className='form-floating'>
                                <input
                                    id={`subtitle_padding_top`}
                                    type="number"
                                    value={chartInstance?.options?.plugins?.subtitle?.padding?.top}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'subtitle_padding_top', e.target.value)}
                                />
                                <label htmlFor={`subtitle_padding_top`}>간격(상): </label>
                            </div>
                            <div className='form-floating'>
                                <input
                                    id={`subtitle_padding_bottom`}
                                    type="number"
                                    value={chartInstance?.options?.plugins?.subtitle?.padding?.bottom}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'subtitle_padding_bottom', e.target.value)}
                                />
                                <label htmlFor={`subtitle_padding_bottom`}>간격(하): </label>
                            </div>
                        </div>
                    )}
                    {optionActiveTab === 'legend' && (
                        <div className='set_box form-control option_inner'>
                            <div className='input-group custom_switch_box'>
                                <label htmlFor={`legendDisplaySwitch`} className='input-group-text'>표시 여부</label>
                                <div className="form-control form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`legendDisplaySwitch`}
                                        checked={chartInstance?.options?.plugins?.legend?.display || false}
                                        onChange={(event) => handleOptionsChange(setChartInstance, 'legendDisplay', event.target.checked)}
                                    />
                                </div>
                            </div>
                            <div className='input-group custom_switch_box'>
                                <label className='input-group-text' htmlFor={`legendFullWidthSwitch`}>전체 너비 설정 여부</label>
                                <div className="form-control form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`legendFullWidthSwitch`}
                                        checked={chartInstance?.options?.plugins?.legend?.fullWidth || false}
                                        onChange={(event) => handleOptionsChange(setChartInstance, 'legendFullWidth', event.target.checked)}
                                    />
                                </div>
                            </div>
                            <div className='input-group custom_input_box'>
                                <label htmlFor={`legend_color`} className='input-group-text'>색 설정: </label>
                                <input
                                    type="color"
                                    className="form-control form-control-color"
                                    id={`legend_color`}
                                    value={chartInstance?.options?.plugins?.legend?.labels?.color}
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'legendColor', hexToRgba(e.target.value))}
                                />
                            </div>
                            <div className='form-floating'>
                                <select
                                    id={`legend_position`}
                                    className='form-select'
                                    value={chartInstance?.options?.plugins?.legend?.position}
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'legendPositon', e.target.value)}
                                >
                                    {["top", "left", "bottom", "right"].map((position) => (
                                        <option key={position} value={position}>{position}</option>
                                    ))}
                                </select>
                                <label htmlFor={`legend_position`}>위치 설정: </label>
                            </div>
                            <div className='form-floating'>
                                <select
                                    id={`legend_align`}
                                    className='form-select'
                                    value={chartInstance?.options?.plugins?.legend?.align}
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'legend_align', e.target.value)}
                                >
                                    {["start", "center", "end"].map((align) => (
                                        <option key={align} value={align}>{align}</option>
                                    ))}
                                </select>
                                <label htmlFor={`legend_align`}>정렬 설정: </label>
                            </div>
                            <div className='form-floating'>
                                <input
                                    id={`legend_size`}
                                    type="number"
                                    value={chartInstance?.options?.plugins?.legend?.labels?.font?.size}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'legendSize', e.target.value)}
                                />
                                <label htmlFor={`legend_size`}>크기: </label>
                            </div>
                            {/* <div className='form-floating'>
                                <input
                                    id={`legend_labels_padding`}
                                    type="number"
                                    value={chartInstance?.options?.plugins?.legend?.labels?.padding}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'legend_labels_padding', e.target.value)}
                                />
                                <label htmlFor={`legend_labels_padding`}>간격: </label>
                            </div> */}
                            <div className='input-group custom_switch_box mt-3'>
                                <label className='input-group-text' htmlFor={`legend_title_display`}>타이틀 표시 여부</label>
                                <div className="form-control form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`legend_title_display`}
                                        checked={chartInstance?.options?.plugins?.legend?.title?.display || false}
                                        onChange={(event) => handleOptionsChange(setChartInstance, 'legend_title_display', event.target.checked)}
                                    />
                                </div>
                            </div>
                            <div className='form-floating'>
                                <input
                                    type="text"
                                    id={`legend_title_text`}
                                    value={chartInstance?.options?.plugins?.legend?.title?.text}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'legend_title_text', e.target.value)}
                                />
                                <label htmlFor={`legend_title_text`}>범례 제목: </label>
                            </div>
                            <div className='form-floating'>
                                <select
                                    id={`legend_title_position`}
                                    className='form-select'
                                    value={chartInstance?.options?.plugins?.legend?.title?.position}
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'legend_title_position', e.target.value)}
                                >
                                    {["start", "center", "end"].map((position) => (
                                        <option key={position} value={position}>{position}</option>
                                    ))}
                                </select>
                                <label htmlFor={`legend_title_position`}>타이틀 위치 설정: </label>
                            </div>
                            <div className='form-floating'>
                                <input
                                    id={`legend_title_padding`}
                                    type="number"
                                    value={chartInstance?.options?.plugins?.legend?.title?.padding}
                                    className='form-control'
                                    onChange={(e) => handleOptionsChange(setChartInstance, 'legend_title_padding', e.target.value)}
                                />
                                <label htmlFor={`legend_title_padding`}>간격: </label>
                            </div>
                        </div>
                    )}
                    {optionActiveTab === 'other' && (
                        <div className='set_box form-control option_inner'>
                            <div className='input-group custom_switch_box'>
                                <label className='input-group-text' htmlFor={`interaction_intersectSwitch`}>툴팁 광범위 감지 여부</label>
                                <div className="form-control form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`interaction_intersectSwitch`}
                                        checked={chartInstance?.options?.interaction?.intersect || false}
                                        onChange={(event) => handleOptionsChange(setChartInstance, 'interaction_intersect', event.target.checked)}
                                    />
                                </div>
                            </div>
                            <div className='input-group custom_switch_box'>
                                <label className='input-group-text' htmlFor={`interaction_mode`}>툴팁 데이터셋 모두 출력 여부</label>
                                <div className="form-control form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`interaction_mode`}
                                        checked={chartInstance?.options?.interaction?.mode === 'index'}
                                        onChange={(event) => handleOptionsChange(setChartInstance, 'interaction_mode', event.target.checked ? 'index' : 'nearest')}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};


export default OptionsCommon;