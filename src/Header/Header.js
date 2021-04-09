import { useState } from "react";
import { useData } from "../Context";
import "./Header.css";

export const Header = () => {
  const { data, dispatch } = useData();
  const [inputSearch, setInputSearch] = useState("");
  const categories = [...new Set(data.map((item) => item.category))];

  return (
    <div>
      <div className='header'>
        <div className='search-input'>
          <input
            type='text'
            className='search-txt'
            required
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            placeholder='Search...'
          />
          <button
            className='flt-icon'
            onClick={() => {
              dispatch({ type: "SEARCH", payload: inputSearch });
            }}
          >
            <span>
              <i className='fas fa-lg fa-search'></i>
            </span>
          </button>
        </div>
        <div className='header-nav'>
          <div className='badge-av'>
            <div className='badge-icn pink bdg-top'>4</div>
            <div className='avatar av-pink'>
              <i className='fas fa-lg fa-bell'></i>
            </div>
          </div>
          <div>
            <a className='github' href='https://github.com/prerana1821/prekit/'>
              <i className='fab fa-github'></i> View on Github
            </a>
          </div>
        </div>
      </div>
      <div>
        <ul>
          <button onClick={() => dispatch({ type: "CLEAR_CATEGORY" })}>
            All Videos
          </button>
          {categories.map((category) => {
            return (
              <li
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
    </div>
  );
};
