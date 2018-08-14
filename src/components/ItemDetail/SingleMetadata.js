import React from 'react';
import PropTypes from 'prop-types';

const SingleMetadata = props => {
  const { title, item } = props;

  if (item) {
    return (
      <div>
        <h4>{title}</h4>
        <p>{item}</p>
      </div>
    );
  } else {
    return null;
  }
};

SingleMetadata.propTypes = {
  title: PropTypes.string,
  item: PropTypes.string
};

export default SingleMetadata;
