import { useUserDetails } from "../Context";
import { Link } from "react-router-dom";
import { deleteVideoFromLikedVideos } from "../api-calls";
import { useAuth } from "../Auth";

export const LikedVideos = () => {
  const { user } = useAuth();
  const { userDetailsState, userDetailsDispatch } = useUserDetails();

  return (
    <div>
      {userDetailsState.likedVideos.length === 0 ? (
        <div className='card empty-card'>
          <h3>No Liked Videos</h3>
          <hr className='hr' />
          <p className='mg-1'>You haven't liked any videos yet!</p>
          <Link to='/'>
            <button className='btn primary pink btn-shop'>Watch Now</button>
          </Link>
        </div>
      ) : (
        <div className='show-videos'>
          {userDetailsState.likedVideos.map(({ videoId: video }) => {
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
                        deleteVideoFromLikedVideos(
                          user,
                          video,
                          userDetailsDispatch
                        );
                      }}
                    >
                      <i className='fas  fa-2x fa-thumbs-down'></i>
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
