import { useParams } from "react-router";
import { useData } from "./DataProvider";
import { usePlayList } from "./PlaylistProvider";
import { useLikeSave } from "./Like&SaveProvider";
import { useState } from "react";
import "./Video.css";

export const Video = () => {
  const { videoId } = useParams();
  const { data } = useData();
  const { likeSaveState, likeSaveDispatch } = useLikeSave();

  const video = data.find((video) => video.id === videoId);

  const { playListState, playListDispatch } = usePlayList();

  const playListsArray = Object.keys(playListState);

  const [selectedPlaylist, setSelectedPlaylist] = useState(playListsArray[0]);

  const likeUnLike = (item) => {
    return likeSaveState.likedVideos.reduce((acc, value) => {
      return value.id === item.id ? "fas fa-lg fa-thumbs-up" : acc;
    }, "far fa-lg fa-thumbs-up");
  };

  return (
    <div className='video'>
      <div>
        <iframe
          width='80%'
          height='500px'
          title={video.name}
          src={video.url}
        ></iframe>
        <div className='video-description'>
          <h3>{video.name}</h3>
          <p>Published Date: {video.date}</p>
          <p>Category: {video.category}</p>
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
              value={selectedPlaylist}
            >
              {playListsArray.map((playList) => {
                return (
                  <option value={playList} key={playList}>
                    {playList}
                  </option>
                );
              })}
            </select>
          </label>
          <button
            className='btn-card-actions'
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
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
        </div>
      </div>
    </div>
  );
};
