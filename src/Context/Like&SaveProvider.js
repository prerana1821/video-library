import { createContext, useContext, useReducer } from "react";

export const LikeSaveContext = createContext();

const found = (array, id) => {
  return !!array.find((item) => item.id !== id);
};

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
        // console.log(action.payload);
        return {
          ...state,
          // history: state.history.reduce((acc, value) => {
          //   return value.id !== action.payload.id && [...acc, action.payload];
          // }, state.history),
          // history: found(state.history, action.payload.id) && action.payload,
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
    notes: [
      {
        id: 1,
        videoId: "WylKHt5SuMI",
        note: "Didn't understood this",
      },
      {
        id: 2,
        videoId: "d3R2-nW065U",
        note: "Didn't understood this",
      },
    ],
  });

  return (
    <LikeSaveContext.Provider value={{ likeSaveState, likeSaveDispatch }}>
      {children}
    </LikeSaveContext.Provider>
  );
};

export const useLikeSave = () => {
  return useContext(LikeSaveContext);
};
