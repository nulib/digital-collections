import React from 'react';
import { Link } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';

const BottomBar = props => {
  return (
    <div id="bottom-bar" className="contain-1120">
      <div id="site-name">
        <h1>
          <Link to="/">LIBRARIES | DIGITAL COLLECTIONS</Link>
        </h1>
      </div>
      <GlobalSearch />
    </div>
  );
};

export default BottomBar;
