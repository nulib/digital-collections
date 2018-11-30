import React from 'react';
import Login from '../Login';
import { Link } from 'react-router-dom';
import QuickLinks from './QuickLinks';

const Header = () => {
  return (
    <header>
      <a href="smain-content" className="screen-reader-shortcut">
        Skip to main content
      </a>
      <div id="top-bar">
        <div className="contain-1120">
          <div id="left">
            <div id="northwestern">
              <a
                href="http://www.northwestern.edu/"
                title="Northwestern University Home"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hide-label">Northwestern University</span>
              </a>
            </div>
            <div id="parent-unit">
              <Link to="/">Parent Unit Name</Link>
            </div>
          </div>
          <div id="global-links" aria-label="global links navigation">
            <ul>
              <li>
                <Link to="/">library.northwestern.edu</Link>
              </li>
              <li>
                <Login />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <QuickLinks />

      <div id="bottom-bar" className="contain-1120">
        <div id="site-name">
          <h1>
            <Link to="/">LIBRARIES | DIGITAL COLLECTIONS</Link>
          </h1>
        </div>
      </div>
      <div id="mobile-links">
        <a href="#mobile-nav" className="mobile-link mobile-nav-link">
          <span className="hide-label">Menu</span>
        </a>
        <nav id="mobile-nav" aria-label="mobile menu">
          <ul>
            <li tabIndex="0">
              <Link to="/">About Digital Collections</Link>
              <span className="arrow">
                <a aria-haspopup="true" role="button">
                  <span>Expand</span>
                  Submenu
                </a>
              </span>
            </li>
            <li>
              <Link to="/">Browse</Link>
              <span className="arrow">
                <a aria-haspopup="true" role="button">
                  <span>Expand</span>
                  Submenu
                </a>
              </span>
              <ul aria-expanded="false" aria-hidden="true">
                <li>
                  <Link to="/">Subject</Link>
                </li>
                <li>
                  <Link to="/">Worktype</Link>
                </li>
                <li>
                  <Link to="/">Creator</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/">Collection Types</Link>
              <span className="arrow">
                <a aria-haspopup="true" role="button">
                  <span>Expand</span>
                  Submenu
                </a>
              </span>
              <ul aria-expanded="false" aria-hidden="true">
                <li>
                  <Link to="/">Level 2, Link 1</Link>
                </li>
              </ul>
            </li>
          </ul>
          <div id="mobile-nav-bottom">
            {/* from #global-links */}
            <ul id="mobile-nav-bottom-left">
              <li>
                <Link to="/">Global Link 1</Link>
              </li>
              <li>
                <Link to="/">Global Link 2</Link>
                <ul>
                  <li>
                    <Link to="/">Global Drop Link 1</Link>
                  </li>
                  <li>
                    <Link to="/">Global Drop Link 2</Link>
                  </li>
                  <li>
                    <Link to="/">Global Drop Link 3</Link>
                  </li>
                </ul>
              </li>
            </ul>
            {/* from #quick-links */}
            <ul id="mobile-nav-bottom-right">
              <li>
                <Link to="/">Contact Us</Link>
              </li>
            </ul>
          </div>
        </nav>
        <a href="#mobile-search" className="mobile-link mobile-search-link">
          <span className="hide-label">Search</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
