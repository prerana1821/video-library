import { createContext, useContext, useReducer, useEffect } from "react";
import { v4 } from "uuid";
import { useAuth } from "../Auth";
import axios from "axios";

export const LikeSaveContext = createContext();

let playListId = 0;

export const LikeSaveProvider = ({ children }) => {
  const { login, user } = useAuth();

  useEffect(() => {
    if (login) {
      (async () => {
        try {
          const response = await axios.get(
            `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}`
          );
          console.log({ response });
          const data = response.data.userDetails;
          likeSaveDispatch({ type: "ADD_USER_DATA", payload: data });
        } catch (error) {
          // dispatch({ type: "STATUS", payload: "Sorry, try again later.." });
        } finally {
          // dispatch({ type: "STATUS", payload: "" });
        }
      })();
    }
  }, [login, user]);

  const likeSaveReducer = (state, action) => {
    switch (action.type) {
      case "ADD_USER_DATA":
        return action.payload;
      case "LIKE_VIDEO":
        return {
          ...state,
          likedVideos: state.likedVideos.concat(action.payload),
        };
      case "UNLIKE_VIDEO":
        return {
          ...state,
          likedVideos: state.likedVideos.filter((item) => {
            return item.videoId._id !== action.payload._id;
          }),
        };
      case "ADD_NOTE":
        return {
          ...state,
          notes: state.notes.concat(action.payload),
        };
      case "SAVE_NOTE":
        return {
          ...state,
          notes: state.notes.map((item) => {
            return item.videoId === action.payload.videoId
              ? action.payload
              : item;
          }),
        };
      case "ADD_TO_HISTORY":
        return {
          ...state,
          history: state.history.some(
            (ele) => ele.videoId._id === action.payload._id
          )
            ? state.history
            : state.history.concat(action.payload),
        };
      case "REMOVE_FROM_HISTORY":
        return {
          ...state,
          history: state.history.filter((item) => {
            return item.videoId._id !== action.payload._id;
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
          playlists: state.playlists.concat(action.payload),
        };
      case "DELETE_PLAYLIST":
        return {
          ...state,
          playlists: state.playlists.filter((item) => {
            return item._id !== action.payload._id;
          }),
        };
      case "ADD_TO_PLAYLIST":
        return {
          ...state,
          playlists: state.playlists.map((item) => {
            return item._id === action.payload._id ? action.payload : item;
          }),
        };
      case "REMOVE_FROM_PLAYLIST":
        return {
          ...state,
          playlists: state.playlists.map((item) => {
            return item.title === action.payload.selectedPlayList
              ? {
                  ...item,
                  videos: item.videos.filter(
                    (video) =>
                      video.videoId._id !== action.payload.selectedVideo._id
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
        _id: 1000,
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
