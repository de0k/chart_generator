import React from 'react';

function FileConvertModal({ closeModal, onDownload }) {
    return (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">파일 목록</h5>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                    <p>원하는 형식으로 차트 데이터를 다운로드하세요:</p>
                        <div className="btn-group d-flex justify-content-around">
                            <button className="btn btn-primary" onClick={onDownload.downloadAsJson}>JSON 다운로드</button>
                            <button className="btn btn-secondary" onClick={onDownload.downloadAsCsv}>CSV 다운로드</button>
                            <button className="btn btn-success" onClick={onDownload.downloadAsXlsx}>XLSX 다운로드</button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileConvertModal;