import Routes from "./routes";
import Nav from "./components/Nav";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <>
      <UserProvider>
        {/* <Nav /> */}
        <Routes />
      </UserProvider>
    </>
  );
}

export default App;
