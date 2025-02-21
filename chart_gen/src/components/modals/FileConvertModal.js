import React from 'react';
import { useRecoilState } from 'recoil';
import { chartInstanceState, showFileConvertModalState } from '../../recoil/atoms';
import { prepareJsonData, downloadJson, prepareCsvData, downloadCsv, prepareXlsxData, downloadXlsx } from '../../utils/utils';

function FileConvertModal() {
    const [chartInstance, setChartInstance] = useRecoilState(chartInstanceState);
    const [showFileConvertModal, setShowFileConvertModal] = useRecoilState(showFileConvertModalState);

    // JSON 다운로드
    const downloadAsJson = () => {
        const data = prepareJsonData(chartInstance);
        downloadJson(data);
    };

    // CSV 다운로드
    const downloadAsCsv = () => {
        const csvContent = prepareCsvData(chartInstance);
        downloadCsv(csvContent);
    };

    // XLSX 다운로드
    const downloadAsXlsx = () => {
        const workbook = prepareXlsxData(chartInstance);
        downloadXlsx(workbook);
    };

    return (
        <div className="modal show FileConvertModal" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">파일 목록</h5>
                        <button type="button" className="btn-close" onClick={() => setShowFileConvertModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <p>원하는 형식으로 차트 데이터를 다운로드하세요:</p>
                        <div className="btn_group">
                            <button className="btn btn-primary" onClick={downloadAsJson}>JSON 다운로드</button>
                            <button className="btn btn-secondary" onClick={downloadAsCsv}>CSV 다운로드</button>
                            <button className="btn btn-success" onClick={downloadAsXlsx}>XLSX 다운로드</button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowFileConvertModal(false)}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileConvertModal;