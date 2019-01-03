import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const QuickLinksItems = props => {
  return (
    <React.Fragment>
      {props.quickLinks.map(item => (
        <li key={item.label}>
          <Link to={item.url}>{item.label}</Link>
        </li>
      ))}
    </React.Fragment>
  );
};

QuickLinksItems.propTypes = {
  quickLinks: PropTypes.array
};

export default QuickLinksItems;
