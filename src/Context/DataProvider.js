import { createContext, useContext, useReducer, useEffect } from "react";
// import { data } from "../database";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const dataReducer = (state, action) => {
    switch (action.type) {
      case "ADD_DATA":
        return { ...state, data: action.payload };
      case "STATUS":
        return {
          ...state,
          loading: action.payload,
        };
      case "VIEW_BY_CATEGORY":
        return { ...state, viewByCategory: action.payload };
      case "CLEAR_CATEGORY":
        return { ...state, viewByCategory: "" };
      case "VIEW_LATEST":
        return { ...state, latestVideos: !state.latestVideos };
      case "SEARCH":
        return { ...state, searchString: action.payload };
      case "CLEAR_SEARCH":
        return { ...state, searchString: "" };
      default:
        console.log("Something went wrong");
        break;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "STATUS", payload: "Loading data from server..." });
        const response = await axios.get(
          "https://api-pretube.prerananawar1.repl.co/videos"
        );
        console.log({ response });
        const data = response.data.videos;
        dispatch({ type: "ADD_DATA", payload: data });
      } catch (error) {
        dispatch({ type: "STATUS", payload: "Sorry, try again later.." });
      } finally {
        dispatch({ type: "STATUS", payload: "" });
      }
    })();
  }, []);

  const getCategoryData = (videoList, category) => {
    if (category) {
      return videoList.filter((video) => {
        return video.category === category;
      });
    } else {
      return videoList;
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

  const getSearchedData = (videoList, searchString) => {
    if (searchString) {
      return videoList.filter((item) => {
        return item.name.toLowerCase().includes(searchString.toLowerCase());
      });
    } else {
      return videoList;
    }
  };

  const [
    { latestVideos, viewByCategory, searchString, loading, data },
    dispatch,
  ] = useReducer(dataReducer, {
    data: [],
    latestVideos: false,
    viewByCategory: "",
    searchString: "",
    loading: "",
  });

  const searchedData = getSearchedData(data, searchString);
  const latestData = getLatestData(searchedData, latestVideos);
  const categoryData = getCategoryData(latestData, viewByCategory);

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        searchString,
        latestVideos,
        categoryData,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
