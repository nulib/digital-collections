import React from "react";
import GlobalLinks from "../Nav/GlobalLinks";

const TopBar = props => {
  return (
    <div id="top-bar" data-testid="top-bar">
      <div className="contain-1120">
        <div id="left">
          <div id="northwestern">
            <a
              href="http://www.northwestern.edu/"
              title="Northwestern University Home"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="northwestern-logo"
            >
              <span
                className="hide-label"
                data-testid="accessible-northwestern-logo"
              >
                Northwestern University
              </span>
            </a>
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
