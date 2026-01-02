import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [recipients, setRecipients] = useState([]);

  return (
    <DataContext.Provider value={{ recipients, setRecipients }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
