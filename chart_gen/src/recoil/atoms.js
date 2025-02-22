// recoil/atoms.js
import { atom } from 'recoil';

// 화면 상태 관리
export const screenState = atom({
    key: 'screenState',
    default: 'main',
});

// 업로드된 데이터 상태 관리
export const uploadedDataState = atom({
    key: 'uploadedDataState',
    default: null,
});

// 차트 객체 상태 관리
export const chartInstanceState = atom({
    key: 'chartInstanceState',
    default: null,
});

// 탭 상태 관리 (데이터 설정 / 옵션 설정)
export const activeTabState = atom({
    key: 'activeTabState',
    default: 'data',
});
export const optionActiveTabState = atom({
    key: 'optionActiveTabState',
    default: 'title',
});

// HTML 코드 상태 관리
export const savedCodeState = atom({
    key: 'savedCodeState',
    default: '',
});

// HTML 코드 모달 상태 관리
export const showCodeModalState = atom({
    key: 'showCodeModalState',
    default: false,
});

// 파일변환 모달 상태 관리
export const showFileConvertModalState = atom({
    key: 'showFileConvertModalState',
    default: false,
});