import { createContext, useContext, useReducer } from "react";

import { data } from "./database";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const dataReducer = (state, action) => {
    switch (action.type) {
      case "VIEW_BY_CATEGORY":
        return { ...state, viewByCategory: action.payload };
      case "VIEW_LATEST":
        return { ...state, latestVideos: !state.latestVideos };
      default:
        console.log("Something went wrong");
        break;
    }
  };

  const getCategoryData = (videoList, category) => {
    return videoList.filter((video) => {
      return video.category === category;
    });
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

  const [{ latestVideos, viewByCategory }, dispatch] = useReducer(dataReducer, {
    latestVideos: false,
    viewByCategory: "Ranveer Show",
  });

  const latestData = getLatestData(data, latestVideos);
  const categoryData = getCategoryData(latestData, viewByCategory);

  // console.log(categoryData);

  return (
    <DataContext.Provider value={{ data, latestVideos, latestData, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
