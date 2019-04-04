import React from 'react';
import PropTypes from 'prop-types';
import MetadataDisplay from './MetadataDisplay';

const styles = {
  tabContent: {
    padding: '0 1rem'
  }
};

const TabContent = props => {
  if (!props.items) {
    return [];
  }

  return (
    <div style={styles.tabContent}>
      {props.items.map((item, i) => (
        <MetadataDisplay
          key={item.label}
          title={item.label}
          items={item.value}
          facet_value={item.facet_value}
          external_url={item.external_url}
        />
      ))}
    </div>
  );
};

TabContent.propTypes = {
  items: PropTypes.array
};

export default TabContent;
