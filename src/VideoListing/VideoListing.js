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

export const VideoListing = () => {
  const { data, latestVideos, categoryData, dispatch, loading } = useData();
  const { userDetailsState, userDetailsDispatch } = useUserDetails();
  const { login, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const categories = [...new Set(data.map((item) => item.category))];

  const loginAlert = (msg) => {
    console.log("alert");
    return setShowModal(true);
  };

  const saveUnSave = (item) => {
    return user
      ? userDetailsState.playlists.reduce((acc, value) => {
          return value.title === "Watch Later" &&
            value.videos.some((video) => video.videoId._id === item._id)
            ? "fas fa-lg fa-clock"
            : acc;
        }, "far fa-lg fa-clock")
      : "far fa-lg fa-clock";
  };

  const getWatchLaterPlayList = () => {
    return userDetailsState.playlists.find(
      (item) => item.title === "Watch Later"
    );
  };

  console.log(getWatchLaterPlayList());

  return (
    <div>
      <div className='filters'>
        <div>
          <ul className='categories'>
            <button
              className='category'
              onClick={() => dispatch({ type: "CLEAR_CATEGORY" })}
            >
              <li>All Videos</li>
            </button>
            <h1>{loading}</h1>
            {categories.map((category) => {
              return (
                <li
                  className='category'
                  onClick={() => {
                    console.log(category);
                    dispatch({ type: "VIEW_BY_CATEGORY", payload: category });
                  }}
                  key={category}
                >
                  {category}
                </li>
              );
            })}
          </ul>
        </div>
        <label className='btn-latest'>
          <input
            type='checkbox'
            checked={latestVideos}
            onChange={() => dispatch({ type: "VIEW_LATEST" })}
          />
          Latest Videos
        </label>
      </div>
      <div className='videos'>
        {categoryData.map((video) => {
          return (
            <Link to={`video/${video._id}`}>
              <div
                onClick={
                  login
                    ? () => addVideoToHistory(user, video, userDetailsDispatch)
                    : (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        loginAlert(
                          "Hey, you need to login in order to add video to watch later"
                        );
                      }
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
                            }, deleteVideoFromPlaylist(user, getWatchLaterPlayList(), video, userDetailsDispatch));
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
                      <i className={saveUnSave(video)}></i>
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
