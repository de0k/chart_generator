import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState } from '../../../recoil/atoms';
import { handleOptionsChange } from '../../../utils/utils';

function OptionsBarChart() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);

    return (
        <div>
            <div className="form-check form-switch">
                <label className="form-check-label" htmlFor="indexAxisSwitch">가로모드</label>
                <input 
                    className="form-check-input"
                    type="checkbox"
                    id="indexAxisSwitch"
                    checked={chartInstance.options?.indexAxis === 'y'}
                    onChange={(event) => handleOptionsChange(setChartInstance, 'indexAxis', event.target.checked ? 'y' : 'x')}
                />
            </div>
        </div>
    );
};


export default OptionsBarChart;