import React from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

function ChartRenderer({ activeChart, chartData }) {
    const renderChart = () => {
        switch (activeChart) {
            case 'Bar':
                return <Bar data={chartData} options={{ responsive: true }} />;
            case 'Line':
                return <Line data={chartData} options={{ responsive: true }} />;
            case 'Pie':
                return <Pie data={chartData} options={{ responsive: true }} />;
            case 'Doughnut':
                return <Doughnut data={chartData} options={{ responsive: true }} />;
            default:
                return <div className='chart_option_none'><p>차트 옵션을 설정 후 저장을 클릭하세요</p></div>;
        }
    };

    return <div className='chart_rendering'>{renderChart()}</div>;
}

export default ChartRenderer;