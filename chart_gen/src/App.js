import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import DirectInput from './DirectInput';

function App() {
    const [screen, setScreen] = useState('main'); // 화면 상태 관리
    const [uploadedData, setUploadedData] = useState(null); // 업로드된 데이터 상태 관리

    const renderScreen = () => {
        switch (screen) {
            case 'fileUpload':
                return <FileUpload onBack={() => setScreen('main')} onDataParsed={(data) => {
                    setUploadedData(data);
                    setScreen('directInput');
                }} />;
            case 'directInput':
                return <DirectInput onBack={() => setScreen('main')} initialData={uploadedData} defaultChartType="Bar" />;
            default:
                return (
                    <div className='main'>
                        <div className="top_title_box n1">
                            <strong className='title'>차트 생성기</strong>
                        </div>
                        <div className='item_box_v1'>
                            <button className='btn btn-secondary btn-lg' onClick={() => setScreen('fileUpload')}>파일 첨부</button>
                            <button className='btn btn-success btn-lg' onClick={() => setScreen('directInput')}>직접 입력</button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="App">
            {renderScreen()}
        </div>
    );
}

export default App;
