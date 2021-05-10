import { useLikeSave, useData } from "../Context";
import { Link } from "react-router-dom";
import "./VideoListing.css";

export const VideoListing = () => {
  const { data, latestVideos, categoryData, dispatch } = useData();
  const { likeSaveState, likeSaveDispatch } = useLikeSave();

  const categories = [...new Set(data.map((item) => item.category))];

  const saveUnSave = (item) => {
    return likeSaveState.playlists.reduce((acc, value) => {
      return value.title === "Watch Later" &&
        value.videos.some((video) => video.id === item.id)
        ? "fas fa-lg fa-clock"
        : acc;
    }, "far fa-lg fa-clock");
  };

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
            <Link to={`video/${video.id}`}>
              <div
                onClick={() =>
                  likeSaveDispatch({ type: "ADD_TO_HISTORY", payload: video })
                }
                key={video.id}
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
                      likeSaveState.playlists.reduce(
                        (acc, value) => {
                          return value.title === "Watch Later" &&
                            value.videos.some((item) => item.id === video.id)
                            ? acc
                            : likeSaveDispatch({
                                type: "ADD_TO_PLAYLIST",
                                payload: {
                                  selectedPlayList: "Watch Later",
                                  selectedVideo: video,
                                },
                              });
                        },
                        likeSaveDispatch({
                          type: "REMOVE_FROM_PLAYLIST",
                          payload: {
                            selectedPlayList: "Watch Later",
                            selectedVideo: video,
                          },
                        })
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
