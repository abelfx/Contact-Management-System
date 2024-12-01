import { createContext, useContext, useState } from "react";

const AccountSettingContext = createContext();

export const useAccountSettingContext = () => {
  return useContext(AccountSettingContext);
};

export const AccountSettingProvider = ({ children }) => {
  const [accountVisible, setAccountVisible] = useState(false);

  const accountToggleFunctionality = (e) => {
    e.preventDefault();
    setAccountVisible((prev) => !prev);
  };

  return (
    <AccountSettingContext.Provider
      value={{ accountVisible, accountToggleFunctionality }}
    >
      {children}
    </AccountSettingContext.Provider>
  );
};
