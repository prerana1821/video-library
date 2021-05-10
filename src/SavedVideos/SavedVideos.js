import { useLikeSave } from "../Context";
import { Link } from "react-router-dom";
import "./SavedVideos.css";

export const SavedVideos = () => {
  const { likeSaveState, likeSaveDispatch } = useLikeSave();

  return (
    <div>
      {likeSaveState.playlists.map((playList) => {
        return playList.title === "savedVideos" &&
          playList.videos.length === 0 ? (
          <div className='card empty-card'>
            <h3>No Saved Videos</h3>
            <hr className='hr' />
            <p className='mg-1'>You haven't saved any videos yet!</p>
            <Link to='/'>
              <button className='btn primary pink btn-shop'>Watch Now</button>
            </Link>
          </div>
        ) : (
          <div className='show-videos'>
            {playList.videos.map((video) => {
              return (
                <Link to={`/video/${video.id}`}>
                  <div key={video.id} className='card'>
                    <img
                      className='thumbnail'
                      src={video.thumbnail}
                      alt={video.name}
                    />
                    <h4>{video.name}</h4>
                    <div className='card-actions'>
                      <p>Category: {video.category}</p>
                      <button
                        className='btn-icon'
                        onClick={(e) => {
                          e.preventDefault();
                          likeSaveDispatch({
                            type: "REMOVE_FROM_PLAYLIST",
                            payload: {
                              selectedPlayList: "savedVideos",
                              selectedVideo: video,
                            },
                          });
                        }}
                      >
                        <i className='fas fa-2x fa-trash-alt'></i>
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
