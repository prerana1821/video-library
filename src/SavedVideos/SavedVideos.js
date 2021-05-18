import { useLikeSave } from "../Context";
import { Link } from "react-router-dom";
import "./SavedVideos.css";
import { deleteVideoFromPlaylist } from "../api-calls";
import { useAuth } from "../Auth";

export const SavedVideos = () => {
  const { likeSaveState, likeSaveDispatch } = useLikeSave();
  const { user } = useAuth();

  return (
    <div>
      {likeSaveState.playlists.map((playList) => {
        return playList.title === "Watch Later" &&
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
            {playList.title === "Watch Later"
              ? playList.videos.map(({ videoId: video }) => {
                  return (
                    <Link to={`/video/${video._id}`}>
                      <div key={video._id} className='card'>
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
                              // likeSaveDispatch({
                              //   type: "REMOVE_FROM_PLAYLIST",
                              //   payload: {
                              //     selectedPlayList: "Watch Later",
                              //     selectedVideo: video,
                              //   },
                              // });
                              deleteVideoFromPlaylist(
                                user,
                                playList,
                                video,
                                likeSaveDispatch
                              );
                            }}
                          >
                            <i className='fas fa-2x fa-trash-alt'></i>
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                })
              : null}
          </div>
        );
      })}
    </div>
  );
};
