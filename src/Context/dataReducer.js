export const dataReducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return { ...state, data: action.payload };
    case "STATUS":
      return {
        ...state,
        status: action.payload,
      };
    case "VIEW_BY_CATEGORY":
      return { ...state, viewByCategory: action.payload };
    case "CLEAR_CATEGORY":
      return { ...state, viewByCategory: "" };
    case "VIEW_LATEST":
      return { ...state, latestVideos: !state.latestVideos };
    case "SEARCH":
      return { ...state, searchString: action.payload };
    case "CLEAR_SEARCH":
      return { ...state, searchString: "" };
    default:
      console.log("Something went wrong");
      break;
  }
};
