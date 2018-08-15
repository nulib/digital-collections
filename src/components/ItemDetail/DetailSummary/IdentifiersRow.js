import React from 'react';
import PropTypes from 'prop-types';
import SummaryListItem from './SummaryListItem';
import Permalink from './Permalink';
import SocialLinks from './SocialLinks';

const IndentifiersRow = props => {
  return (
    <div className="summary-list">
      {props.item.id && (
        <SummaryListItem header="Identifier" items={[props.item.id]} />
      )}
      {props.item.permalink && <Permalink permalink={props.item.permalink} />}
      <SocialLinks item={props.item} />
    </div>
  );
};

IndentifiersRow.propTypes = {
  item: PropTypes.object
};

export default IndentifiersRow;
