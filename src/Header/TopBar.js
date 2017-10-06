import React, {Component} from 'react';
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
                      <li><a href="#">Contact Us</a></li>
                      <li><a href="#">About</a></li>
                      <li><a href="#">Login</a></li>
                  </ul>
              </div>
          </div>
      </div>
    );
  }
}

export default TopBar;
