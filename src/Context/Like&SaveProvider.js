import { createContext, useContext, useReducer } from "react";
import { v4 } from "uuid";

export const LikeSaveContext = createContext();

let playListId = 0;

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
      case "ADD_NOTE":
        console.log("Hello");
        return {
          ...state,
          notes: state.notes.concat({
            id: v4(),
            videoId: action.payload.videoId,
            note: action.payload.note,
          }),
        };
      case "SAVE_NOTE":
        return {
          ...state,
          notes: state.notes.map((item) => {
            return item.videoId === action.payload.videoId
              ? { ...item, note: action.payload.note }
              : item;
          }),
        };
      case "ADD_TO_HISTORY":
        return {
          ...state,
          history: state.history.some((ele) => ele.id === action.payload.id)
            ? state.history
            : state.history.concat(action.payload),
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
      case "CREATE_PLAYLIST":
        return {
          ...state,
          playlists: state.playlists.concat({
            id: ++playListId,
            title: action.payload,
            videos: [],
          }),
        };
      case "DELETE_PLAYLIST":
        return {
          ...state,
          playlists: state.playlists.filter((item) => {
            return item.id !== action.payload.id;
          }),
        };
      case "ADD_TO_PLAYLIST":
        return {
          ...state,
          playlists: state.playlists.map((item) => {
            return item.title === action.payload.selectedPlayList
              ? {
                  ...item,
                  videos: item.videos.some(
                    (video) => video.id === action.payload.selectedVideo.id
                  )
                    ? item.videos
                    : item.videos.concat(action.payload.selectedVideo),
                }
              : item;
          }),
        };
      case "REMOVE_FROM_PLAYLIST":
        console.log({ action });
        return {
          ...state,
          playlists: state.playlists.map((item) => {
            return item.title === action.payload.selectedPlayList
              ? {
                  ...item,
                  videos: item.videos.filter(
                    (video) => video.id !== action.payload.selectedVideo.id
                  ),
                }
              : item;
          }),
        };
      default:
        console.log("Something went wrong");
        break;
    }
  };

  const [likeSaveState, likeSaveDispatch] = useReducer(likeSaveReducer, {
    likedVideos: [],
    history: [],
    notes: [],
    playlists: [
      {
        id: 1000,
        title: "Watch Later",
        videos: [],
      },
    ],
  });

  console.log(likeSaveState);

  return (
    <LikeSaveContext.Provider value={{ likeSaveState, likeSaveDispatch }}>
      {children}
    </LikeSaveContext.Provider>
  );
};

export const useLikeSave = () => {
  return useContext(LikeSaveContext);
};

// [
//   {
//     id:"",
//     name:'banana',
//     videos:[videoId]
//   }
// ]
