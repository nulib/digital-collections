import React from 'react';
import './ErrorSection.css';

function ErrorSection(props) {
  return <div className="ErrorSection">Error: {props.error.message}</div>;
}

export default ErrorSection;
