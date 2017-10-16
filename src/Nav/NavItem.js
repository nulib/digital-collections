import React, {Component} from 'react';

class NavItem extends Component {
  render() {
    return (
      <li><a href="#">{this.props.label} <span className="dropdown-arrow"></span></a>
        <ul className="dropdown">
            <li className="nav-intro">
                <p className="intro">Action-Based Navigation</p>
                <a href="set.html" className="button">View Set Page</a>
            </li>
            <li className="nav-links">
                <ul>
                    <li><a href="#">Link 1</a></li>
                    <li><a href="#">Link 2</a></li>
                    <li><a href="#">Link 3</a></li>
                    <li><a href="#">Link 4</a></li>
                    <li><a href="#">Link 5</a></li>
                </ul>
            </li>
        </ul>
      </li>
    );
  }
}

export default NavItem;
