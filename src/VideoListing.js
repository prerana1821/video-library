import { useData } from "./DataProvider";
import { useLikeSave } from "./Like&SaveProvider";
// import { usePlayList } from "./PlaylistProvider";
// import { useState } from "react";
import "./VideoListing.css";
import { Link } from "react-router-dom";

export const VideoListing = () => {
  const { latestData } = useData();
  const { likeSaveState, likeSaveDispatch } = useLikeSave();
  // const { playListState, playListDispatch } = usePlayList();

  // const playListsArray = Object.keys(playListState);

  // const [setSelectedPlaylist] = useState(playListsArray[0]);

  // const likeUnLike = (item) => {
  //   return likeSaveState.likedVideos.reduce((acc, value) => {
  //     return value.id === item.id ? "fas fa-lg fa-thumbs-up" : acc;
  //   }, "far fa-lg fa-thumbs-up");
  // };

  const saveUnSave = (item) => {
    return likeSaveState.savedVideos.reduce((acc, value) => {
      return value.id === item.id ? "fas fa-lg fa-clock" : acc;
    }, "far fa-lg fa-clock");
  };

  return (
    <div className='videos'>
      {latestData.map((video) => {
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
              <p>{video.date}</p>
              {/* <p>Category: {video.category}</p> */}
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
  );
};
