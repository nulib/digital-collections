import React, {Component} from 'react';
import MobileNav from './MobileNav';
import './MobileLinks.css';

class MobileLinks extends Component {
  render() {
    return (
      <div id="mobile-links">
          <a href="#mobile-search" className="mobile-link mobile-search-link"><span className="hide-label">Search</span></a>
          <div id="mobile-search">
              <div className="search-form">

              </div>
          </div>
          <a href="#mobile-nav" className="mobile-link mobile-nav-link"><span className="hide-label">Menu</span></a>
          <MobileNav />
      </div>
    );
  }
}

export default MobileLinks;
