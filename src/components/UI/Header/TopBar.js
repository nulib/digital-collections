import React from 'react';
import { Link } from 'react-router-dom';
import GlobalLinks from '../Nav/GlobalLinks';

const TopBar = props => {
  return (
    <div id="top-bar">
      <div className="contain-1120">
        <div id="left">
          <div id="northwestern">
            <a
              href="http://www.northwestern.edu/"
              title="Northwestern University Home"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hide-label">Northwestern University</span>
            </a>
          </div>
          <div id="parent-unit">
            <Link to="/">Parent Unit Name</Link>
          </div>
        </div>
        <div id="global-links" aria-label="global links navigation">
          <ul>
            <GlobalLinks />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
