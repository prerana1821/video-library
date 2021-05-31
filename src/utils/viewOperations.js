export const getWatchLaterPlayList = (userDetailsState) => {
  return userDetailsState.playlists.find(
    (item) => item.title === "Watch Later"
  );
};

export const likeUnLike = (item, userDetailsState, token) => {
  return token
    ? userDetailsState.likedVideos.reduce((acc, value) => {
        return value.videoId._id === item._id ? "fas fa-lg fa-thumbs-up" : acc;
      }, "far fa-lg fa-thumbs-up")
    : "far fa-lg fa-thumbs-up";
};

export const saveUnSave = (item, userDetailsState, token) => {
  return token
    ? userDetailsState.playlists.reduce((acc, value) => {
        return value.title === "Watch Later" &&
          value.videos.some((video) => video.videoId._id === item._id)
          ? "fas fa-lg fa-clock"
          : acc;
      }, "far fa-lg fa-clock")
    : "far fa-lg fa-clock";
};
