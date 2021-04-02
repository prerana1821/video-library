import { createContext, useContext, useReducer } from "react";

import { data } from "./database";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const dataReducer = (state, action) => {
    switch (action.type) {
      case "VIEW_LATEST":
        return { ...state, latestVideos: !state.latestVideos };
      default:
        console.log("Something went wrong");
        break;
    }
  };

  const getLatestData = (videoList, latest) => {
    if (latest) {
      return videoList.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    } else {
      return videoList.sort(() => Math.random() - 0.5);
    }
  };

  const [{ latestVideos }, dispatch] = useReducer(dataReducer, {
    latestVideos: false,
  });

  const latestData = getLatestData(data, latestVideos);

  return (
    <DataContext.Provider value={{ latestVideos, latestData, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
