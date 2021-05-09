import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../Context";
import "./WatchNext.css";

export const WatchNext = ({ video }) => {
  const { data } = useData();

  const categoryData = data.filter((item) => {
    return item.category === video.category;
  });

  return (
    <div>
      {categoryData.map((video) => {
        return (
          <Link to={`/video/${video.id}`} key={video.id}>
            <div className='watch-next-card' key={video.id}>
              <img
                className='watch-next-img'
                src={video.thumbnail}
                alt={video.name}
              />
              <div className='watch-next-desc'>
                <p>{video.name}</p>
                <small>Category: {video.category}</small>
                <small>Date: {video.date}</small>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
