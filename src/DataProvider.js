import { createContext, useContext, useReducer } from "react";

import { data } from "./database";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const dataReducer = (state, action) => {};

  const [state, dispatch] = useReducer(dataReducer, data);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
