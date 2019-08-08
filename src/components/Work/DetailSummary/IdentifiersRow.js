import React from 'react';
import PropTypes from 'prop-types';
import SummaryListItem from './SummaryListItem';
import SocialLinks from './SocialLinks';

const IndentifiersRow = props => {
  return (
    <div className="summary-list identifier-wrapper">
      {props.item.id && (
        <SummaryListItem header="Identifier" items={[props.item.id]} />
      )}
      <SocialLinks item={props.item} />
    </div>
  );
};

IndentifiersRow.propTypes = {
  item: PropTypes.object
};

export default IndentifiersRow;
