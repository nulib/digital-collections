import React from 'react';
import './ErrorSection.css';

function ErrorSection(props) {
  const errorMessage =
    props.error.statusText || 'General error - update source';
  return <div className="ErrorSection">Error: {errorMessage}</div>;
}

export default ErrorSection;
