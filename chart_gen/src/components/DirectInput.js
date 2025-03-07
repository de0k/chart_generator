import React, { useState, useRef, useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { screenState, chartInstanceState, uploadedDataState, savedCodeState, showCodeModalState, showFileConvertModalState } from '../recoil/atoms';
import { handleChartType, handleDataChange, handleAddLabel, handleRemoveLabel, generateChartCode } from '../utils/utils';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle, RadialLinearScale, BarController, LineController, DoughnutController, PieController,RadarController, PolarAreaController } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Collapse } from 'react-bootstrap';
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import DataBarChart from './chartSettings/data/DataBarChart';
import DataLineChart from './chartSettings/data/DataLineChart';
import DataPieChart from './chartSettings/data/DataPieChart';
import DataDoughnutChart from './chartSettings/data/DataDoughnutChart';
import DataPolarAreaChart from './chartSettings/data/DataPolarAreaChart';
import DataRadarChart from './chartSettings/data/DataRadarChart';
import OptionsBarChart from './chartSettings/options/OptionsBarChart';
import OptionsLineChart from './chartSettings/options/OptionsLineChart';
import OptionsPolarAreaChart from './chartSettings/options/OptionsPolarAreaChart';
import OptionsRadarChart from './chartSettings/options/OptionsRadarChart';
import OptionsCommon from './chartSettings/options/OptionsCommon';
import CodeModal from './modals/CodeModal';
import FileConvertModal from './modals/FileConvertModal';
import useBootstrapTooltip from '../hooks/useBootstrapTooltip';

// Chart.js 구성 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, Decimation, SubTitle, RadialLinearScale, BarController, LineController, DoughnutController, PieController, RadarController, PolarAreaController );

function DirectInput() {
    const setScreen = useSetRecoilState(screenState);
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);
    const [activeSection, setActiveSection] = useState('chart');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [uploadedData, setUploadedData] = useRecoilState(uploadedDataState);
    const [savedCode, setSavedCode] = useRecoilState(savedCodeState);
    const [showCodeModal, setShowCodeModal] = useRecoilState(showCodeModalState);
    const [showFileConvertModal, setShowFileConvertModal] = useRecoilState(showFileConvertModalState);
    const [key, setKey] = useState(0);
    const removeTooltip = useBootstrapTooltip();
    const [activeSetTypeBtn, setActiveSetTypeBtn] = useState('');

    // Re-render chart when sidebar state changes
    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [isSidebarOpen]);

    useEffect(() => {
        console.log("업로드된 데이터 상태:", uploadedData);
    }, [uploadedData]);


    // HTML 코드 생성 및 저장
    const handleSaveChartCode = () => {
        try {
            const chartCode = generateChartCode(chartInstance);
            setSavedCode(chartCode);
            setShowCodeModal(true); // 모달 열기
        } catch (error) {
            alert(error.message);
        } 
    };

    // 차트 이미지 저장
    const chartRef = useRef(null);
    const handleChartImgDownload = async () => {
        if (!chartRef.current) return;

        try {
            const div = chartRef.current.canvas;
            const canvas = await html2canvas(div, { scale: 2 });
            canvas.toBlob((blob) => {
                if (blob !== null) {
                    saveAs(blob, "result.png");
                }
            });
        } catch (error) {
            console.error("Error converting div to image:", error);
        }
    };

    return (
        <div className='main'>
            <div className="top_title_box n2">
                <button className='custom-btn custom-back btn btn-secondary' data-bs-toggle="tooltip" data-bs-placement="bottom" title="메인 화면으로 이동" onClick={() => {
                    removeTooltip();
                    setChartInstance(null);
                    setUploadedData(null);
                    setScreen('main');
                }}>뒤로가기</button>
                <strong className='title'>직접 입력</strong>
                <div className='right_item d-flex gap-1'>
                    <button className='btn btn-success' data-bs-toggle="tooltip" data-bs-placement="bottom" title="생성된 차트 코드 확인" onClick={handleSaveChartCode}>코드 확인</button>
                    <button className='btn btn-success' data-bs-toggle="tooltip" data-bs-placement="bottom" title="생성된 차트 데이터 다운로드" onClick={() => setShowFileConvertModal(true)}>파일 변환</button>
                    <button className='btn btn-success' data-bs-toggle="tooltip" data-bs-placement="bottom" title="생성된 차트 이미지 다운로드" onClick={handleChartImgDownload}>이미지 변환</button>
                </div>
            </div>
            <div className="chart_wrap">
                <div
                    id="chart_setting"
                    className={`input_wrap w3-sidebar w3-bar-block w3-card w3-animate-left`}
                    style={{
                        display: isSidebarOpen ? "block" : "none",
                        width: isSidebarOpen ? "50%" : "0"
                    }}
                >

                    <div className='card'>
                        <div className='card-header'>
                            <button
                                type='button'
                                className="title"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection('chart');
                                }}
                                aria-controls="chart-setting-default"
                                aria-expanded={activeSection === 'chart'}
                            >
                                차트 설정
                            </button>
                        </div>
                        <Collapse in={activeSection === 'chart'}>
                            <div id="chart-setting-default" className="card-body">
                                <div className="input_item select_type input-group">
                                    <div className="label_text input-group-text col-lg-2">종류</div>
                                    <div className='set_box form-control col-lg-10'>
                                        <button className={`btn ${activeSetTypeBtn === 'bar' ? 'active' : ''}`} onClick={() => {
                                            handleChartType('bar', setChartInstance, uploadedData);
                                            setActiveSetTypeBtn('bar');
                                        }}>
                                            <img src={`${process.env.PUBLIC_URL}/img/bar_btn_img.png`} alt="bar_btn_img"/>
                                            Bar Chart
                                        </button>
                                        <button className={`btn ${activeSetTypeBtn === 'line' ? 'active' : ''}`} onClick={() => {
                                            handleChartType('line', setChartInstance, uploadedData);
                                            setActiveSetTypeBtn('line');
                                        }}>
                                            <img src={`${process.env.PUBLIC_URL}/img/line_btn_img.png`} alt="line_btn_img"/>
                                            Line Chart
                                        </button>
                                        <button className={`btn ${activeSetTypeBtn === 'pie' ? 'active' : ''}`} onClick={() => {
                                            handleChartType('pie', setChartInstance, uploadedData);
                                            setActiveSetTypeBtn('pie');
                                        }}>
                                            <img src={`${process.env.PUBLIC_URL}/img/pie_btn_img.png`} alt="pie_btn_img"/>
                                            Pie Chart
                                        </button>
                                        <button className={`btn ${activeSetTypeBtn === 'doughnut' ? 'active' : ''}`} onClick={() => {
                                            handleChartType('doughnut', setChartInstance, uploadedData);
                                            setActiveSetTypeBtn('doughnut');
                                        }}>
                                            <img src={`${process.env.PUBLIC_URL}/img/doughnut_btn_img.png`} alt="doughnut_btn_img"/>
                                            Doughnut Chart
                                        </button>
                                        <button className={`btn ${activeSetTypeBtn === 'polarArea' ? 'active' : ''}`} onClick={() => {
                                            handleChartType('polarArea', setChartInstance, uploadedData);
                                            setActiveSetTypeBtn('polarArea');
                                        }}>
                                            <img src={`${process.env.PUBLIC_URL}/img/polararea_btn_img.png`} alt="polararea_btn_img"/>
                                            polarArea Chart
                                        </button>
                                        <button className={`btn ${activeSetTypeBtn === 'radar' ? 'active' : ''}`} onClick={() => {
                                            handleChartType('radar', setChartInstance, uploadedData);
                                            setActiveSetTypeBtn('radar');
                                        }}>
                                            <img src={`${process.env.PUBLIC_URL}/img/radar_btn_img.png`} alt="radar_btn_img"/>
                                            radar Chart
                                        </button>
                                    </div>
                                </div>
                                <div className='input_item set_dataset input-group'>
                                    <div className="label_text input-group-text col-lg-2">라벨 & <br />데이터셋</div>
                                    <div className="set_box form-control col-lg-10">
                                        <div className='label_box'>
                                            {chartInstance ? (
                                                <>
                                                    <button className='btn btn-primary btn_add' onClick={() => handleAddLabel(chartInstance, setChartInstance)}>라벨 추가</button>
                                                    <div className='sticky-top'>
                                                        {chartInstance.data.labels.map((label, index) => (
                                                            <div className='input-group' key={index}>
                                                                <input
                                                                    type="text"
                                                                    value={label}
                                                                    className='form-control'
                                                                    onChange={(e) => handleDataChange(setChartInstance, 'labels', 0, index, e.target.value)}
                                                                />
                                                                <button className="btn btn-success" type="button" onClick={() => handleRemoveLabel(chartInstance, setChartInstance, index)}>X</button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : (
                                                <p>차트 종류를 선택해주세요.</p>
                                            )}
                                        </div>
                                        {chartInstance && chartInstance.type === 'bar' && <DataBarChart />}
                                        {chartInstance && chartInstance.type === 'line' && <DataLineChart />}
                                        {chartInstance && chartInstance.type === 'pie' && <DataPieChart />}
                                        {chartInstance && chartInstance.type === 'doughnut' && <DataDoughnutChart />}
                                        {chartInstance && chartInstance.type === 'polarArea' && <DataPolarAreaChart />}
                                        {chartInstance && chartInstance.type === 'radar' && <DataRadarChart />}
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <button
                                type='button'
                                className="title"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection('more');
                                }}
                                aria-controls="chart-setting-more"
                                aria-expanded={activeSection === 'more'}
                            >
                                추가 설정
                            </button>
                        </div>
                        <Collapse in={activeSection === 'more'}>
                            <div id="chart-setting-more" className="card-body">
                                {chartInstance && chartInstance.type && <OptionsCommon />}
                                {chartInstance && chartInstance.type === 'bar' && <OptionsBarChart />}
                                {chartInstance && chartInstance.type === 'line' && <OptionsLineChart />}
                                {chartInstance && chartInstance.type === 'polarArea' && <OptionsPolarAreaChart />}
                                {chartInstance && chartInstance.type === 'radar' && <OptionsRadarChart />}
                            </div>
                        </Collapse>
                    </div>
                </div>
                <div className="result_wrap sticky-top">
                    {!isSidebarOpen ? (
                        <div className='btn_wrap'>
                            <button className="btn btn-primary" onClick={() => setIsSidebarOpen(true)}>
                                축소
                            </button>
                        </div>
                    ) : (
                        <div className='btn_wrap'>
                            <button className="btn btn-primary" onClick={() => setIsSidebarOpen(false)}>확대</button>
                        </div>
                    )}

                    {chartInstance ? (
                        <div className='chart_rendering'>
                            <Chart
                                key={key}
                                ref={chartRef}
                                type={chartInstance.type}
                                data={chartInstance.data}
                                options={chartInstance.options}
                            />
                        </div>
                    ) : (
                        <div className='chart_option_none'>
                            <p>차트 설정 -&gt; 종류를 선택하세요.</p>
                        </div>
                    )}

                </div>
            </div>
            {showCodeModal && (<CodeModal />)}
            {showFileConvertModal && (<FileConvertModal />)}
        </div>
    );
};


export default DirectInput;
