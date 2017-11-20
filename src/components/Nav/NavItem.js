import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavItem extends Component {
  render() {
    return (
      <li>
        <Link to={`/sets/${this.props.setType}`}>{this.props.label} <span className="dropdown-arrow"></span></Link>
        <ul className="dropdown">
            <li className="nav-intro">
                <p className="intro">Action-Based Navigation</p>
                <Link to="/item" className="button">View Set Page</Link>
            </li>
            <li className="nav-links">
                <ul>
                    <li><a>Link 1</a></li>
                    <li><a>Link 2</a></li>
                    <li><a>Link 3</a></li>
                </ul>
            </li>
        </ul>
      </li>
    );
  }
}

export default NavItem;
