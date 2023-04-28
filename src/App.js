import "./App.css";
import MyRouter from "./routes";
import { AuthenticationProvider } from "./context/AuthenticationContext";
import { MenuProvider } from "./context/MenuContext";

function App() {
  return (
    <AuthenticationProvider>
      <MenuProvider>
        <MyRouter />
      </MenuProvider>
    </AuthenticationProvider>
  );
}

export default App;
