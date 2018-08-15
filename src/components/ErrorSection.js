import React from 'react';
import PropTypes from 'prop-types';
import './ErrorSection.css';

function ErrorSection(props) {
  const errorMessage = props.message || 'General error';
  return <div className="ErrorSection">Error: {errorMessage}</div>;
}

ErrorSection.propTypes = {
  message: PropTypes.string
};

export default ErrorSection;
