import React, { useState, useEffect } from "react";
import {
  addVideoToPlaylist,
  createPlayListFromApi,
  deleteVideoFromPlaylist,
} from "../api-calls";
import { useAuth } from "../Auth";
import { useUserDetails } from "../Context";
import "./AddToPlayList.css";

export const AddToPlayList = ({ setAddToPlaylistModal, video }) => {
  const [addNewPlayList, setAddNewPlayList] = useState("");
  const { userDetailsState, userDetailsDispatch } = useUserDetails();
  const [checkedItems, setCheckedItems] = useState({});
  const { user } = useAuth();

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.value]: event.target.checked,
    });
  };

  useEffect(() => {
    userDetailsState.playlists.forEach((playList) => {
      if (playList.title in checkedItems) {
        checkedItems[playList.title]
          ? addVideoToPlaylist(user, playList, video, userDetailsDispatch)
          : deleteVideoFromPlaylist(user, playList, video, userDetailsDispatch);
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
        {userDetailsState.playlists.map((playList) => {
          return (
            <p key={playList._id}>
              <label>
                <input
                  type='checkbox'
                  className='playlist-checkbox'
                  name={playList.title}
                  value={playList.title}
                  checked={
                    checkedItems[playList.title] ||
                    playList.videos.some(
                      (item) => item.videoId._id === video._id
                    )
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
            createPlayListFromApi(user, addNewPlayList, userDetailsDispatch);
            setAddNewPlayList("");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
