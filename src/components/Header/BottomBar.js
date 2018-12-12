import React from 'react';
import { Link } from 'react-router-dom';

const BottomBar = props => {
  return (
    <div id="bottom-bar" className="contain-1120">
      <div id="site-name">
        <h1>
          <Link to="/">LIBRARIES | DIGITAL COLLECTIONS</Link>
        </h1>
      </div>
    </div>
  );
};

export default BottomBar;
