import React from 'react';
import PropTypes from 'prop-types';
import SummaryListItem from './SummaryListItem';

const MetadataSummary = props => {
  const { item } = props;
  const styles = {
    wrapper: {
      marginBottom: '1em'
    }
  };

  let creators = [];

  if (item.creator) {
    creators = item.creator
      .filter(entry => entry.role === 'creator')
      .map(creator => creator.label);
  }

  return (
    <div className="summary-list no-style horizontal" style={styles.wrapper}>
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
