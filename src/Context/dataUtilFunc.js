export const getCategoryData = (videoList, category) => {
  if (category) {
    return videoList.filter((video) => {
      return video.category === category;
    });
  } else {
    return videoList;
  }
};

export const getLatestData = (videoList, latest) => {
  if (latest) {
    return videoList.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  } else {
    return videoList.sort(() => Math.random() - 0.5);
  }
};

export const getSearchedData = (videoList, searchString) => {
  if (searchString) {
    return videoList.filter((item) => {
      return item.name.toLowerCase().includes(searchString.toLowerCase());
    });
  } else {
    return videoList;
  }
};
