import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = props => {
  const { item } = props;
  return (
    <div id="sidebar" className="left-sidebar content" tabIndex="-1">
      <div className="box">
        <div id="tab-container">
          <ul id="tabs" role="tablist">
            <li role="presentation">
              <a
                aria-controls="tab-panel1"
                href="#tab-panel1"
                id="tab1"
                role="tab"
              >
                About
              </a>
            </li>
            <li role="presentation">
              <a
                aria-controls="tab-panel2"
                href="#tab-panel2"
                id="tab2"
                role="tab"
              >
                Filters
              </a>
            </li>
          </ul>
          <div id="tab-content">
            <div aria-labelledby="tab1" id="tab-panel1" role="tabpanel">
              <h3>Collection Description</h3>
              <p>{item.description}</p>
            </div>
          </div>
          <div id="tab-content">
            <div aria-labelledby="tab2" id="tab-panel2" role="tabpanel">
              <h3>Second Tab Content</h3>
              <p />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  items: PropTypes.array
};
export default Sidebar;
