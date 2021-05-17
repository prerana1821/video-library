import axios from "axios";

export const addVideoToLikedVideos = async (user, video, dispatch) => {
  try {
    // dispatch({ type: "STATUS", payload: "Item Adding to Cart...." });

    console.log("here");

    const response = await axios.post(
      `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}/likedVideos`,
      {
        videoId: video._id,
      }
    );
    console.log({ response });
    if (response.status === 201) {
      dispatch({ type: "LIKE_VIDEO", payload: response.data.addedVideo });
    }
  } catch (error) {
    // dispatch({ type: "STATUS", payload: "Couldn't add item to cart.." });
  } finally {
    // dispatch({ type: "STATUS", payload: "" });
  }
};

export const deleteVideoFromLikedVideos = async (user, video, dispatch) => {
  console.log("cool");
  try {
    // dispatch({
    //   type: "STATUS",
    //   payload: "Removing Item from Cart....",
    // });
    const response = await axios.delete(
      `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}/likedVideos/${video._id}`
    );
    console.log({ response });
    if (response.status === 200) {
      dispatch({ type: "UNLIKE_VIDEO", payload: video });
    }
  } catch (error) {
    // dispatch({
    //   type: "STATUS",
    //   payload: "Couldn't remove item to cart..",
    // });
  } finally {
    // dispatch({ type: "STATUS", payload: "" });
  }
};
