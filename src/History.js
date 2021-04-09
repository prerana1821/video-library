import { useLikeSave } from "./Like&SaveProvider";

export const History = () => {
  const { likeSaveState, likeSaveDispatch } = useLikeSave();

  //   console.log(likeSaveState);

  return (
    <div>
      <div>
        <button
          onClick={() =>
            likeSaveDispatch({
              type: "CLEAR_HISTORY",
            })
          }
        >
          Clear All History
        </button>
      </div>
      <div>
        {likeSaveState.history.map((video) => {
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
                  likeSaveDispatch({
                    type: "REMOVE_FROM_HISTORY",
                    payload: video,
                  })
                }
              >
                Remove from History
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
