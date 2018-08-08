import React from 'react';
import PropTypes from 'prop-types';

const MultiMetadata = props => {
  const { title, items } = props;

  let formatItem = item => {
    if (item.label) {
      return <li key={item.label}>{item.label}</li>;
    } else {
      return <li key={item}>{item}</li>;
    }
  };

  if (items) {
    return (
      <div>
        <h4>{title}</h4>
        <ul>
          {items.map(item => {
            return formatItem(item);
          })}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

MultiMetadata.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array
};

export default MultiMetadata;
