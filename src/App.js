import { createRoot } from "https://esm.sh/react-dom@18/client";

function App() {
  return <div>App컴퍼넌트입니다.</div>;
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
