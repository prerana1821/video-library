import React from "react";
import { useData } from "../Context";

export const Filters = () => {
  const { data, latestVideos, dispatch, loading } = useData();
  const categories = [...new Set(data.map((item) => item.category))];

  return (
    <>
      <div className='filters'>
        <div>
          <ul className='categories'>
            <button
              className='category'
              onClick={() => dispatch({ type: "CLEAR_CATEGORY" })}
            >
              <li>All Videos</li>
            </button>
            <h1>{loading}</h1>
            {categories.map((category) => {
              return (
                <li
                  className='category'
                  onClick={() => {
                    console.log(category);
                    dispatch({ type: "VIEW_BY_CATEGORY", payload: category });
                  }}
                  key={category}
                >
                  {category}
                </li>
              );
            })}
          </ul>
        </div>
        <label className='btn-latest'>
          <input
            type='checkbox'
            checked={latestVideos}
            onChange={() => dispatch({ type: "VIEW_LATEST" })}
          />
          Latest Videos
        </label>
      </div>
    </>
  );
};
