import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";
import { AuthProvider } from "./context/AuthContext";
import { UIProvider } from "./context/UIContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <UIProvider>
        <App />
      </UIProvider>
    </AuthProvider>
  </BrowserRouter>
);
