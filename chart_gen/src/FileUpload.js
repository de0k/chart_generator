import React from 'react';

function FileUpload({ onBack }) {
    return (
        <div className='main'>
            <div className="top_title_box n2">
                <strong className='title'>파일 첨부</strong>
                <button className='custom-btn custom-back' onClick={onBack}>뒤로가기</button>
            </div>
            <input type="file" accept=".json, .xlsx" />
        </div>
    );
}

export default FileUpload;
