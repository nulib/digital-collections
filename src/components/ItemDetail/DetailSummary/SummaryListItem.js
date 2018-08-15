import React from 'react';
import PropTypes from 'prop-types';
import SummaryListItemData from './SummaryListItemData';

const SummaryListItem = props => {
  const { header, items } = props;
  return (
    <div className="summary-list-item">
      <div className="data-label">{header}</div>
      {items.map((item, index) => (
        <SummaryListItemData key={index} item={item} />
      ))}
    </div>
  );
};

SummaryListItem.propTypes = {
  header: PropTypes.string,
  items: PropTypes.array.isRequired
};
export default SummaryListItem;
