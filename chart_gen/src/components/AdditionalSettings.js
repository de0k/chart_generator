import React from 'react';
import { Collapse } from 'react-bootstrap';

function AdditionalSettings({ activeSection, toggleSection }) {
    return (
        <div className="card">
            <div className="card-header">
                <button
                    type='button'
                    className="title"
                    onClick={(e) => {
                        e.preventDefault();
                        toggleSection('more');
                    }}
                    aria-controls="chart-setting-more"
                    aria-expanded={activeSection === 'more'}
                >
                    추가 설정
                </button>
            </div>
            <Collapse in={activeSection === 'more'}>
                <div id="chart-setting-more" className="card-body">
                    <p>여기에 추가 설정 내용을 추가하세요.</p>
                </div>
            </Collapse>
        </div>
    );
}

export default AdditionalSettings;