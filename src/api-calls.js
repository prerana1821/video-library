import axios from "axios";

export const addVideoToLikedVideos = async (user, video, dispatch) => {
  try {
    dispatch({ type: "STATUS", payload: "Adding video to liked videos" });
    const response = await axios.post(
      `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}/likedVideos`,
      {
        videoId: video._id,
      }
    );
    console.log({ response });
    if (response.status === 201) {
      dispatch({ type: "LIKE_VIDEO", payload: response.data.addedVideo });
    }
  } catch (error) {
    dispatch({
      type: "STATUS",
      payload: "Couldn't add video to liked videos..",
    });
  } finally {
    dispatch({ type: "STATUS", payload: "" });
  }
};

export const deleteVideoFromLikedVideos = async (user, video, dispatch) => {
  try {
    dispatch({
      type: "STATUS",
      payload: "Removing video from liked videos....",
    });
    const response = await axios.delete(
      `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}/likedVideos/${video._id}`
    );
    console.log({ response });
    if (response.status === 200) {
      dispatch({ type: "UNLIKE_VIDEO", payload: video });
    }
  } catch (error) {
    dispatch({
      type: "STATUS",
      payload: "Couldn't remove video from liked videos..",
    });
  } finally {
    dispatch({ type: "STATUS", payload: "" });
  }
};

export const addVideoToHistory = async (user, video, dispatch) => {
  try {
    const response = await axios.post(
      `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}/history`,
      {
        videoId: video._id,
      }
    );
    console.log({ response });
    if (response.status === 201) {
      dispatch({ type: "ADD_TO_HISTORY", payload: response.data.addedVideo });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideoFromHistory = async (user, video, dispatch) => {
  try {
    dispatch({
      type: "STATUS",
      payload: "Removing video from history....",
    });
    const response = await axios.delete(
      `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}/history/${video._id}`
    );
    console.log({ response });
    if (response.status === 200) {
      dispatch({ type: "REMOVE_FROM_HISTORY", payload: video });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: "STATUS",
      payload: "Couldn't remove video from history..",
    });
  } finally {
    dispatch({ type: "STATUS", payload: "" });
  }
};

export const clearHistory = async (user, dispatch) => {
  try {
    dispatch({
      type: "STATUS",
      payload: "Clearing History..",
    });
    const response = await axios.delete(
      `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}/history`
    );
    console.log({ response });
    if (response.status === 200) {
      dispatch({ type: "CLEAR_HISTORY" });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: "STATUS",
      payload: "Couldn't clear history",
    });
  } finally {
    dispatch({ type: "STATUS", payload: "" });
  }
};

export const createPlayListFromApi = async (user, playlistTitle, dispatch) => {
  try {
    dispatch({ type: "STATUS", payload: `Creating ${playlistTitle}` });
    const response = await axios.post(
      `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}/playlists`,
      {
        title: playlistTitle,
      }
    );
    console.log({ response });
    if (response.status === 201) {
      dispatch({ type: "CREATE_PLAYLIST", payload: response.data.playlist });
    }
  } catch (error) {
    dispatch({
      type: "STATUS",
      payload: `Couldn't create ${playlistTitle}`,
    });
  } finally {
    dispatch({ type: "STATUS", payload: "" });
  }
};

export const deletePlaylistFromApi = async (user, playlist, dispatch) => {
  try {
    dispatch({
      type: "STATUS",
      payload: `Removing ${playlist.title}....`,
    });
    const response = await axios.delete(
      `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}/playlists/${playlist._id}`
    );
    console.log({ response });
    if (response.status === 200) {
      dispatch({
        type: "DELETE_PLAYLIST",
        payload: response.data.playlist,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: "STATUS",
      payload: `Couldn't remove ${playlist.title}`,
    });
  } finally {
    dispatch({ type: "STATUS", payload: "" });
  }
};

export const addVideoToPlaylist = async (user, playlist, video, dispatch) => {
  console.log(playlist);
  try {
    dispatch({ type: "STATUS", payload: `Adding video to ${playlist.title}` });
    const response = await axios.post(
      `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}/playlists/${playlist._id}`,
      {
        videos: [
          ...playlist.videos,
          {
            videoId: video._id,
          },
        ],
      }
    );
    console.log({ response });
    if (response.status === 201) {
      dispatch({
        type: "ADD_TO_PLAYLIST",
        payload: response.data.playlist,
      });
    }
  } catch (error) {
    dispatch({
      type: "STATUS",
      payload: `Couldn't add video to ${playlist.title}..`,
    });
  } finally {
    dispatch({ type: "STATUS", payload: "" });
  }
};

export const deleteVideoFromPlaylist = async (
  user,
  playlist,
  video,
  dispatch
) => {
  try {
    console.log("play", { playlist });
    dispatch({
      type: "STATUS",
      payload: `Removing video from ${playlist.title}`,
    });
    const response = await axios.delete(
      `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}/playlists/${playlist._id}/${video._id}`
    );
    console.log({ response });
    if (response.status === 200) {
      dispatch({
        type: "REMOVE_FROM_PLAYLIST",
        payload: { selectedPlayList: playlist.title, selectedVideo: video },
      });
    }
  } catch (error) {
    dispatch({
      type: "STATUS",
      payload: `Couldn't add video to ${playlist.title}`,
    });
  } finally {
    dispatch({ type: "STATUS", payload: "" });
  }
};

export const addNoteToVideo = async (user, note, videoId, dispatch) => {
  try {
    dispatch({ type: "STATUS", payload: "Adding note" });
    const response = await axios.post(
      `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}/notes/${videoId}`,
      {
        note: note,
      }
    );
    console.log({ response });
    if (response.status === 201) {
      dispatch({ type: "ADD_NOTE", payload: response.data.note });
    }
  } catch (error) {
    dispatch({ type: "STATUS", payload: "Couldn't add note.." });
  } finally {
    dispatch({ type: "STATUS", payload: "" });
  }
};

export const updateNoteOfVideo = async (
  user,
  note,
  noteText,
  videoId,
  dispatch
) => {
  try {
    dispatch({ type: "STATUS", payload: "Updating note...." });
    const response = await axios.post(
      `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}/notes/${videoId}/${note._id}`,
      {
        note: noteText,
      }
    );
    console.log({ response });
    if (response.status === 200) {
      dispatch({ type: "SAVE_NOTE", payload: response.data.note });
    }
  } catch (error) {
    dispatch({ type: "STATUS", payload: "Couldn't update note..." });
  } finally {
    dispatch({ type: "STATUS", payload: "" });
  }
};
