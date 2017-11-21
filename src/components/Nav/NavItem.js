import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import NavItemDropDown from './NavItemDropDown';
import './NavItem.css';

class NavItem extends Component {
  render() {
    return (
      <li>
        <Link to={`/sets/${this.props.setType}`}>{this.props.label} <span className="dropdown-arrow"></span></Link>
        <NavItemDropDown />
      </li>
    );
  }
}

export default NavItem;
