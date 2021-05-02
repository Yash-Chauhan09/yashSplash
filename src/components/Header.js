import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <img
          src="https://image.flaticon.com/icons/png/512/3/3761.png"
          alt="logo"
          className='header__logoImg'
        />
        <div className="header__logoText">
          <h4>YashSplash</h4>
          <p>Photos for everyone</p>
        </div>
      </div>
      <div className="header__search">
        <SearchIcon classname='header__searchIcon' />
        <input type="text" placeholder="Search free high resolution photos" />
      </div>
      <div className="header__right">
        <div className="header__rightExplore">
          <a href='#images'>Explore</a>
          <MoreHorizIcon />
          <button>Submit a photo</button>
        </div>
        <div className="header__rightJoin">
          <button>Login</button>
          <button>Join free</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
