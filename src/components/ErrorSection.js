import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  color: '#b2292e',
  padding: '3rem 0',
  textAlign: 'center'
};

function ErrorSection(props) {
  const errorMessage = props.message || 'General error';
  return <div style={styles}>Error: {errorMessage}</div>;
}

ErrorSection.propTypes = {
  message: PropTypes.string
};

export default ErrorSection;
