import React from 'react';
import PropTypes from 'prop-types';
import SidebarFilterTab from './SidebarFilterTab';
import CollectionDescription from './CollectionDescription';
import { getESDescription } from '../../services/elasticsearch-parser';

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
          <CollectionDescription description={getESDescription(item)} />
          <SidebarFilterTab collection={item} />
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  collectionItems: PropTypes.array,
  item: PropTypes.object
};

export default Sidebar;
