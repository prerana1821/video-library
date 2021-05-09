import React, { useState, useEffect } from "react";
import { useLikeSave } from "../Context";
import "./AddToPlayList.css";

export const AddToPlayList = ({ setAddToPlaylistModal, video }) => {
  const [addNewPlayList, setAddNewPlayList] = useState("");
  const { likeSaveState, likeSaveDispatch } = useLikeSave();
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.value]: event.target.checked,
    });
  };

  useEffect(() => {
    likeSaveState.playlists.forEach((playList) => {
      if (playList.title in checkedItems) {
        checkedItems[playList.title]
          ? likeSaveDispatch({
              type: "ADD_TO_PLAYLIST",
              payload: {
                selectedPlayList: playList.title,
                selectedVideo: video,
              },
            })
          : likeSaveDispatch({
              type: "REMOVE_FROM_PLAYLIST",
              payload: {
                selectedPlayList: playList.title,
                selectedVideo: video,
              },
            });
      }
    });
  }, [checkedItems]);

  return (
    <div className='modal-add-playlist'>
      <div className='modal-heading'>
        <h3>Add to Playlist</h3>
        <button
          className='modal-btn-close'
          onClick={() => setAddToPlaylistModal(false)}
        >
          <i className='far fa-lg fa-times-circle'></i>
        </button>
      </div>
      <div className='show-playlist'>
        {likeSaveState.playlists.map((playList) => {
          return (
            <p key={playList.id}>
              <label>
                <input
                  type='checkbox'
                  className='playlist-checkbox'
                  name={playList.title}
                  value={playList.title}
                  checked={
                    checkedItems[playList.title] ||
                    playList.videos.some((item) => item.id === video.id)
                  }
                  onChange={handleChange}
                />
                {playList.title}
              </label>
            </p>
          );
        })}
      </div>
      <hr className='add-playList-divider' />
      <div className='add-playlist'>
        <input
          type='text'
          value={addNewPlayList}
          className='add-playlist-input'
          placeholder='Add Playlist'
          onChange={(e) => {
            setAddNewPlayList(e.target.value);
          }}
        />
        <button
          className='add-playlist-btn'
          onClick={(e) => {
            likeSaveDispatch({
              type: "CREATE_PLAYLIST",
              payload: addNewPlayList,
            });
            setAddNewPlayList("");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

// (event) => {
//   setCheckedItems({
//     ...checkedItems,
//     [event.target.value]: event.target.checked,
//   });
//   console.log("called");
//   likeSaveState.playlists.forEach((playList) => {
//     console.log(checkedItems);
//     console.log(playList.title);
//     // if (checkedItems.hasOwnProperty(playList.title)) {
//     if (playList.title in checkedItems) {
//       console.log(checkedItems[playList.title]);
//       checkedItems[playList.title]
//         ? likeSaveDispatch({
//             type: "ADD_TO_PLAYLIST",
//             payload: {
//               selectedPlayList: playList.title,
//               selectedVideo: video,
//             },
//           })
//         : likeSaveDispatch({
//             type: "REMOVE_FROM_PLAYLIST",
//             payload: {
//               selectedPlayList: playList.title,
//               selectedVideo: video,
//             },
//           });
//     }
//   });
// };
