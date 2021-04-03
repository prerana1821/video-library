import { useData } from "./DataProvider";
import "./SideBar.css";

export const SideBar = ({ setRoute }) => {
  const { latestVideos, dispatch } = useData();

  // console.log(latestVideos);

  return (
    <div className='sidebar'>
      <div className='logo'>
        <img src='https://prekit.netlify.app/images/preCodes.png' alt='Logo' />
        <p className='logo-txt'>preTube</p>
      </div>
      <div className='profile'>
        <img
          className='avatar av-lg'
          src='https://prekit.netlify.app/images/person-1.jpg'
          alt='profile-img'
        />
        <h3>Siddhi Mejari</h3>
      </div>
      <div className='side-nav'>
        <label className='btn-latest'>
          <input
            type='checkbox'
            checked={latestVideos}
            onChange={() => dispatch({ type: "VIEW_LATEST" })}
          />
          Latest Videos
        </label>
        <button
          className='btn-nav'
          style={{ marginLeft: " -3rem" }}
          onClick={() => setRoute("videos")}
        >
          <i className='fas fa-home'></i>Home
        </button>
        <button className='btn-nav' onClick={() => setRoute("playlist")}>
          <i className='fas fa-folder'></i>My PlayList
        </button>
        <button className='btn-nav' onClick={() => setRoute("likedvideos")}>
          <i className='fas fa-thumbs-up'></i>Liked Videos
        </button>
        <button className='btn-nav' onClick={() => setRoute("savedvideos")}>
          <i className='far fa-clock'></i>Watch Later
        </button>
      </div>
    </div>
  );
};
