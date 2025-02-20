import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState } from '../recoil/atoms';
import { handleOptionsChange } from '../utils/utils';

function OptionsLineChart() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);

    return (
        <div>
            line 옵션
        </div>
    );
};


export default OptionsLineChart;