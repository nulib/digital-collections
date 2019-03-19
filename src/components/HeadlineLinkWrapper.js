import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HeadlineLinkWrapper = props => {
  const { headline, isMobile, showSidebar, handleToggleFiltersClick } = props;

  return (
    <div className="headline-link-wrapper">
      <h2>{headline}</h2>
      {!isMobile && (
        <button
          className="button-link"
          aria-expanded={showSidebar}
          onClick={handleToggleFiltersClick}
        >
          {showSidebar && <FontAwesomeIcon icon="angle-left" />}
          {showSidebar ? 'Hide Filters' : 'Show Filters'}
          {!showSidebar && <FontAwesomeIcon icon="angle-right" />}
        </button>
      )}
    </div>
  );
};

HeadlineLinkWrapper.propTypes = {
  headline: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
  showSidebar: PropTypes.bool,
  handleToggleFiltersClick: PropTypes.func
};

export default HeadlineLinkWrapper;
