import React, {Component} from 'react';
import MobileNavMainMenu from './MobileNavMainMenu';
import './MobileNav.css';

class MobileNav extends Component {
  render() {
    return (
      <nav id="mobile-nav">
          <MobileNavMainMenu />
          <div id="mobile-nav-bottom">
              <ul id="mobile-nav-bottom-left">
                  <li><a href="#">Link 1</a></li>
                  <li><a href="#">Link 2</a></li>
                  <li><a href="#">Link 3</a></li>
                  <li><a href="#">Link 4</a></li>
              </ul>
              <ul id="mobile-nav-bottom-right">
                  <li><a href="#">Drop Link 1</a></li>
                  <li><a href="#">Drop Link 2</a></li>
                  <li><a href="#">Drop Link 3</a></li>
                  <li><a href="#">Drop Link 4</a></li>
              </ul>
          </div>
      </nav>
    );
  }
}

export default MobileNav;
