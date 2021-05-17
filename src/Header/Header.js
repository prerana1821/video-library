import { useState } from "react";
import { useData } from "../Context";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../Auth";

export const Header = () => {
  const { dispatch, searchString } = useData();
  const [inputSearch, setInputSearch] = useState("");
  const [toggle, setToggle] = useState(true);
  const { login } = useAuth();

  return (
    <div>
      <header className='header'>
        <nav className='navbar'>
          <div className='logo'>
            <img
              src='https://prekit.netlify.app/images/preCodes.png'
              alt='Logo'
            />
            <Link to='/'>
              <p className='logo-txt'>preTube</p>
            </Link>
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
                  onClick={() => {
                    setInputSearch("");
                    dispatch({ type: "CLEAR_SEARCH" });
                  }}
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
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                to={login ? "/account" : "/login"}
                activeStyle={{
                  color: "var(--dk-pink)",
                }}
              >
                {login ? "Account" : "Login"}
              </NavLink>
            </li>
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
    </div>
  );
};
