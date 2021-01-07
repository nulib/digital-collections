import React from "react";
import PropTypes from "prop-types";

function FooterLink(props) {
  return (
    <li>
      <a href={props.url} target="_blank" rel="noopener noreferrer">
        {props.label}
      </a>
    </li>
  );
}

FooterLink.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
};

export default FooterLink;
