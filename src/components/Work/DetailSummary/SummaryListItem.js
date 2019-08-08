import React from 'react';
import PropTypes from 'prop-types';

const SummaryListItem = props => {
  const { header, items } = props;
  return (
    <div className="summary-list-item">
      <div className="data-label">{header}</div>
      {items.map((item, index) => (
        <div key="index" className="data-value">
          {item}
        </div>
      ))}
    </div>
  );
};

SummaryListItem.propTypes = {
  header: PropTypes.string,
  items: PropTypes.array.isRequired
};
export default SummaryListItem;
