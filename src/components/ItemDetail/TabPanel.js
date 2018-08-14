import React from 'react';
import PropTypes from 'prop-types';
import MultiMetadata from './MultiMetadata';
import SingleMetadata from './SingleMetadata';

const TabPanel = props => {
  if (!props.data) {
    return [];
  }

  const data = props.data;

  let metadata = [];
  for (let { label, value } of data) {
    metadata.push(<SingleMetadata title={label} item={label} />);
  }

  // Object.entries(data).forEach(
  //   ([key, value]) => <MultiMetadata title={key} items={key} />
  // );

  return <div>{metadata}</div>;
};

TabPanel.propTypes = {
  data: PropTypes.array
};

export default TabPanel;
