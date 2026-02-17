# react를 이용한 ssr 프레임워크를 만들기

## 단계 정리하기

1. 필요한 라이브러리
   React, Express, Babel, Webpack, Node 기반 개발 환경 준비

```md
1. Node.js

- 서버 환경 제공: 브라우저가 아닌 서버에서 JavaScript를 실행할 수 있게 함

2. React

- UI 컴포넌트를 만드는 라이브러리, 재사용 가능한 구조 제공 (JSX 기반)
- 서버/클라이언트에서 동일 코드 사용

3. ReactDOM/ReactDOMServer

- ReactDOM (클라이언트): 서버 HTML과 연결(HydrateRoot) → 인터랙티브 UI
- ReactDOMServer (서버): React 컴포넌트를 HTML 문자열로 변환(renderToString, renderToPipeableStream)

4. Express

- Node.js 위에서 웹 서버 역할. URL 라우팅, 요청/응답 처리

5. Babel

- 최신 JavaScript + JSX → Node/브라우저가 이해 가능한 JS로 변환

6. Webpack

- 서버/클라이언트 코드 번들링
```

```md
| 도구                      | 역할                     | SSR 관점                               |
| ------------------------- | ------------------------ | -------------------------------------- |
| Node.js                   | 서버 환경 제공           | React 코드를 서버에서 실행             |
| React                     | UI 컴포넌트              | 서버/클라이언트 동일 코드              |
| ReactDOM / ReactDOMServer | React 연결 & 서버 렌더링 | 서버: HTML 생성, 클라이언트: Hydration |
| Express                   | HTTP 서버                | 요청 → React → HTML 응답               |
| Babel                     | 코드 변환                | JSX / 최신 JS → 실행 가능 JS           |
| Webpack                   | 번들링                   | client/server 분리, 파일 관리          |
```

## 라이브러리/모듈 설치의 필요성

1. React 자체만으로는 SSR 불가

React는 UI 컴포넌트 라이브러리일 뿐입니다.

React 혼자서는 HTML을 서버에서 렌더링하거나, HTTP 요청을 처리할 수 없습니다.

즉, React만 설치하면 서버에서 React를 실행하고 HTML을 응답으로 보내는 기능이 없음

따라서 서버 환경과 빌드 환경이 필요합니다.

2. Node.js 필요성

SSR을 하려면 서버에서 React 코드를 실행해야 합니다.

Node.js는 서버에서 JavaScript를 실행할 수 있는 환경을 제공합니다.

브라우저는 서버 역할을 할 수 없으므로 Node.js 같은 런타임이 필요합니다.

Node.js가 없으면 서버 렌더링 자체가 불가능합니다.

3. Express 필요성

Node.js만 있어도 React 코드를 실행할 수는 있지만, HTTP 서버를 직접 구현하려면 복잡합니다.

Express를 사용하면 간단하게:

요청 URL 라우팅

정적 파일 제공

HTML 응답

이런 서버 측 기능을 쉽게 구현할 수 있습니다.

Express는 필수는 아니지만, SSR 실습에서 가장 편한 선택

4. Babel 필요성

React 코드는 대부분 JSX 문법으로 작성됩니다.

const App = () => <h1>Hello SSR</h1>;

Node.js는 JSX를 이해하지 못함

최신 JS(ES6+) 문법도 일부 Node 버전에서 지원되지 않을 수 있음

→ Babel이 필요: JSX/ES6 → Node/브라우저가 이해 가능한 JS로 변환

5. Webpack 필요성

SSR 환경에서는 서버 코드와 클라이언트 코드를 분리해야 합니다.

브라우저에서 실행될 JS는 번들링되어야 하고, 서버 코드는 Node 환경용으로 별도 번들링이 필요합니다.

Webpack이 없으면:

import/export, JSX 처리

Node 모듈 관리

브라우저 호환 코드

모두 수동으로 처리해야 해서 사실상 불가능에 가깝습니다.

Webpack은 필수는 아니지만, 실무에서는 거의 항상 사용됩니다.

결론
도구 필요 여부 이유
Node.js 필수 서버에서 React 실행 환경 제공
React 필수 UI 컴포넌트, SSR 대상
Express 권장 요청 처리, 라우팅, 정적 파일 제공
Babel 필수 JSX / 최신 JS → Node/브라우저 호환 코드
Webpack 강력 권장 서버/클라이언트 번들링, 모듈 관리
