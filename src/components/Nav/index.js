import React, {Component} from 'react';
import NavItem from './NavItem';
import './Nav.css';

class Nav extends Component {
  render() {
    return (
      <nav id="top-nav" aria-label="main navigation menu">
        <div className="contain-1120">
            <ul>
              <NavItem label="Collections" />
              <NavItem label="Subjects" />
              <NavItem label="Creators" />
              <NavItem label="Work Types" />
            </ul>
        </div>
    </nav>
    );
  }
}

export default Nav;
