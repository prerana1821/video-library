import { useLikeSave, useData } from "../Context";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./VideoListing.css";

export const VideoListing = () => {
  const { latestVideos, categoryData, searchString, dispatch } = useData();
  const { likeSaveState, likeSaveDispatch } = useLikeSave();
  const [inputSearch, setInputSearch] = useState("");

  const saveUnSave = (item) => {
    return likeSaveState.savedVideos.reduce((acc, value) => {
      return value.id === item.id ? "fas fa-lg fa-clock" : acc;
    }, "far fa-lg fa-clock");
  };

  return (
    <div>
      <div className='filters'>
        <label className='btn-latest'>
          <input
            type='checkbox'
            checked={latestVideos}
            onChange={() => dispatch({ type: "VIEW_LATEST" })}
          />
          Latest Videos
        </label>
        <div className='search'>
          <div className='search-input'>
            <input
              type='text'
              className='search-txt'
              required
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              placeholder='Search...'
            />
            <button
              className='flt-icon'
              onClick={() => {
                dispatch({ type: "SEARCH", payload: inputSearch });
              }}
            >
              <span>
                <i className='fas fa-lg fa-search'></i>
              </span>
            </button>
          </div>
          {searchString && (
            <button
              className='btn sec-pink clr-search'
              onClick={() => dispatch({ type: "CLEAR_SEARCH" })}
            >
              Clear Search
            </button>
          )}
        </div>
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
