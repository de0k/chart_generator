import React, { useState, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { screenState, uploadedDataState } from '../recoil/atoms';
import { processFileUpload } from '../utils/utils';
import useBootstrapTooltip from '../hooks/useBootstrapTooltip';

function FileUpload() {
    const setScreen = useSetRecoilState(screenState);
    const setUploadedData = useSetRecoilState(uploadedDataState);
    const [fileError, setFileError] = useState('');
    const removeTooltip = useBootstrapTooltip();

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const parsedData = await processFileUpload(file);
            console.log("업로드된 데이터:", parsedData); // 디버깅용 로그
            setUploadedData(parsedData);
            setScreen('directInput');
        } catch (error) {
            setFileError(error.message); // 오류 메시지 설정
        }
    };


    return (
        <div className='main'>
            <div className="top_title_box n2">
                <button className='custom-btn custom-back btn btn-secondary' data-bs-toggle="tooltip" data-bs-placement="bottom" title="메인 화면으로 이동" onClick={() => {
                    removeTooltip();
                    setScreen('main');
                }}>뒤로가기</button>
                <strong className='title'>파일 첨부</strong>
                <div className="dummy"></div>
            </div>
            <label for="file" className='item_box_v1 file_upload_box'>
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
