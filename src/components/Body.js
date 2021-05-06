import React from "react";
import "./Body.css";
import SearchIcon from "@material-ui/icons/Search";

function Body({value,change}) {
  return (
    <div className="body">
      <div className="body__info">
        <div className="body__infoText">
          <h2>YashSplash</h2>
          <p>The internet’s source of freely-usable images.</p>
          <p>Powered by creators everywhere.</p>
        </div>
        <div className="body__search">
          <SearchIcon classname="body__searchIcon" />
          <input type="text" placeholder="Search free high resolution photos" value={value} onChange={(e)=>{
          change(e.target.value)
          }} />
        </div>
        <p className='body__trending'>Trending: flower, wallpapers, backgrounds, happy, love</p>
      </div>
    </div>
  );
}

export default Body;
