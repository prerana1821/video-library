import { useData } from "./DataProvider";
import { useLikeSave } from "./Like&SaveProvider";

export const Videos = () => {
  const { state } = useData();
  const { likeSaveDispatch } = useLikeSave();
  return (
    <div>
      <h2>Videos</h2>
      {state.map((video) => {
        return (
          <div key={video.id}>
            <iframe
              width='420'
              height='315'
              title={video.name}
              src={video.url}
            ></iframe>
            <h4>{video.name}</h4>
            <button
              onClick={() =>
                likeSaveDispatch({ type: "LIKE_VIDEO", payload: video })
              }
            >
              Like
            </button>
            <button
              onClick={() =>
                likeSaveDispatch({ type: "SAVE_VIDEO", payload: video })
              }
            >
              Watch Later
            </button>
          </div>
        );
      })}
    </div>
  );
};
