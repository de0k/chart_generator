import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState } from '../recoil/atoms';
import { handleOptionsChange, hexToRgba } from '../utils/utils';

function OptionsLineChart() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);

    return (
        <div>
            <h3>x축 설정</h3>
            <div className="form-check form-switch">
                <label className="form-check-label" htmlFor={`scales_x_display`}>표시 여부</label>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={`scales_x_display`}
                    checked={chartInstance?.options?.scales?.x?.display || false}
                    onChange={(event) => handleOptionsChange(setChartInstance, 'scales_x_display', event.target.checked)}
                />
            </div>
            <div className="form-check form-switch">
                <label className="form-check-label" htmlFor={`scales_x_title_display`}>제목 표시 여부</label>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={`scales_x_title_display`}
                    checked={chartInstance?.options?.scales?.x?.title?.display || false}
                    onChange={(event) => handleOptionsChange(setChartInstance, 'scales_x_title_display', event.target.checked)}
                />
            </div>
            <div className=''>
                <input
                    type="text"
                    value={chartInstance?.options?.scales?.x?.title?.text}
                    className='form-control'
                    onChange={(e) => handleOptionsChange(setChartInstance, 'scales_x_title_text', e.target.value)}
                />
            </div>
            <div>
                <label htmlFor={`scales_x_title_color`} className='input-group-text'>제목 색 설정: </label>
                <input
                    type="color"
                    className="form-control form-control-color"
                    id={`scales_x_title_color`}
                    value={chartInstance?.options?.scales?.x?.title?.color}
                    onChange={(e) => handleOptionsChange(setChartInstance, 'scales_x_title_color', hexToRgba(e.target.value))}
                />
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
    );
};


export default OptionsLineChart;