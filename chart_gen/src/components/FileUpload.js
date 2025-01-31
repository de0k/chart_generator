import React, { useState } from 'react';
import { processFileUpload } from '../utils/utils';

function FileUpload({ onBack, onDataParsed }) {
    const [fileError, setFileError] = useState('');

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        try {
            const parsedData = await processFileUpload(file);
            onDataParsed(parsedData); // 처리된 데이터를 부모 컴포넌트로 전달
        } catch (error) {
            setFileError(error.message); // 오류 메시지 설정
        }
    };

    return (
        <div className='main'>
            <div className="top_title_box n2">
                <button className='custom-btn custom-back btn btn-secondary' onClick={onBack}>뒤로가기</button>
                <strong className='title'>파일 첨부</strong>
                <div className="dummy"></div>
            </div>
            <label for="file" className='item_box_v1'>
                <div className="btn-upload text-center">
                    <p>파일 업로드하기</p>
                    <p>(JSON, XLSX)</p>
                </div>
            </label>
            <input type="file" name="file" id="file" accept=".json, .xlsx" onChange={handleFileUpload} />
            {fileError && <p className="error-text">{fileError}</p>}
        </div>
    );
}

export default FileUpload;
