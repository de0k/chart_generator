// recoil/atoms.js
import { atom } from 'recoil';

// 화면 상태 관리 (기본값: 'main')
export const screenState = atom({
    key: 'screenState',
    default: 'main',
});