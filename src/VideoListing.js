import { useData } from "./DataProvider";
import { useLikeSave } from "./Like&SaveProvider";
import { Link } from "react-router-dom";
import "./VideoListing.css";

export const VideoListing = () => {
  const { categoryData, searchString, dispatch } = useData();
  const { likeSaveState, likeSaveDispatch } = useLikeSave();

  const saveUnSave = (item) => {
    return likeSaveState.savedVideos.reduce((acc, value) => {
      return value.id === item.id ? "fas fa-lg fa-clock" : acc;
    }, "far fa-lg fa-clock");
  };

  return (
    <div>
      {searchString && (
        <button onClick={() => dispatch({ type: "CLEAR_SEARCH" })}>
          Clear Search
        </button>
      )}
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
                <p>Published Date: {video.date}</p>
                <div className='card-actions'>
                  <button
                    className='btn-card-actions'
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      likeSaveState.savedVideos.reduce((acc, value) => {
                        return value.id === video.id
                          ? likeSaveDispatch({
                              type: "UNSAVE_VIDEO",
                              payload: video,
                            })
                          : acc;
                      }, likeSaveDispatch({ type: "SAVE_VIDEO", payload: video }));
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
