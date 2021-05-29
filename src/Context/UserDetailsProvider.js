import { createContext, useContext, useReducer, useEffect } from "react";
import { userDetailsReducer } from "./userDetailsReducer";
import { useAuth } from "../Auth";
import axios from "axios";

export const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
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
          userDetailsDispatch({ type: "ADD_USER_DATA", payload: data });
        } catch (error) {
          userDetailsDispatch({
            type: "STATUS",
            payload: { error: "Sorry, try again later.." },
          });
        }
      })();
    }
  }, [login, user]);

  const [userDetailsState, userDetailsDispatch] = useReducer(
    userDetailsReducer,
    {
      loading: { loading: "", success: "", error: "" },
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
    }
  );

  console.log(userDetailsState);

  return (
    <UserDetailsContext.Provider
      value={{ userDetailsState, userDetailsDispatch }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = () => {
  return useContext(UserDetailsContext);
};
