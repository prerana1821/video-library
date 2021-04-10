import { useState } from "react";
import { useData } from "../Context";
import { NavLink } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const { dispatch, searchString } = useData();
  const [inputSearch, setInputSearch] = useState("");
  const [toggle, setToggle] = useState(true);

  return (
    <div>
      <header className='header'>
        <nav className='navbar'>
          <div className='logo'>
            <img
              src='https://prekit.netlify.app/images/preCodes.png'
              alt='Logo'
            />
            <p className='logo-txt'>preTube</p>
          </div>
          <ul className={toggle ? "nav-menu" : "nav-menu active"}>
            <div className='search'>
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
              {searchString && (
                <button
                  className='btn clr-search'
                  onClick={() => dispatch({ type: "CLEAR_SEARCH" })}
                >
                  Clear Search
                </button>
              )}
            </div>
            <li className='nav-item'>
              <NavLink
                to='/'
                end
                activeStyle={{
                  color: "var(--dk-pink)",
                }}
                className='nav-link'
              >
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                activeStyle={{
                  color: "var(--dk-pink)",
                }}
                to='/playlist'
              >
                PlayLists
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                activeStyle={{
                  color: "var(--dk-pink)",
                }}
                to='/history'
              >
                History
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                to='/liked-videos'
                activeStyle={{
                  color: "var(--dk-pink)",
                }}
              >
                Liked Videos
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink
                className='nav-link'
                to='/saved-videos'
                activeStyle={{
                  color: "var(--dk-pink)",
                }}
              >
                Watch Later
              </NavLink>
            </li>
            {/* <li className='nav-item'>
              <a href='#' className='nav-link'>
                Services
              </a>
            </li>
            <li className='nav-item'>
              <a href='#' className='nav-link'>
                Blog
              </a>
            </li>
            <li className='nav-item'>
              <a href='#' className='nav-link'>
                About
              </a>
            </li>
            <li className='nav-item'>
              <a href='#' className='nav-link'>
                Contact
              </a> 
            </li>*/}
          </ul>
          <div
            onClick={() => setToggle(!toggle)}
            className={toggle ? "hamburger" : "hamburger active"}
          >
            <span className='bar'></span>
            <span className='bar'></span>
            <span className='bar'></span>
          </div>
        </nav>
      </header>

      {/* <div className='header'>
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
      </div> */}
      {/* <div>
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
      </div> */}
    </div>
  );
};
