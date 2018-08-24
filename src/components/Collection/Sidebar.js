import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import SidebarFilterTabContent from './SidebarFilterTabContent';

const Sidebar = props => {
  const { item } = props;

  return (
    <div id="sidebar" className="left-sidebar content" tabIndex="-1">
      <div className="box">
        <div id="tab-container">
          <Tabs selectedTabClassName="active" id="tab-container">
            <TabList id="tabs" role="tablist">
              <Tab>About</Tab>
              <Tab>Filters</Tab>
            </TabList>

            <div id="tab-content">
              {/* About tab */}
              <TabPanel>
                <h3>Collection Description</h3>
                <p>{item.description}</p>
                <h4>Dates / Origin</h4>
                <ul>
                  <li>
                    <Link to="/">Date Created:</Link>
                  </li>
                  <li>
                    <Link to="/">Circa 1916 (Approximate)</Link>
                  </li>
                </ul>
                <h4>Library Locations</h4>
                <ul>
                  <li>Northwestern University Transportation Library</li>
                </ul>
                <h4>Subjects</h4>
                <ul>
                  <li>
                    <Link to="/">Wilmo Company</Link>
                  </li>
                  <li>
                    <Link to="/">Automobiles</Link>
                  </li>
                  <li>
                    <Link to="/">Parts</Link>
                  </li>
                  <li>
                    <Link to="/">Commercial catalogs</Link>
                  </li>
                  <li>
                    <Link to="/">Automobile factories</Link>
                  </li>
                </ul>
                <h4>Work Types</h4>
                <ul>
                  <li>
                    <Link to="/">Photographs</Link>
                  </li>
                </ul>
              </TabPanel>

              {/* Filter */}
              <TabPanel>
                <SidebarFilterTabContent />
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  item: PropTypes.object
};

export default Sidebar;
