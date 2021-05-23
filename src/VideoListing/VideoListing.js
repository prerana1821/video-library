import { useUserDetails, useData } from "../Context";
import { Link } from "react-router-dom";
import "./VideoListing.css";
import { useAuth } from "../Auth";
import {
  addVideoToHistory,
  addVideoToPlaylist,
  deleteVideoFromPlaylist,
} from "../api-calls";

export const VideoListing = () => {
  const { data, latestVideos, categoryData, dispatch, loading } = useData();
  const { userDetailsState, userDetailsDispatch } = useUserDetails();
  const { user } = useAuth();
  const categories = [...new Set(data.map((item) => item.category))];

  const saveUnSave = (item) => {
    return userDetailsState.playlists.reduce((acc, value) => {
      return value.title === "Watch Later" &&
        value.videos.some((video) => video.videoId._id === item._id)
        ? "fas fa-lg fa-clock"
        : acc;
    }, "far fa-lg fa-clock");
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
                  () => addVideoToHistory(user, video, userDetailsDispatch)
                  // userDetailsDispatch({ type: "ADD_TO_HISTORY", payload: video })
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
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      userDetailsState.playlists.reduce(
                        (acc, value) => {
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
                          // userDetailsDispatch({
                          //     type: "ADD_TO_PLAYLIST",
                          //     payload: {
                          //       selectedPlayList: "Watch Later",
                          //       selectedVideo: video,
                          //     },
                          //   });
                        },
                        deleteVideoFromPlaylist(
                          user,
                          getWatchLaterPlayList(),
                          video,
                          userDetailsDispatch
                        )
                        // userDetailsDispatch({
                        //   type: "REMOVE_FROM_PLAYLIST",
                        //   payload: {
                        //     selectedPlayList: "Watch Later",
                        //     selectedVideo: video,
                        //   },
                        // })
                      );
                    }}
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
    </div>
  );
};
