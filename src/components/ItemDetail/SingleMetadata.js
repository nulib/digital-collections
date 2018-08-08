import React from 'react';
import PropTypes from 'prop-types';

const SingleMetadata = props => {
  const { title, items } = props;

  if (items) {
    return (
      <div>
        <h4>{title}</h4>
        <p>{items}</p>
      </div>
    );
  } else {
    return null;
  }
};

SingleMetadata.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array
};

export default SingleMetadata;
