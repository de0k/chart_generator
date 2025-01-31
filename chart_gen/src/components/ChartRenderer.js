import React, { useEffect, useState, forwardRef } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

const ChartRenderer = forwardRef(({ isSidebarOpen, activeChart, chartData }, ref) => {
    const [key, setKey] = useState(0);

    // Re-render chart when sidebar state changes
    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [isSidebarOpen]);

    const renderChart = () => {
        const commonOptions = {
            responsive: true,
            maintainAspectRatio: true,
        };

        switch (activeChart) {
            case 'Bar':
                return <Bar key={key} data={chartData} options={commonOptions} />;
            case 'Line':
                return <Line key={key} data={chartData} options={commonOptions} />;
            case 'Pie':
                return <Pie key={key} data={chartData} options={commonOptions} />;
            case 'Doughnut':
                return <Doughnut key={key} data={chartData} options={commonOptions} />;
            default:
                return (
                    <div className='chart_option_none'>
                        <p>차트 옵션을 설정 후 저장을 클릭하세요</p>
                    </div>
                );
        }
    };

    return <div ref={ref} className='chart_rendering'>{renderChart()}</div>;
});

export default ChartRenderer;
