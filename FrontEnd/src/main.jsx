import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { RightSideProvider } from "./context/RightSideContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RightSideProvider>
        <App />
      </RightSideProvider>
    </AuthContextProvider>
  </StrictMode>
);
