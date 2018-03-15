import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <a href="#main-content" className="screen-reader-shortcut">
        Skip to main content
      </a>
      <div id="top-bar">
        <div className="contain-1120">
          <div id="left">
            <div id="northwestern">
              <Link
                to="http://www.northwestern.edu/"
                title="Northwestern University Home"
              >
                <span className="hide-label">Northwestern University</span>
              </Link>
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
                <Link to="/">Sign in</Link>
              </li>
              <li className="resources">
                Global Dropdown
                <span className="dropdown-arrow" />
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
          </div>
        </div>
      </div>
      <div id="quick-links" aria-label="quick links navigation">
        <ul>
          <li>
            <Link to="/">Quick Link 1</Link>
          </li>
          <li>
            <Link to="/">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div id="bottom-bar" className="contain-1120">
        <div id="site-name">
          <h1>
            <Link to="index.html">LIBRARIES - DIGITAL COLLECTIONS</Link>
          </h1>
        </div>
      </div>
      <div id="mobile-links">
        <a href="#mobile-nav" className="mobile-link mobile-nav-link">
          <span className="hide-label">Menu</span>
        </a>
        <nav id="mobile-nav" aria-label="mobile menu">
          <ul>
            <li tabindex="0">
              <Link to="/">About Digital Collections</Link>
              <span className="arrow">
                <a aria-haspopup="true" href="#" role="button">
                  <span>Expand</span>
                  Submenu
                </a>
              </span>
            </li>
            <li>
              <Link to="/">Browse</Link>
              <span className="arrow">
                <a aria-haspopup="true" href="#" role="button">
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
                <a aria-haspopup="true" href="#" role="button">
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
