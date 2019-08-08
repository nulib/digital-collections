import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  headerButton: {
    width: '100%',
    textAlign: 'left'
  }
};

const CollapsibleHeader = props => (
  <h3>
    <button className="button-link" style={styles.headerButton}>
      {props.label}
    </button>
  </h3>
);

CollapsibleHeader.propTypes = {
  label: PropTypes.string.isRequired
};

export default CollapsibleHeader;
