import React from 'react';

function FooterSocial(props) {
  const classes = 'social ' + props.additionalClasses;

  return (
    <a className={classes} href={props.url}>
      {props.label}
    </a>
  );
}

export default FooterSocial;
