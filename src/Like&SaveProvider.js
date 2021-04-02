import { createContext, useContext, useReducer } from "react";

export const LikeSaveContext = createContext();

export const LikeSaveProvider = ({ children }) => {
  const likeSaveReducer = (state, action) => {
    switch (action.type) {
      case "LIKE_VIDEO":
        return {
          ...state,
          likedVideos: state.likedVideos.concat(action.payload),
        };
      case "SAVE_VIDEO":
        return {
          ...state,
          savedVideos: state.savedVideos.concat(action.payload),
        };
      default:
        console.log("Something went wrong");
        break;
    }
  };

  const [likeSaveState, likeSaveDispatch] = useReducer(likeSaveReducer, {
    likedVideos: [],
    savedVideos: [],
  });

  //   console.log(likeSaveState);

  return (
    <LikeSaveContext.Provider value={{ likeSaveState, likeSaveDispatch }}>
      {children}
    </LikeSaveContext.Provider>
  );
};

export const useLikeSave = () => {
  return useContext(LikeSaveContext);
};
