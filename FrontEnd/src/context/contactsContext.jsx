import { createContext, useContext, useState } from "react";

export const ContactContext = createContext();

export const useContactContext = () => {
  return useContext(ContactContext);
};

export const ContactContextProvider = ({ children }) => {
  const [contact, setContact] = useState({
    name: "",
    phoneNo: "",
    email: "",
    notes: "",
  });

  const [userVisible, setUserVisible] = useState(false);

  // sets the visibility of the detailed user information component
  const userToggleFunctionality = () => {
    setUserVisible(!userVisible);
  };

  return (
    <ContactContext.Provider
      value={{
        contact,
        setContact,
        userVisible,
        setUserVisible,
        userToggleFunctionality,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
