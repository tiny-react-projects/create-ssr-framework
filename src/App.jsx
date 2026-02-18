import { useEffect, useState } from "react";

function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      <h1>SSR + CSR</h1>
      <h3>이 텍스트는 서버에서 렌더링 됨</h3>
      <p>
        {isClient && <p>이 텍스트는 클라이언트에서 hydration 이후 나타난다.</p>}
      </p>
    </div>
  );
}

export default App;
