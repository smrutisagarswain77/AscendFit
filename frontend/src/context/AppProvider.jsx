import { useState } from "react";
import AppContext from "./AppContext";
import { initialData } from "./initialData";

const AppProvider = ({ children }) => {
  // ==========================
  // GLOBAL APP STATE
  // ==========================
  const [appData, setAppData] = useState(initialData);

  return (
    <AppContext.Provider
      value={{
        appData,
        setAppData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;