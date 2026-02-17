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
