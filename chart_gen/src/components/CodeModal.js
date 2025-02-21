import React from 'react';
import { useRecoilState } from 'recoil';
import { savedCodeState, showCodeModalState } from '../recoil/atoms';

function CodeModal() {
    const [savedCode, setSavedCode] = useRecoilState(savedCodeState);
    const [showCodeModal, setShowCodeModal] = useRecoilState(showCodeModalState);
    return (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">생성된 코드</h5>
                        <button type="button" className="btn-close" onClick={() => setShowCodeModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <pre
                            style={{
                                backgroundColor: '#f4f4f4',
                                padding: '10px',
                                borderRadius: '5px',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {savedCode}
                        </pre>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowCodeModal(false)}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodeModal;