import { useState } from "react";
import { usePlayList } from "./PlaylistProvider";

export const PlayList = () => {
  const [createPlayList, setCreatePlayList] = useState("");

  const { playListState, playListDispatch } = usePlayList();

  // console.log({ playListState });

  const playListsArray = Object.keys(playListState);

  return (
    <div>
      <h3>PlayLists</h3>
      <div>
        <label>
          Create New Playlist:
          <input
            type='text'
            value={createPlayList}
            onChange={(e) => setCreatePlayList(e.target.value)}
          />
        </label>
        <button
          onClick={() =>
            playListDispatch({
              type: "CREATE_PLAYLIST",
              payload: createPlayList,
            })
          }
        >
          Save
        </button>
      </div>

      <div>
        {playListsArray.map((playList) => {
          return (
            <div key={playList}>
              <h4>{playList}</h4>
              <div>
                {playListState[playList].map((video) => {
                  return (
                    <div key={video.id}>
                      <iframe
                        width='420'
                        height='315'
                        title={video.name}
                        src={video.url}
                      ></iframe>
                      <h4>{video.name}</h4>
                      <button
                        onClick={() =>
                          playListDispatch({
                            type: "DELETE_FROM_PLAYLIST",
                            payload: {
                              selectedPlayList: playList,
                              video,
                            },
                          })
                        }
                      >
                        Remove from Playlist
                      </button>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() =>
                  playListDispatch({
                    type: "DELETE_PLAYLIST",
                    payload: playList,
                  })
                }
              >
                Delete PlayList
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
