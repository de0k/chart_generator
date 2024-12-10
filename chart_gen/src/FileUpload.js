import React from 'react';

function FileUpload({ onBack }) {
    return (
        <div>
            <h2>파일 첨부 화면</h2>
            <input type="file" accept=".json, .xlsx" />
            <button onClick={onBack}>뒤로가기</button>
        </div>
    );
}

export default FileUpload;
