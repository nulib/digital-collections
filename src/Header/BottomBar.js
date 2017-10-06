import React, {Component} from 'react';
import './BottomBar.css';

const BottomBar = (props) => {
  return (
    <div className="bottom-bar contain-1120">
        <div id="department">
            <h1><a href="index.html">LIBRARIES - DIGITAL COLLECTIONS</a></h1>
        </div>
        <div id="search" className="hide-mobile">
            <div className="search-form">
            </div>
        </div>
    </div>
  );
}

export default BottomBar;
