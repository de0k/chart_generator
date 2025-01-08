import React, { useState } from 'react';
import { parseFileData } from './utils';

function FileUpload({ onBack, onDataParsed }) {
    const [fileError, setFileError] = useState('');

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!['json', 'xlsx'].includes(fileExtension)) {
            setFileError('지원하지 않는 파일 형식입니다. JSON 또는 XLSX 파일만 업로드하세요.');
            return;
        }

        try {
            const parsedData = await parseFileData(file, fileExtension);
            onDataParsed(parsedData);
        } catch (error) {
            setFileError('파일을 처리하는 동안 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className='main'>
            <div className="top_title_box n2">
                <button className='custom-btn custom-back btn btn-secondary' onClick={onBack}>뒤로가기</button>
                <strong className='title'>파일 첨부</strong>
                <div></div>
            </div>
            <input type="file" accept=".json, .xlsx" onChange={handleFileUpload} />
            {fileError && <p className="error-text">{fileError}</p>}
        </div>
    );
}

export default FileUpload;
