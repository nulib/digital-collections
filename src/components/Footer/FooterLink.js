import React from 'react';

function FooterLink(props) {
  return(
    <li><a href={props.url} target="_blank" rel="noopener noreferrer">{props.label}</a></li>
  );
}

export default FooterLink;
