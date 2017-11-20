import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MobileLinks from './MobileLinks';
import './TopBar.css';

class TopBar extends Component {
  render() {
    return (
      <div id="top-bar">
          <div className="contain-1120">
              <div id="left">
                  <a href="http://www.northwestern.edu"><img src="https://common.northwestern.edu/v8/css/images/northwestern.svg" alt="Northwestern University" /></a>
              </div>
              <MobileLinks />
              <div id="right">
                  <ul>
                      <li><Link to="/contactus">Contact Us</Link></li>
                      <li><Link to="/about">About</Link></li>
                      <li><Link to="/login">Login</Link></li>
                  </ul>
              </div>
          </div>
      </div>
    );
  }
}

export default TopBar;
