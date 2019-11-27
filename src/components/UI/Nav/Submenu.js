import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavSubmenu = ({ items = [] }) => {
  return (
    <React.Fragment>
      {items.map(item => (
        <li key={item.id}>
          <Link to={item.url}>{item.label}</Link>
        </li>
      ))}
    </React.Fragment>
  );
};

NavSubmenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      url: PropTypes.string
    })
  )
};

export default NavSubmenu;
