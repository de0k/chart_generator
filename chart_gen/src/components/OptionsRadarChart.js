import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState } from '../recoil/atoms';
import { handleOptionsChange } from '../utils/utils';

function OptionsRadarChart() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);

    return (
        <div>
            <h3>pointLabels 설정</h3>
            <div className="form-check form-switch">
                <label className="form-check-label" htmlFor={`scales_r_pointLabels_display`}>표시 여부</label>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={`scales_r_pointLabels_display`}
                    checked={chartInstance?.options?.scales?.r?.pointLabels?.display || false}
                    onChange={(event) => handleOptionsChange(setChartInstance, 'scales_r_pointLabels_display', event.target.checked)}
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
    );
};


export default OptionsRadarChart;