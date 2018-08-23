import React from 'react';
import PropTypes from 'prop-types';

const CollapsibleHeader = props => (
  <h3>
    <a href="">{props.label}</a>
  </h3>
);

CollapsibleHeader.propTypes = {
  label: PropTypes.string.isRequired
};

export default CollapsibleHeader;
