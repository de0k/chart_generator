import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState } from '../recoil/atoms';
import { handleOptionsChange, hexToRgba } from '../utils/utils';

function OptionsCommon() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);

    return (
        <div>
            <h3>제목 설정</h3>
            <div className="form-check form-switch">
                <label className="form-check-label" htmlFor={`titleDisplaySwitch`}>제목 표시 여부</label>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={`titleDisplaySwitch`}
                    checked={chartInstance?.options?.plugins?.title?.display || false}
                    onChange={(event) => handleOptionsChange(setChartInstance, 'titleDisplay', event.target.checked)}
                />
            </div>
            <div className="form-check form-switch">
                <label className="form-check-label" htmlFor={`titleFullWidthSwitch`}>제목 전체 너비 설정 여부</label>
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
                <label htmlFor={`title_position`}>제목 위치 설정: </label>
            </div>
            <div>
                <label htmlFor={`title_color`} className='input-group-text'>제목 색 설정: </label>
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
                <label htmlFor={`title_size`}>제목 크기: </label>
            </div>

            <h3>범례 설정</h3>
            <div className="form-check form-switch">
                <label className="form-check-label" htmlFor={`legendDisplaySwitch`}>범례 표시 여부</label>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={`legendDisplaySwitch`}
                    checked={chartInstance?.options?.plugins?.legend?.display || false}
                    onChange={(event) => handleOptionsChange(setChartInstance, 'legendDisplay', event.target.checked)}
                />
            </div>
            <div className="form-check form-switch">
                <label className="form-check-label" htmlFor={`legendFullWidthSwitch`}>범례 전체 너비 설정 여부</label>
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
                <label htmlFor={`legend_position`}>범례 위치 설정: </label>
            </div>
            <div>
                <label htmlFor={`legend_color`} className='input-group-text'>범례 색 설정: </label>
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
                <label htmlFor={`legend_size`}>범례 크기: </label>
            </div>
        </div>
    );
};


export default OptionsCommon;