import { useState } from "react";
import { Link } from "react-router-dom";

import { useLikeSave } from "../Context";
import "./PlayList.css";

export const PlayList = () => {
  const [createPlayList, setCreatePlayList] = useState("");
  const { likeSaveState, likeSaveDispatch } = useLikeSave();

  return (
    <div className='showcase-playlist'>
      <div className='create-playlist'>
        <h3>Create New Playlist:</h3>
        <input
          className='input-txt-error'
          type='text'
          value={createPlayList}
          onChange={(e) => setCreatePlayList(e.target.value)}
        />

        <button
          className='btn pink'
          onClick={() =>
            likeSaveDispatch({
              type: "CREATE_PLAYLIST",
              payload: createPlayList,
            })
          }
        >
          Save
        </button>
      </div>

      <div>
        {likeSaveState.playlists.map((playList) => {
          return (
            <div key={playList.id}>
              <div className='playlist-info'>
                {/* {editPlayListName && playList ? (
                  <input
                    type='text'
                    value={setNewPlayListName}
                    onChange={(e) => setNewPlayListName(e.target.value)}
                  />
                ) : ( */}
                <h3>{playList.title}</h3>
                {/* )} */}
                <button
                  className='btn-icon'
                  // onClick={() => {
                  //   console.log(playList);
                  //   console.log(playListsArray.playList);
                  //   playList === playListsArray[playList] &&
                  //     setEditPlayListName(!editPlayListName);
                  //   // playListDispatch({
                  //   //   type: "EDIT_PLAYLIST_NAME",
                  //   //   payload: { playList, newPlayListName },
                  //   // });
                  // }}
                >
                  <i className='fas fa-2x  fa-pen'></i>
                </button>
                <button
                  className='btn-icon'
                  onClick={() =>
                    likeSaveDispatch({
                      type: "DELETE_PLAYLIST",
                      payload: playList,
                    })
                  }
                >
                  <i className='fas fa-2x fa-trash-alt'></i>
                </button>
              </div>
              <div className='playlist-details'>
                {likeSaveState.playlists.map((playList) => {
                  return playList.videos.map((video) => {
                    return (
                      <Link to={`/video/${video.id}`}>
                        <div key={video.id} className='card'>
                          <img
                            className='thumbnail'
                            src={video.thumbnail}
                            alt={video.name}
                          />
                          <h4>{video.name}</h4>
                          <div className='card-actions'>
                            <p>Category: {video.category}</p>
                            <button
                              className='btn-icon'
                              onClick={(e) => {
                                e.preventDefault();
                                likeSaveDispatch({
                                  type: "REMOVE_FROM_PLAYLIST",
                                  payload: {
                                    selectedPlayList: playList.title,
                                    selectedVideo: video,
                                  },
                                });
                              }}
                            >
                              <i className='fas fa-2x fa-trash-alt'></i>
                            </button>
                          </div>
                        </div>
                      </Link>
                    );
                  });
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
