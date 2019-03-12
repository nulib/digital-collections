import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const styles = {
  facetsShowHideIcon: {
    marginRight: '5px'
  }
};

const FacetsBreadcrumbs = props => {
  const { breadcrumbs, handleDisplayClick, isMobile, showSidebar } = props;

  return (
    <section className="contain-1120">
      <ul id="breadcrumbs">
        {!isMobile && (
          <li>
            {/* eslint-disable-next-line */}
            <a
              href="#"
              onClick={handleDisplayClick}
              className="facet-sidebar-collapse-link"
            >
              <FontAwesomeIcon
                icon={showSidebar ? 'eye-slash' : 'eye'}
                style={styles.facetsShowHideIcon}
              />
              {showSidebar ? 'Hide Filters' : 'Show Filters'}
            </a>
          </li>
        )}

        {breadcrumbs.map((breadcrumb, i) => {
          if (i === 0) {
            return (
              <li key={breadcrumb.title} style={{ background: 'none' }}>
                <Link to={breadcrumb.link}>{breadcrumb.title}</Link>
              </li>
            );
          } else {
            return (
              <li
                key={breadcrumb.title}
                className={`${breadcrumbs.length - 1 === i ? 'active' : ''}`}
              >
                {breadcrumb.title}
              </li>
            );
          }
        })}
      </ul>
    </section>
  );
};

FacetsBreadcrumbs.propTypes = {
  breadcrumbs: PropTypes.array,
  handleDisplayClick: PropTypes.func,
  isMobile: PropTypes.bool,
  showSidebar: PropTypes.bool
};

export default FacetsBreadcrumbs;
