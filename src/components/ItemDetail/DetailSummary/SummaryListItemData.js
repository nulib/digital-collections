import React from 'react';
import PropTypes from 'prop-types';

const SummaryListItemData = props => {
  const { item } = props;

  return <div className="data-value">{item}</div>;
};

SummaryListItemData.propTypes = {
  header: PropTypes.object
};

export default SummaryListItemData;
