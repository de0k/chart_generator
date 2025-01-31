import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FileUpload from './components/FileUpload';
import DirectInput from './components/DirectInput';
import DirectInputt from './components/DirectInputt';

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
            case 'directInput_t':
                    return <DirectInputt onBack={() => setScreen('main')} initialData={uploadedData} defaultChartType="Bar" />;
            default:
                return (
                    <div className='main'>
                        <div className="top_title_box n1">
                            <strong className='title'>차트 생성기</strong>
                        </div>
                        <div className='item_box_v1'>
                            <a href={`${process.env.PUBLIC_URL}/file/sample_data.zip`} download="sample_data.zip" className="btn btn-primary btn-lg btn_download">샘플 다운로드</a>
                            <button className='btn btn-secondary btn-lg' onClick={() => setScreen('fileUpload')}>파일 첨부</button>
                            <button className='btn btn-success btn-lg' onClick={() => setScreen('directInput')}>직접 입력</button>
                            {/* <button className='btn btn-success btn-lg' onClick={() => setScreen('directInput_t')}>직접 입력_t</button> */}
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


/*
    import React : JSX 문법, 함수형 컴포넌트 정의에 사용. 리액트 17 이상에서는 생략해도 되나 하위 호환성을 위해.

    컴포넌트 생성시 규칙 : 파일이름은 대문자. 파일이름과 컴포넌트 이름은 동일하게(App.js,function App(){},export default App)

    App.js -> 함수형 컴포넌트
*/