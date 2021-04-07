import { useData } from "./DataProvider";
import "./Header.css";

export const Header = () => {
  const { data, categoryData, dispatch } = useData();

  // console.log({ categoryData });

  const categories = [...new Set(data.map((item) => item.category))];

  console.log({ categories });

  return (
    <div>
      <div className='header'>
        <div className='search-input'>
          <input
            type='text'
            className='search-txt'
            required
            placeholder='Search...'
          />
          <span className='flt-icon'>
            <i className='fas fa-search'></i>
          </span>
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
          {categories.map((category) => {
            return (
              <li
                onClick={() =>
                  dispatch({ type: "VIEW_BY_CATEGORY", playload: category })
                }
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
