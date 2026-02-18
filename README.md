# react, webpack을 활용하여 CSR + SSR 구조 만들어보기

## 알게 된 점

### 1. CSR과 SSR 작동 원리

1. client.jsx

- 브라우저가 /dist/bundle.js를 로드하면 자동 실행

```javascript
import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";

hydrateRoot(document.getElementById("root"), <App />);
```

- 브라우저에서 React를 활성화(hydration 또는 CSR) 하는 파일
  | 항목 | 설명 |
  | ---------- | ------------------------------------- |
  | 목적 | SSR로 내려준 HTML을 React가 브라우저에서 동작하도록 연결 |
  | 실행 환경 | 브라우저 (`window`, `document` 가능) |
  | 코드 | `hydrateRoot` 또는 `createRoot` 호출 |
  | export 필요? | ❌ 없음 → 번들 로드 시 바로 실행되기 때문 |

2. server.jsx

- Express 라우트에서 불러서 사용

```javascript
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";

export default function render() {
  return ReactDOMServer.renderToString(<App />);
}

const render = require("./dist/server.bundle.js").default;
const appHtml = render();
```

- Node 환경에서 HTML을 렌더링해서 Express가 응답할 수 있도록 하는 모듈

| 항목         | 설명                                                      |
| ------------ | --------------------------------------------------------- |
| 목적         | React 컴포넌트를 HTML 문자열로 변환 → `res.send()`        |
| 실행 환경    | Node (`require`, `fs`, `path` 가능, DOM 없음)             |
| 코드         | `ReactDOMServer.renderToString()` 호출                    |
| export 필요? | ✅ 필요 → 다른 파일(server.js)에서 불러와서 사용하기 때문 |

요약

```md
1. client.jsx → 브라우저 실행, 바로 실행되므로 export 필요 없음
2. server.jsx → 서버에서 모듈로 불러서 사용, export 필요함
3. App.jsx → SSR과 CSR 모두에서 공유되는 React 컴포넌트
4. server도 client에서 바로 로드해서 하면은 단순히 한번 HTML 렌더링이 가능. 하지만 동적으로 요청마다 렌더링하는것이 불가하다.
```

### 2. client 번들과 server 번들

- client 번들은 브라우저에서 실행, 서버 번들은 node에서 실행

1. client 번들

```javascript
// server.js
app.use("/dist", express.static(path.resolve(__dirname, "dist")));
```

- 여기서 제공되는 파일은 브라우저가 다운로드해서 Hydration 할 client.bundle.js뿐

```javascript
  entry: "./src/client.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "client.bundle.js",
    publicPath: "/dist/",
  },
```

- public path는 브라우저가 번들을 어디서 로드할지를 지정하는 옵션
- public path가 /dist/로 설정되어 있으면, webpack은 모든 동적 import나 asset 요청을 /dist/ 기준으로 찾는다.
- 서버 번들은 브라우저에서 직접 로드되지 않고, node환경에서 require로 불러오기 때문에 public path가 필요없다.

2. server 번들

```javascript
// server.js
const render = require("./dist/server.bundle.js").default;
```

- 서버 번들은 node.js 용으로 만들어짐. 위와 같이 require로 바로 불러와서 render시킨다.
- node환경이므로 브라우저에서는 사용하지 않음
- 따라서 express.static 같은 정적 파일 서빙에 포함되지 않아 있다

```javascript
  entry: "./src/client.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.bundle.js",
    libraryTarget: "commonjs2",
   }
```

- libraryTarget은 Webpack이 번들을 어떤 방식으로 내보낼지 설정
- 서버에서는 Node.js가 require()를 통해 모듈을 불러오기 때문에 "commonjs2"로 설정
  요약

```md
1. server bundle: node.js전용, 서버에서 render()함수 실행용
2. client bundle: 브라우저 전용, Hydration/CSR용
```
