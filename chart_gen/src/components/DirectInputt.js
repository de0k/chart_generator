import React, { useState, useEffect } from 'react';

import { getDefaultChartOptions } from '../utils/utils';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle } from 'chart.js';

import { Chart } from 'react-chartjs-2';

// Chart.js 구성 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle);

function DirectInputt() {
    const [chartOptions, setChartOptions] = useState(null);
    useEffect(() => {
        // Initialize chart options using getDefaultChartOptions
        const options = getDefaultChartOptions('pie'); // Use 'bar' or other chart types
        setChartOptions(options);
    }, []);

    return (
        <div>
            <h1>Direct Input Chart</h1>
            {chartOptions ? (
                <Chart
                    type={chartOptions.type || 'bar'}
                    data={chartOptions.data}
                    options={chartOptions.options}
                />
            ) : (
                <p>Loading chart options...</p>
            )}
        </div>
    );
};


export default DirectInputt;
