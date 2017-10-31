import React from 'react';

function MetadataItem(props) {
  return (
    <li>
      <div className="item-detail-label">{props.listItem.label}</div>
      <p>{props.listItem.value}</p>
    </li>
  );
}

export default MetadataItem;
