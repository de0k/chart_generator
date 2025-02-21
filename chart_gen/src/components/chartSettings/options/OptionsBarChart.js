import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState } from '../../../recoil/atoms';
import { handleOptionsChange } from '../../../utils/utils';

function OptionsBarChart() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);

    return (
        <>
            <div className="input_item input-group">
                <div className="label_text input-group-text col-lg-2">bar 차트 설정</div>
                <div className='set_box form-control col-lg-10 option_inner'>
                    <div className='input-group custom_switch_box'>
                        <label className='input-group-text' htmlFor="indexAxisSwitch">가로모드</label>
                        <div className="form-control form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="indexAxisSwitch"
                                checked={chartInstance.options?.indexAxis === 'y'}
                                onChange={(event) => handleOptionsChange(setChartInstance, 'indexAxis', event.target.checked ? 'y' : 'x')}
                            />
                        </div>
                    </div>
                    <div className='input-group custom_switch_box'>
                        <label className='input-group-text' htmlFor="scales_stacked">스택모드 <small>(데이터셋 2개 이상)</small></label>
                        <div className="form-control form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="scales_stacked"
                                checked={chartInstance?.options?.scales?.x?.stacked || false}
                                onChange={(event) => handleOptionsChange(setChartInstance, 'scales_stacked', event.target.checked)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default OptionsBarChart;