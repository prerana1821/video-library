import { useState } from "react";
import { usePlayList } from "./PlaylistProvider";

export const PlayList = () => {
  const [createPlayList, setCreatePlayList] = useState("");

  const { playListState, playListDispatch } = usePlayList();

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
              <button>View PlayList</button>
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
