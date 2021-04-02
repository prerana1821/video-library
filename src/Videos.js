import { useData } from "./DataProvider";
import { useLikeSave } from "./Like&SaveProvider";

export const Videos = () => {
  const { latestData } = useData();
  const { likeSaveState, likeSaveDispatch } = useLikeSave();

  const likeUnLike = (item) => {
    return likeSaveState.likedVideos.reduce((acc, value) => {
      return value.id === item.id ? "Unlike" : acc;
    }, "Like");
  };

  const saveUnSave = (item) => {
    return likeSaveState.savedVideos.reduce((acc, value) => {
      return value.id === item.id ? "Remove from Watch Later" : acc;
    }, "Watch Later");
  };

  return (
    <div>
      <h2>Videos</h2>
      {latestData.map((video) => {
        return (
          <div key={video.id}>
            <iframe
              width='420'
              height='315'
              title={video.name}
              src={video.url}
            ></iframe>
            <h4>{video.name}</h4>
            <p>{video.date}</p>
            <button
              onClick={() => {
                likeSaveState.likedVideos.reduce((acc, value) => {
                  return value.id === video.id
                    ? likeSaveDispatch({ type: "UNLIKE_VIDEO", payload: video })
                    : acc;
                }, likeSaveDispatch({ type: "LIKE_VIDEO", payload: video }));
              }}
            >
              {likeUnLike(video)}
            </button>
            <button
              onClick={() => {
                likeSaveState.likedVideos.reduce((acc, value) => {
                  return value.id === video.id
                    ? likeSaveDispatch({ type: "UNSAVE_VIDEO", payload: video })
                    : acc;
                }, likeSaveDispatch({ type: "SAVE_VIDEO", payload: video }));
              }}
            >
              {saveUnSave(video)}
            </button>
          </div>
        );
      })}
    </div>
  );
};
