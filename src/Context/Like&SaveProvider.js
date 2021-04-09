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
      case "UNLIKE_VIDEO":
        return {
          ...state,
          likedVideos: state.likedVideos.filter((item) => {
            return item.id !== action.payload.id;
          }),
        };
      case "SAVE_VIDEO":
        return {
          ...state,
          savedVideos: state.savedVideos.concat(action.payload),
        };
      case "UNSAVE_VIDEO":
        return {
          ...state,
          savedVideos: state.savedVideos.filter((item) => {
            return item.id !== action.payload.id;
          }),
        };
      case "ADD_TO_HISTORY":
        return {
          ...state,
          history: state.history.concat(action.payload),
        };
      case "REMOVE_FROM_HISTORY":
        return {
          ...state,
          history: state.history.filter((item) => {
            return item.id !== action.payload.id;
          }),
        };
      case "CLEAR_HISTORY":
        return {
          ...state,
          history: state.history.splice(0, state.history.length),
        };
      default:
        console.log("Something went wrong");
        break;
    }
  };

  const [likeSaveState, likeSaveDispatch] = useReducer(likeSaveReducer, {
    likedVideos: [],
    savedVideos: [],
    history: [],
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
