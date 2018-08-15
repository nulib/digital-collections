import React from 'react';
import PropTypes from 'prop-types';
import MetadataDisplay from './MetadataDisplay';

const TabPanel = props => {
  if (!props.items) {
    return [];
  }

  return (
    <div>
      {props.items.map((item, i) => (
        <MetadataDisplay
          key={item.label}
          title={item.label}
          items={item.value}
        />
      ))}
    </div>
  );
};

TabPanel.propTypes = {
  items: PropTypes.array
};

export default TabPanel;
