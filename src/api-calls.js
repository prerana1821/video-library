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

export const addVideoToHistory = async (user, video, dispatch) => {
  try {
    // dispatch({ type: "STATUS", payload: "Item Adding to Cart...." });
    const response = await axios.post(
      `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}/history`,
      {
        videoId: video._id,
      }
    );
    console.log({ response });
    if (response.status === 201) {
      dispatch({ type: "ADD_TO_HISTORY", payload: response.data.addedVideo });
    }
  } catch (error) {
    // dispatch({ type: "STATUS", payload: "Couldn't add item to cart.." });
  } finally {
    // dispatch({ type: "STATUS", payload: "" });
  }
};

export const deleteVideoFromHistory = async (user, video, dispatch) => {
  try {
    // dispatch({
    //   type: "STATUS",
    //   payload: "Removing Item from Cart....",
    // });
    const response = await axios.delete(
      `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}/history/${video._id}`
    );
    console.log({ response });
    if (response.status === 200) {
      dispatch({ type: "REMOVE_FROM_HISTORY", payload: video });
    }
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: "STATUS",
    //   payload: "Couldn't remove item to cart..",
    // });
  } finally {
    // dispatch({ type: "STATUS", payload: "" });
  }
};

export const clearHistory = async (user, dispatch) => {
  try {
    // dispatch({
    //   type: "STATUS",
    //   payload: "Removing Item from Cart....",
    // });
    const response = await axios.delete(
      `https://api-pretube.prerananawar1.repl.co/userDetails/${user._id}/history`
    );
    console.log({ response });
    if (response.status === 200) {
      dispatch({ type: "CLEAR_HISTORY" });
    }
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: "STATUS",
    //   payload: "Couldn't remove item to cart..",
    // });
  } finally {
    // dispatch({ type: "STATUS", payload: "" });
  }
};
