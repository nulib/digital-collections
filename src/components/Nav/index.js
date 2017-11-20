import React, {Component} from 'react';
import NavItem from './NavItem';
import './Nav.css';

class Nav extends Component {
  render() {
    return (
      <nav id="top-nav" aria-label="main navigation menu">
        <div className="contain-1120">
            <ul>
              <NavItem label="Collections" setType="collections" />
              <NavItem label="Subjects" setType="subjects" />
              <NavItem label="Creators" setType="creators" />
              <NavItem label="Work Types" setType="workTypes" />
            </ul>
        </div>
    </nav>
    );
  }
}

export default Nav;
