import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState, optionBarActiveTabState } from '../../../recoil/atoms';
import { handleOptionsChange } from '../../../utils/utils';

function OptionsBarChart() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);
    const [optionBarActiveTab, setOptionBarActiveTab] = useRecoilState(optionBarActiveTabState);

    return (
        <>
            <div className='tab_wrap'>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${optionBarActiveTab === 'bar' ? 'active' : ''}`}
                            onClick={() => setOptionBarActiveTab('bar')}
                        >
                            bar 차트 설정
                        </button>
                    </li>
                </ul>
                <div className="tab-content">
                    {optionBarActiveTab === 'bar' && (
                        <div className='set_box form-control option_inner'>
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
                            {/* <div className='input-group custom_switch_box'>
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
                            </div> */}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};


export default OptionsBarChart;