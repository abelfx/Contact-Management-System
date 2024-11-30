import React, { createContext, useContext, useState } from "react";

const RightSideContext = createContext();

export const RightSideProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const toggleFunctionality = () => {
    setVisible((prev) => !prev);
  };

  return (
    <RightSideContext.Provider value={{ visible, toggleFunctionality }}>
      {children}
    </RightSideContext.Provider>
  );
};

export const useRightSide = () => useContext(RightSideContext);
