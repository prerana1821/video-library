import { useUserDetails } from "../Context";
import { Link } from "react-router-dom";
import "./History.css";
import { clearHistory, deleteVideoFromHistory } from "../api-calls";
import { useAuth } from "../Auth";

export const History = () => {
  const { userDetailsState, userDetailsDispatch } = useUserDetails();
  const { user } = useAuth();

  return (
    <div>
      {userDetailsState.history.length === 0 ? (
        <div className='card empty-card'>
          <h3>No Watched Videos</h3>
          <hr className='hr' />
          <p className='mg-1'>You haven't watch any videos yet!</p>
          <Link to='/'>
            <button className='btn primary pink btn-shop'>Watch Now</button>
          </Link>
        </div>
      ) : (
        <div>
          <button
            className='btn sec-pink'
            onClick={() =>
              // userDetailsDispatch({
              //   type: "CLEAR_HISTORY",
              // })
              clearHistory(user, userDetailsDispatch)
            }
          >
            Clear All History
          </button>
          <div className='show-videos'>
            {userDetailsState.history.map(({ videoId: video }) => {
              console.log(video);
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
                          // userDetailsDispatch({
                          //   type: "REMOVE_FROM_HISTORY",
                          //   payload: video,
                          // });
                          deleteVideoFromHistory(
                            user,
                            video,
                            userDetailsDispatch
                          );
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
        </div>
      )}
    </div>
  );
};
