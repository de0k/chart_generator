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