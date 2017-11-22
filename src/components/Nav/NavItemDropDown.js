import React from 'react';
import {Link} from 'react-router-dom';

function NavItemDropDown(props) {
  const navIntro = props.subNav.navIntro;

  return (
    <ul className="dropdown">
      <li className="nav-intro">
          <p className="intro">{navIntro.headline}</p>
          <Link to={navIntro.routePath} className="button">{navIntro.buttonLabel}</Link>
      </li>
      <li className="nav-links">
        <ul>
          {props.subNav.navLinks.map((item, index) => <li key={index}><a>{item.label}</a></li>)}
        </ul>
      </li>
    </ul>
  );
}

export default NavItemDropDown;
