import React from "react";
import PropTypes from "prop-types";

function FooterSocial(props) {
  const classes = "social " + props.additionalClasses;

  return (
    <a className={classes} href={props.url}>
      {props.label}
    </a>
  );
}

FooterSocial.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
  additionalClasses: PropTypes.string,
};

export default FooterSocial;
