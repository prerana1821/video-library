import { useData } from "./DataProvider";
import { useLikeSave } from "./Like&SaveProvider";
import { usePlayList } from "./PlaylistProvider";
import { useState } from "react";

export const Videos = () => {
  const { latestData } = useData();
  const { likeSaveState, likeSaveDispatch } = useLikeSave();
  const { playListState, playListDispatch } = usePlayList();

  // console.log(playListState);
  // console.log(Object.keys(playListState));

  const playListsArray = Object.keys(playListState);

  const [selectedPlaylist, setSelectedPlaylist] = useState(playListsArray[0]);

  const likeUnLike = (item) => {
    return likeSaveState.likedVideos.reduce((acc, value) => {
      return value.id === item.id ? "Unlike" : acc;
    }, "Like");
  };

  const saveUnSave = (item) => {
    return likeSaveState.savedVideos.reduce((acc, value) => {
      return value.id === item.id ? "Remove from Watch Later" : acc;
    }, "Watch Later");
  };

  return (
    <div>
      <h2>Videos</h2>
      {latestData.map((video) => {
        return (
          <div key={video.id}>
            <iframe
              width='420'
              height='315'
              title={video.name}
              src={video.url}
            ></iframe>
            <h4>{video.name}</h4>
            <p>{video.date}</p>
            <label>
              Save to Play List
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
                  return <option value={playList}>{playList}</option>;
                })}
              </select>
            </label>
            <button
              onClick={() => {
                likeSaveState.likedVideos.reduce((acc, value) => {
                  return value.id === video.id
                    ? likeSaveDispatch({ type: "UNLIKE_VIDEO", payload: video })
                    : acc;
                }, likeSaveDispatch({ type: "LIKE_VIDEO", payload: video }));
              }}
            >
              {likeUnLike(video)}
            </button>
            <button
              onClick={() => {
                likeSaveState.likedVideos.reduce((acc, value) => {
                  return value.id === video.id
                    ? likeSaveDispatch({ type: "UNSAVE_VIDEO", payload: video })
                    : acc;
                }, likeSaveDispatch({ type: "SAVE_VIDEO", payload: video }));
              }}
            >
              {saveUnSave(video)}
            </button>
          </div>
        );
      })}
    </div>
  );
};
