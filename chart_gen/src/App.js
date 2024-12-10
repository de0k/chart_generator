import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import DirectInput from './DirectInput';

function App() {
  const [screen, setScreen] = useState('selection'); // 화면 상태 관리

  const renderScreen = () => {
    switch (screen) {
      case 'fileUpload':
        return <FileUpload onBack={() => setScreen('selection')} />;
      case 'directInput':
        return <DirectInput onBack={() => setScreen('selection')} />;
      default:
        return (
          <div>
            <h2>차트 생성기</h2>
            <button onClick={() => setScreen('fileUpload')}>파일 첨부</button>
            <button onClick={() => setScreen('directInput')}>직접 입력</button>
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
