import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { dataReducer } from "./dataReducer";
import {
  getCategoryData,
  getLatestData,
  getSearchedData,
} from "./dataUtilFunc";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
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
