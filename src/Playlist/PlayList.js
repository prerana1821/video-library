import { useState } from "react";
import { Link } from "react-router-dom";
import {
  createPlayListFromApi,
  deletePlaylistFromApi,
  deleteVideoFromPlaylist,
} from "../api-calls";
import { useAuth } from "../Auth";

import { useUserDetails } from "../Context";
import "./PlayList.css";

export const PlayList = () => {
  const [createPlayList, setCreatePlayList] = useState("");
  const { userDetailsState, userDetailsDispatch } = useUserDetails();
  const { user } = useAuth();

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
          onClick={() => {
            createPlayListFromApi(user, createPlayList, userDetailsDispatch);
            setCreatePlayList("");
          }}
        >
          Save
        </button>
      </div>

      <div>
        {userDetailsState.playlists.map((playList) => {
          return playList.title !== "Watch Later" ? (
            <div key={playList._id}>
              <div className='playlist-info'>
                <h3>{playList.title}</h3>
                <button
                  className='btn-icon'
                  onClick={() =>
                    deletePlaylistFromApi(user, playList, userDetailsDispatch)
                  }
                >
                  <i className='fas fa-2x fa-trash-alt'></i>
                </button>
              </div>
              <div className='playlist-details'>
                {playList.videos.map(({ videoId: video }) => {
                  return (
                    <Link to={`/video/${video._id}`}>
                      <div key={video._id} className='card'>
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
                              deleteVideoFromPlaylist(
                                user,
                                playList,
                                video,
                                userDetailsDispatch
                              );
                            }}
                          >
                            <i className='fas fa-2x fa-trash-alt'></i>
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};
