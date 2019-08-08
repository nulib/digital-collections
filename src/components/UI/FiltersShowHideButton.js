import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = {
  button: {
    marginTop: '2rem'
  },
  iconLeft: {
    marginRight: '8px'
  },
  iconRight: {
    marginLeft: '8px'
  }
};

const FiltersShowHideButton = props => {
  const { showSidebar, handleToggleFiltersClick } = props;

  return (
    <button
      className="button-link"
      aria-expanded={showSidebar}
      onClick={handleToggleFiltersClick}
      style={styles.button}
    >
      {showSidebar && (
        <FontAwesomeIcon icon="angle-left" style={styles.iconLeft} />
      )}
      {showSidebar ? 'Hide Filters' : 'Show Filters'}
      {!showSidebar && (
        <FontAwesomeIcon icon="angle-right" style={styles.iconRight} />
      )}
    </button>
  );
};

FiltersShowHideButton.propTypes = {
  showSidebar: PropTypes.bool,
  handleToggleFiltersClick: PropTypes.func
};

export default FiltersShowHideButton;
