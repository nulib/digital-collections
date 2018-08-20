import React from 'react';
import PropTypes from 'prop-types';
import SummaryListItem from './SummaryListItem';

const MetadataSummary = props => {
  const { item } = props;

  let creators = [];

  if (item.contributor) {
    creators = item.contributor
      .filter(entry => entry.type === 'creator')
      .map(creator => creator.label);
  }

  return (
    <div className="summary-list no-style horizontal">
      {creators.length > 0 && (
        <SummaryListItem header="Creators" items={creators} />
      )}
      {item.resource_type &&
        item.resource_type.length > 0 && (
          <SummaryListItem
            header="Type of Resource"
            items={item.resource_type}
          />
        )}
    </div>
  );
};

MetadataSummary.propTypes = {
  item: PropTypes.object
};

export default MetadataSummary;
