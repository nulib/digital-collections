import React from 'react';
import {Link} from 'react-router-dom';
import './BottomBar.css';

const BottomBar = (props) => {
  return (
    <div className="bottom-bar contain-1120">
        <div id="department">
            <h1><Link to="/">LIBRARIES - DIGITAL COLLECTIONS</Link></h1>
        </div>
        <div id="search" className="hide-mobile">
            <div className="search-form">
            </div>
        </div>
    </div>
  );
}

export default BottomBar;
