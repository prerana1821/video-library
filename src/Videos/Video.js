import { useParams } from "react-router";
import { useLikeSave, useData } from "../Context";
import { useState } from "react";
import Markdown from "react-remarkable";
import { AddToPlayList } from "../AddToPlayList/AddToPlayList";
import { WatchNext } from "../WatchNext/WatchNext";
import "./Video.css";
import { useAuth } from "../Auth";
import {
  addVideoToLikedVideos,
  addVideoToPlaylist,
  deleteVideoFromLikedVideos,
  deleteVideoFromPlaylist,
} from "../api-calls";

export const Video = () => {
  const { likeSaveState, likeSaveDispatch } = useLikeSave();
  const { videoId } = useParams();
  const { data } = useData();
  const video = data.find((video) => video._id === videoId);
  const [addToPlaylistModal, setAddToPlaylistModal] = useState(false);
  const [editNote, setEditNote] = useState(true);
  const [showNote, setShowNote] = useState(false);
  const [inputText, setInputText] = useState("");
  const { user } = useAuth();

  const getWatchLaterPlayList = () => {
    return likeSaveState.playlists.find((item) => item.title === "Watch Later");
  };

  console.log(getWatchLaterPlayList());

  const likeUnLike = (item) => {
    return likeSaveState.likedVideos.reduce((acc, value) => {
      return value.videoId._id === item._id ? "fas fa-lg fa-thumbs-up" : acc;
    }, "far fa-lg fa-thumbs-up");
  };

  const saveUnSave = (item) => {
    return likeSaveState.playlists.reduce((acc, value) => {
      return value.title === "Watch Later" &&
        value.videos.some((video) => video.videoId._id === item._id)
        ? "fas fa-lg fa-clock"
        : acc;
    }, "far fa-lg fa-clock");
  };

  return (
    <div className='video-page'>
      <div className='single-video'>
        {addToPlaylistModal && (
          <div className='modal-add-playlist-bg'>
            <AddToPlayList
              setAddToPlaylistModal={setAddToPlaylistModal}
              video={video}
            />
          </div>
        )}
        <div
          className='video-notes'
          // onClick={addToPlaylistModal ? () => setAddToPlaylistModal(false) : null}
        >
          <div className='video'>
            <iframe
              width='100%'
              height='500px'
              style={{ borderRadius: "0.5rem" }}
              title={video.name}
              src={`https://www.youtube.com/embed/${video._id}?mute=0`}
            ></iframe>
          </div>
        </div>
        <div className='video-description'>
          <h3>{video.name}</h3>
          <div className='video-desc-details'>
            <p>Category: {video.category}</p>
            <p>Published Date: {video.date}</p>
          </div>
          <div className='video-desc-actions'>
            <label className='choose-playlist'>
              <button
                className='btn save-playlist-btn'
                onClick={(e) => {
                  setAddToPlaylistModal(!addToPlaylistModal);
                }}
              >
                <i className='fas fa-plus'></i> Save to Play List
              </button>
            </label>
            <button
              className='btn-card-actions'
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                likeSaveState.playlists.reduce(
                  (acc, value) => {
                    return value.title === "Watch Later" &&
                      value.videos.some((item) => item.id === video._id)
                      ? acc
                      : addVideoToPlaylist(
                          user,
                          value,
                          video,
                          likeSaveDispatch
                        );
                    // likeSaveDispatch({
                    //     type: "ADD_TO_PLAYLIST",
                    //     payload: {
                    //       selectedPlayList: "Watch Later",
                    //       selectedVideo: video,
                    //     },
                    //   });
                  },
                  deleteVideoFromPlaylist(
                    user,
                    getWatchLaterPlayList(),
                    video,
                    likeSaveDispatch
                  )
                  // likeSaveDispatch({
                  //   type: "REMOVE_FROM_PLAYLIST",
                  //   payload: {
                  //     selectedPlayList: "Watch Later",
                  //     selectedVideo: video,
                  //   },
                  // })
                );
              }}
            >
              <div className='avatar av-sm av-pink'>
                <i className={saveUnSave(video)}></i>
              </div>
            </button>
            <button
              className='btn-card-actions'
              onClick={() => {
                console.log("Hello");
                console.log(video);
                likeSaveState.likedVideos.reduce((acc, value) => {
                  console.log(value);
                  return value.videoId._id === video._id
                    ? deleteVideoFromLikedVideos(user, video, likeSaveDispatch)
                    : acc;
                }, addVideoToLikedVideos(user, video, likeSaveDispatch));
              }}
            >
              <div className='avatar av-sm av-pink'>
                <i className={likeUnLike(video)}></i>
              </div>
            </button>
            <button
              className='avatar av-sm av-pink btn'
              onClick={() => {
                setShowNote(!showNote);
              }}
            >
              {showNote ? (
                <i className='far fa-lg fa-sticky-note'></i>
              ) : (
                <i className='fas fa-lg fa-sticky-note'></i>
              )}
            </button>
          </div>
        </div>
        {showNote && (
          <div className='notes'>
            {editNote ? (
              <textarea
                className='input-notes'
                placeholder='Add Notes...also supports markdown!'
                onChange={(e) => setInputText(e.target.value)}
                value={inputText}
              ></textarea>
            ) : (
              <div className='display-notes'>
                <Markdown source={inputText}></Markdown>
              </div>
            )}
            <div className='video-note-actions'>
              <button
                className='btn pink'
                onClick={() => {
                  setEditNote(!editNote);
                  const found = likeSaveState.notes.some(
                    (value) => value.videoId === videoId
                  );
                  found
                    ? likeSaveDispatch({
                        type: "SAVE_NOTE",
                        payload: {
                          videoId: videoId,
                          note: inputText,
                        },
                      })
                    : likeSaveDispatch({
                        type: "ADD_NOTE",
                        payload: { videoId: videoId, note: inputText },
                      });
                }}
              >
                {editNote ? "Save Note" : "Edit Note"}
              </button>
              {editNote && (
                <button
                  className='btn pink'
                  onClick={() => setEditNote(!editNote)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <WatchNext video={video} />
    </div>
  );
};
