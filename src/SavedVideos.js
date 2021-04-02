import { useLikeSave } from "./Like&SaveProvider";

export const SavedVideos = () => {
  const { likeSaveState } = useLikeSave();

  return (
    <div>
      <h3>Saved Videos</h3>
      {likeSaveState.savedVideos.map((video) => {
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
            // onClick={() =>
            //   likeSaveDispatch({ type: "LIKE_VIDEO", payload: video })
            // }
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};
