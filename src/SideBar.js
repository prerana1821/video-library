export const SideBar = ({ setRoute }) => {
  return (
    <div>
      <h2>Sidebar</h2>
      <div>
        <button onClick={() => setRoute("videos")}>Videos</button>
        <button onClick={() => setRoute("likedvideos")}>Liked Videos</button>
        <button onClick={() => setRoute("savedvideos")}>Watch Later</button>
      </div>
    </div>
  );
};
