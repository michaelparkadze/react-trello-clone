import Routes from "./routes";
import UserProvider from "./providers/UserProvider";
import { Button } from "antd";

function App() {
  return (
    <>
      <UserProvider>
        <Routes />
      </UserProvider>
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
          zIndex: "1000",
        }}
      >
        Built with <span style={{ marginRight: 4 }}>❤️</span> by
        <Button type="link" style={{ padding: 0, marginLeft: 4 }}>
          <a href="https://www.michaelparkadze.com/" target="_blank">
            Michael Parkadze
          </a>
        </Button>
      </div>
    </>
  );
}

export default App;
