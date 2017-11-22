import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import NavItemDropDown from './NavItemDropDown';
import './NavItem.css';

class NavItem extends Component {
  render() {
    const { label, setType, subNav } = this.props;

    return (
      <li>
        <Link to={`/sets/${setType}`}>{label} <span className="dropdown-arrow"></span></Link>
        <NavItemDropDown subNav={subNav} />
      </li>
    );
  }
}

export default NavItem;
