import { useLikeSave } from "./Like&SaveProvider";

export const LikedVideos = () => {
  const { likeSaveState, likeSaveDispatch } = useLikeSave();

  return (
    <div>
      <h3>Liked Videos</h3>
      {likeSaveState.likedVideos.map((video) => {
        return (
          <div className={video.id}>
            <iframe
              width='420'
              height='315'
              title={video.name}
              src={video.url}
            ></iframe>
            <h4>{video.name}</h4>
            <button
              onClick={() =>
                likeSaveDispatch({ type: "UNLIKE_VIDEO", payload: video })
              }
            >
              unLike
            </button>
          </div>
        );
      })}
    </div>
  );
};
