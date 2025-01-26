import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// React 18 버전 방식
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
  <React.StrictMode> : 애플리케이션 내의 잠재적인 문제를 알아내기 위한 도구. npm start했을 때 브라우저가 검은색 배경에 오류 적히는거. import React from 'react'; 해야 사용가능.
*/
