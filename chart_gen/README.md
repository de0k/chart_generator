# Create React App 시작하기

이 프로젝트는 [Create React App](https://github.com/facebook/create-react-app)을 사용하여 초기화되었습니다.

## 시작하기전에

현재 나의 경로를 `chart_gen` 폴더로 맞추기.

### `git checkout main`
메인 브랜치 이동

### `git pull origin main` or `git fetch`
최신 코드 가져오기

### `npm install`
새로 추가된 종속성 설치

## 사용 가능한 스크립트

프로젝트 디렉터리에서 다음 명령을 실행할 수 있습니다.:

### `npm start`

앱을 개발 모드에서 실행합니다.\
[http://localhost:3000](http://localhost:3000) 에 접속하여 브라우저에서 확인할 수 있습니다.

코드를 변경하면 페이지가 자동으로 새로고침됩니다.\
또한, 콘솔에서 lint 오류를 확인할 수도 있습니다.

### `npm test`

테스트 실행기를 인터랙티브 감시 모드에서 실행합니다.\
테스트 실행에 대한 자세한 내용은 [running tests](https://facebook.github.io/create-react-app/docs/running-tests) 섹션을 참고하세요.

### `npm run build`

앱을 프로덕션 환경용으로 `build` 폴더에 빌드합니다.\
React를 프로덕션 모드에서 올바르게 번들링하고, 최상의 성능을 위해 빌드를 최적화합니다.

빌드된 파일은 최소화(minified) 처리되며, 파일명에는 해시(hash) 값이 포함됩니다.\
이제 앱을 배포할 준비가 완료되었습니다!

배포에 대한 자세한 내용은 [deployment](https://facebook.github.io/create-react-app/docs/deployment) 섹션을 참고하세요.

### `npm run eject`

**주의: 이것은 되돌릴 수 없는 일방향 작업입니다. `eject`를 실행하면 다시 되돌릴 수 없습니다!**

만약 기본 빌드 도구나 설정이 만족스럽지 않다면, 언제든지 `eject` 를 실행할 수 있습니다. 이 명령을 실행하면 프로젝트에서 단일 빌드 종속성을 제거합니다.

대신, 모든 구성 파일과 의존성(예: Webpack, Babel, ESLint 등)을 프로젝트 내부로 복사하여, 사용자가 직접 제어할 수 있도록 합니다. All of `eject` 를 제외한 모든 명령어는 그대로 작동하지만, 이제 복사된 스크립트를 참조하게 되므로 자유롭게 수정할 수 있습니다. 이 시점부터는 모든 설정을 직접 관리해야 합니다.

반드시 `eject`를 사용할 필요는 없습니다. 기본 제공되는 기능들은 소규모 및 중규모 프로젝트에 적합하며, 이 기능을 꼭 사용할 필요는 없습니다. 그러나, 프로젝트 설정을 직접 변경해야 할 경우 `eject` 기능이 필요할 수도 있다는 점을 이해하고 있습니다.

## 더 알아보기

[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)에서 더 많은 내용을 학습할 수 있습니다.

React를 배우려면 [React documentation](https://reactjs.org/)를 확인하세요.

### 코드 분할 (Code Splitting)

이 섹션은 여기로 이동되었습니다: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### 번들 크기 분석 (Analyzing the Bundle Size)

이 섹션은 여기로 이동되었습니다: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### 프로그레시브 웹 앱 만들기 (Making a Progressive Web App)

이 섹션은 여기로 이동되었습니다: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### 고급 설정 (Advanced Configuration)

이 섹션은 여기로 이동되었습니다: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### 배포 (Deployment)

이 섹션은 여기로 이동되었습니다: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` 실행 시 minify 실패 문제

이 섹션은 여기로 이동되었습니다: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

=============

node_modules : npm install을 하여 설치된 모듈들이 위치하는 폴더
public : static 자원 폴더, 정적 파일들을 위한 폴더
src : 리액트를 작업할 폴더

==============

자바스크립트 변수값을 사용할 때는 {} 안에 넣어야 한다

const hello = 'Hello React';

function App() {
    return (
        <>
            <Hello />
            <div>{hello}</div>
        </>
    );
}

==============