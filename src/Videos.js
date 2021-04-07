import { useData } from "./DataProvider";
import { useLikeSave } from "./Like&SaveProvider";
import { usePlayList } from "./PlaylistProvider";
import { useState } from "react";
import "./Videos.css";

export const Videos = () => {
  const { categoryData } = useData();
  const { likeSaveState, likeSaveDispatch } = useLikeSave();
  const { playListState, playListDispatch } = usePlayList();

  // console.log(playListState);
  // console.log(Object.keys(playListState));

  const playListsArray = Object.keys(playListState);

  const [selectedPlaylist, setSelectedPlaylist] = useState(playListsArray[0]);

  const likeUnLike = (item) => {
    return likeSaveState.likedVideos.reduce((acc, value) => {
      return value.id === item.id ? "fas fa-lg fa-thumbs-up" : acc;
    }, "far fa-lg fa-thumbs-up");
  };

  const saveUnSave = (item) => {
    return likeSaveState.savedVideos.reduce((acc, value) => {
      return value.id === item.id ? "fas fa-lg fa-clock" : acc;
    }, "far fa-lg fa-clock");
  };

  return (
    <div className='videos'>
      {categoryData.map((video) => {
        return (
          <div key={video.id} className='card'>
            <iframe
              width='420'
              height='315'
              title={video.name}
              src={video.url}
            ></iframe>
            <h4>Name: {video.name}</h4>
            <p>Published Date: {video.date}</p>
            <p>Category: {video.category}</p>
            <div className='card-actions'>
              <label className='choose-playlist'>
                Save to Play List:
                <select
                  onChange={(e) => {
                    setSelectedPlaylist(e.target.value);
                    return playListDispatch({
                      type: "SAVE_TO_PLAYLIST",
                      payload: {
                        selectedPlayList: e.target.value,
                        selectedVideo: video,
                      },
                    });
                  }}
                  // value={selectedPlaylist}
                >
                  {playListsArray.map((playList) => {
                    return <option value={playList}>{playList}</option>;
                  })}
                </select>
              </label>
              <button
                className='btn-card-actions'
                onClick={() => {
                  likeSaveState.likedVideos.reduce((acc, value) => {
                    return value.id === video.id
                      ? likeSaveDispatch({
                          type: "UNLIKE_VIDEO",
                          payload: video,
                        })
                      : acc;
                  }, likeSaveDispatch({ type: "LIKE_VIDEO", payload: video }));
                }}
              >
                <div className='avatar av-sm av-pink'>
                  <i className={likeUnLike(video)}></i>
                </div>
              </button>
              <button
                className='btn-card-actions'
                onClick={() => {
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
        );
      })}
    </div>
  );
};
