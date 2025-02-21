import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState } from '../../../recoil/atoms';
import { handleOptionsChange, hexToRgba } from '../../../utils/utils';

function OptionsCommon() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);

    return (
        <>
            <div className="input_item input-group">
                <div className="label_text input-group-text col-lg-2">제목 설정</div>
                <div className='set_box form-control col-lg-10'>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor={`titleDisplaySwitch`}>표시 여부</label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`titleDisplaySwitch`}
                            checked={chartInstance?.options?.plugins?.title?.display || false}
                            onChange={(event) => handleOptionsChange(setChartInstance, 'titleDisplay', event.target.checked)}
                        />
                    </div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor={`titleFullWidthSwitch`}>전체 너비 설정 여부</label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`titleFullWidthSwitch`}
                            checked={chartInstance?.options?.plugins?.title?.fullWidth || false}
                            onChange={(event) => handleOptionsChange(setChartInstance, 'titleFullWidth', event.target.checked)}
                        />
                    </div>
                    <div className=''>
                        <input
                            type="text"
                            value={chartInstance?.options?.plugins?.title?.text}
                            className='form-control'
                            onChange={(e) => handleOptionsChange(setChartInstance, 'titleText', e.target.value)}
                        />
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
                    <div>
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
                            id={`title_size`}
                            type="number"
                            value={chartInstance?.options?.plugins?.title?.font?.size}
                            className='form-control'
                            onChange={(e) => handleOptionsChange(setChartInstance, 'titleSize', e.target.value)}
                        />
                        <label htmlFor={`title_size`}>크기: </label>
                    </div>
                </div>
            </div>
            <div className="input_item input-group">
                <div className="label_text input-group-text col-lg-2">부제목 설정</div>
                <div className='set_box form-control col-lg-10'>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor={`subtitleDisplaySwitch`}>표시 여부</label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`subtitleDisplaySwitch`}
                            checked={chartInstance?.options?.plugins?.subtitle?.display || false}
                            onChange={(event) => handleOptionsChange(setChartInstance, 'subtitleDisplay', event.target.checked)}
                        />
                    </div>
                    <div className=''>
                        <input
                            type="text"
                            value={chartInstance?.options?.plugins?.subtitle?.text}
                            className='form-control'
                            onChange={(e) => handleOptionsChange(setChartInstance, 'subtitleText', e.target.value)}
                        />
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
                    <div>
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
                            id={`subtitle_size`}
                            type="number"
                            value={chartInstance?.options?.plugins?.subtitle?.font?.size}
                            className='form-control'
                            onChange={(e) => handleOptionsChange(setChartInstance, 'subtitleSize', e.target.value)}
                        />
                        <label htmlFor={`subtitle_size`}>크기: </label>
                    </div>
                </div>
            </div>
            <div className="input_item input-group">
                <div className="label_text input-group-text col-lg-2">범례 설정</div>
                <div className='set_box form-control col-lg-10'>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor={`legendDisplaySwitch`}>표시 여부</label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`legendDisplaySwitch`}
                            checked={chartInstance?.options?.plugins?.legend?.display || false}
                            onChange={(event) => handleOptionsChange(setChartInstance, 'legendDisplay', event.target.checked)}
                        />
                    </div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor={`legendFullWidthSwitch`}>전체 너비 설정 여부</label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`legendFullWidthSwitch`}
                            checked={chartInstance?.options?.plugins?.legend?.fullWidth || false}
                            onChange={(event) => handleOptionsChange(setChartInstance, 'legendFullWidth', event.target.checked)}
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
                    <div>
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
                        <input
                            id={`legend_size`}
                            type="number"
                            value={chartInstance?.options?.plugins?.legend?.labels?.font?.size}
                            className='form-control'
                            onChange={(e) => handleOptionsChange(setChartInstance, 'legendSize', e.target.value)}
                        />
                        <label htmlFor={`legend_size`}>크기: </label>
                    </div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor={`legend_title_display`}>타이틀 표시 여부</label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`legend_title_display`}
                            checked={chartInstance?.options?.plugins?.legend?.title?.display || false}
                            onChange={(event) => handleOptionsChange(setChartInstance, 'legend_title_display', event.target.checked)}
                        />
                    </div>
                    <div className=''>
                        <input
                            type="text"
                            value={chartInstance?.options?.plugins?.legend?.title?.text}
                            className='form-control'
                            onChange={(e) => handleOptionsChange(setChartInstance, 'legend_title_text', e.target.value)}
                        />
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
                </div>
            </div>
            <div className="input_item input-group">
                <div className="label_text input-group-text col-lg-2">기타 설정</div>
                <div className='set_box form-control col-lg-10'>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor={`interaction_intersectSwitch`}>툴팁 광범위 감지 여부</label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`interaction_intersectSwitch`}
                            checked={chartInstance?.options?.interaction?.intersect || false}
                            onChange={(event) => handleOptionsChange(setChartInstance, 'interaction_intersect', event.target.checked)}
                        />
                    </div>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor={`interaction_mode`}>툴팁 데이터셋 모두 출력 여부</label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`interaction_mode`}
                            checked={chartInstance?.options?.interaction?.mode === 'index'}
                            onChange={(event) => handleOptionsChange(setChartInstance, 'interaction_mode',event.target.checked ? 'index' : 'nearest')}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};


export default OptionsCommon;