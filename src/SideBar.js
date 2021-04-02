import { useData } from "./DataProvider";

export const SideBar = ({ setRoute }) => {
  const { latestVideos, dispatch } = useData();

  // console.log(latestVideos);

  return (
    <div>
      <h2>Sidebar</h2>
      <div>
        <label>
          <input
            type='checkbox'
            checked={latestVideos}
            onChange={() => dispatch({ type: "VIEW_LATEST" })}
          />
          Latest Videos
        </label>
        <button onClick={() => setRoute("videos")}>Videos</button>
        <button onClick={() => setRoute("playlist")}>My PlayList</button>
        <button onClick={() => setRoute("likedvideos")}>Liked Videos</button>
        <button onClick={() => setRoute("savedvideos")}>Watch Later</button>
      </div>
    </div>
  );
};
