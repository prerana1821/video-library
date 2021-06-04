import { useParams } from "react-router";
import { useUserDetails, useData } from "../Context";
import { useState } from "react";
import Markdown from "react-remarkable";
import { AddToPlayList } from "../AddToPlayList/AddToPlayList";
import { WatchNext } from "../WatchNext/WatchNext";
import "./Video.css";
import {
  getWatchLaterPlayList,
  likeUnLike,
  saveUnSave,
} from "../utils/viewOperations";
import { useAuth } from "../Auth";
import {
  addNoteToVideo,
  addVideoToLikedVideos,
  addVideoToPlaylist,
  deleteVideoFromLikedVideos,
  deleteVideoFromPlaylist,
  updateNoteOfVideo,
} from "../api-calls";
import { LoginAlert } from "../LoginAlert/LoginAlert";

let defaultNoteState = "";

export const Video = () => {
  const { userDetailsState, userDetailsDispatch } = useUserDetails();
  const { videoId } = useParams();
  const { data } = useData();
  const video = data.find((video) => video._id === videoId);
  const [addToPlaylistModal, setAddToPlaylistModal] = useState(false);
  if (videoId) {
    const foundNote = userDetailsState.notes.find((note) => {
      return note.videoId === videoId;
    });
    defaultNoteState = foundNote ? foundNote.note : "";
  }
  const [editNote, setEditNote] = useState(true);
  const [showNote, setShowNote] = useState(false);
  const [inputText, setInputText] = useState(defaultNoteState);
  const { user, token } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const loginAlert = (msg) => {
    return setShowModal(true);
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
        <div className='video-notes'>
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
                onClick={
                  token
                    ? () => {
                        setAddToPlaylistModal(!addToPlaylistModal);
                      }
                    : () => {
                        loginAlert("Hey, you need to login");
                      }
                }
              >
                <i className='fas fa-plus'></i> Save to Play List
              </button>
            </label>
            <button
              className='btn-card-actions'
              onClick={
                token
                  ? () => {
                      userDetailsState.playlists.reduce((acc, value) => {
                        return value.title === "Watch Later" &&
                          value.videos.some((item) => item.id === video._id)
                          ? acc
                          : addVideoToPlaylist(
                              user,
                              getWatchLaterPlayList(userDetailsState),
                              video,
                              userDetailsDispatch
                            );
                      }, deleteVideoFromPlaylist(user, getWatchLaterPlayList(userDetailsState), video, userDetailsDispatch));
                    }
                  : () => {
                      loginAlert("Hey, you need to login");
                    }
              }
            >
              <div className='avatar av-sm av-pink'>
                <i className={saveUnSave(video, userDetailsState, token)}></i>
              </div>
            </button>
            <button
              className='btn-card-actions'
              onClick={
                token
                  ? () => {
                      userDetailsState.likedVideos.reduce((acc, value) => {
                        return value.videoId._id === video._id
                          ? deleteVideoFromLikedVideos(
                              user,
                              video,
                              userDetailsDispatch
                            )
                          : acc;
                      }, addVideoToLikedVideos(user, video, userDetailsDispatch));
                    }
                  : () => {
                      loginAlert("Hey, you need to login");
                    }
              }
            >
              <div className='avatar av-sm av-pink'>
                <i className={likeUnLike(video, userDetailsState, token)}></i>
              </div>
            </button>
            <button
              className='avatar av-sm av-pink btn'
              onClick={
                token
                  ? () => {
                      setShowNote(!showNote);
                    }
                  : () => {
                      loginAlert("Hey, you need to login");
                    }
              }
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
                  const note = userDetailsState.notes.find(
                    (item) => item.videoId === videoId
                  );
                  const found = userDetailsState.notes.some(
                    (value) => value.videoId === videoId
                  );
                  found
                    ? updateNoteOfVideo(
                        user,
                        note,
                        inputText,
                        videoId,
                        userDetailsDispatch
                      )
                    : addNoteToVideo(
                        user,
                        inputText,
                        videoId,
                        userDetailsDispatch
                      );
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
      {showModal && (
        <LoginAlert
          setShowModal={setShowModal}
          msg={"Hey, you need to login"}
        />
      )}
    </div>
  );
};
