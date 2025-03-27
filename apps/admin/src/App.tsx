import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  return (
    <>
      <h1>DeMentor: Admin</h1>
      <h2>Asset Test</h2>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <div>
          <h2>Public</h2>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
        </div>
        <div>
          <h2>Bundled</h2>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      </div>
      <div>
        <h2>TailwindCSS Test</h2>
        <div className="flex gap-2">
          <div className="bg-red-500 w-20 h-20">Red Box</div>
          <div className="bg-blue-500 w-20 h-20">Blue Box</div>
          <div className="bg-green-500 w-20 h-20">Green Box</div>
        </div>
      </div>
    </>
  );
}

export default App;
