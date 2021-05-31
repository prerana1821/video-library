import { createContext, useContext, useReducer, useEffect } from "react";
import { userDetailsReducer } from "./userDetailsReducer";
import { useAuth } from "../Auth";
import axios from "axios";

export const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
  const { token, user } = useAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const response = await axios.get(
            `https://api-pretube.prerananawar1.repl.co/userDetails`
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
  }, [token, user]);

  const [userDetailsState, userDetailsDispatch] = useReducer(
    userDetailsReducer,
    {
      status: { loading: "", success: "", error: "" },
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
