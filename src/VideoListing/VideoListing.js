import { useUserDetails, useData } from "../Context";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./VideoListing.css";
import { useAuth } from "../Auth";
import {
  addVideoToHistory,
  addVideoToPlaylist,
  deleteVideoFromPlaylist,
} from "../api-calls";
import { LoginAlert } from "../LoginAlert/LoginAlert";
import { Filters } from "../Fliters/Filters";
import { getWatchLaterPlayList, saveUnSave } from "../utils/viewOperations";

export const VideoListing = () => {
  const { categoryData } = useData();
  const { userDetailsState, userDetailsDispatch } = useUserDetails();
  const { login, user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const loginAlert = (msg) => {
    return setShowModal(true);
  };

  return (
    <div>
      <Filters />
      <div className='videos'>
        {categoryData.map((video) => {
          return (
            <Link to={`video/${video._id}`}>
              <div
                onClick={() =>
                  addVideoToHistory(user, video, userDetailsDispatch)
                }
                key={video._id}
                className='card'
              >
                <img
                  className='thumbnail'
                  src={video.thumbnail}
                  alt={video.name}
                />
                <h4>Name: {video.name}</h4>
                <div className='card-actions'>
                  <p>Published Date: {video.date}</p>
                  <button
                    className='btn-card-actions'
                    onClick={
                      login
                        ? (e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            userDetailsState.playlists.reduce((acc, value) => {
                              return value.title === "Watch Later" &&
                                value.videos.some(
                                  (item) => item.videoId._id === video._id
                                )
                                ? acc
                                : addVideoToPlaylist(
                                    user,
                                    value,
                                    video,
                                    userDetailsDispatch
                                  );
                            }, deleteVideoFromPlaylist(user, getWatchLaterPlayList(userDetailsState), video, userDetailsDispatch));
                          }
                        : (e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            loginAlert(
                              "Hey, you need to login in order to add video to watch later"
                            );
                          }
                    }
                  >
                    <div className='avatar av-sm av-pink'>
                      <i
                        className={saveUnSave(video, userDetailsState, login)}
                      ></i>
                    </div>
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {showModal && (
        <LoginAlert
          setShowModal={setShowModal}
          msg={"Hey, you need to login in order to add video to watch later"}
        />
      )}
    </div>
  );
};
