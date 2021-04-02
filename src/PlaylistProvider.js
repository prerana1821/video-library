import { createContext, useContext, useReducer } from "react";

export const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const playListReducer = (state, action) => {
    switch (action.type) {
      case "SAVE_TO_PLAYLIST":
        // console.log(action.payload.selectedPlayList);
        return {
          ...state,
          [action.payload.selectedPlayList]: [
            ...state[action.payload.selectedPlayList],
            action.payload.selectedVideo,
          ],
        };
      case "CREATE_PLAYLIST":
        return {
          ...state,
          [action.payload]: [],
        };
      default:
        console.log("Something went wrong");
        break;
    }
  };

  const [playListState, playListDispatch] = useReducer(playListReducer, {
    "My PlayList": [],
    "My Learnings": [],
  });

  console.log(playListState);

  return (
    <PlaylistContext.Provider value={{ playListState, playListDispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlayList = () => {
  return useContext(PlaylistContext);
};
