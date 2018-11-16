import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SidebarAboutTab from './SidebarAboutTab';
import SidebarFilterTab from './SidebarFilterTab';

const Sidebar = props => {
  const { item } = props;

  return (
    <div
      id="sidebar"
      className="left-sidebar content collection-sidebar"
      tabIndex="-1"
    >
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
                <SidebarAboutTab item={item} />
              </TabPanel>

              {/* Filter */}
              <TabPanel>
                <SidebarFilterTab />
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
