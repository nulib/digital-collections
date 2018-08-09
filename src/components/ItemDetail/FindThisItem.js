import React from 'react';
import PropTypes from 'prop-types';
import MultiMetadata from './MultiMetadata';
import SingleMetadata from './SingleMetadata';

const FindThisItem = props => {
  if (!props.item) {
    return [];
  }

  const {
    accession = null,
    box_name = null,
    box_number = null,
    folder_name = null,
    folder_number = null,
    call_number = null,
    catalog_key = null,
    citation = null
  } = props.item;

  return (
    <div aria-labelledby="tab-find-item" id="tab-panel2" role="tabpanel">
      <SingleMetadata item={accession} />
      <MultiMetadata item={box_name} />
      <MultiMetadata item={box_number} />
      <MultiMetadata item={folder_name} />
      <MultiMetadata item={folder_number} />
      <SingleMetadata item={call_number} />
      <SingleMetadata item={catalog_key} />
      <SingleMetadata item={citation} />
    </div>
  );
};

FindThisItem.propTypes = {
  item: PropTypes.object
};

export default FindThisItem;
