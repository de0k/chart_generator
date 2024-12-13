import React from 'react';

function FileUpload({ onBack }) {
    return (
        <div className='main'>
            <div className="top_title_box n2">
                <button className='custom-btn custom-back btn btn-secondary' onClick={onBack}>뒤로가기</button>
                <strong className='title'>파일 첨부</strong>
                <div></div>
            </div>
            <input type="file" accept=".json, .xlsx" />
        </div>
    );
}

export default FileUpload;
