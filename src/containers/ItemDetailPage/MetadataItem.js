import React from 'react';

function MetadataItem(props) {
  return (
    <div className="metadata-row">
      <div className="item-detail-label">{props.label}</div>
      <p>{props.value}</p>
    </div>
  );
}

export default MetadataItem;
