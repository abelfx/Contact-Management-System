import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { RightSideProvider } from "./context/RightSideContext.jsx";
import { AccountSettingProvider } from "./context/accountSettingContext.jsx";
import { ContactContextProvider } from "./context/contactsContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RightSideProvider>
        <AccountSettingProvider>
          <ContactContextProvider>
            <App />
          </ContactContextProvider>
        </AccountSettingProvider>
      </RightSideProvider>
    </AuthContextProvider>
  </StrictMode>
);
