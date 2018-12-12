import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GlobalLinks from '../Nav/GlobalLinks';
import QuickLinksItems from './QuickLinksItems';
import NavCollectionsList from '../Nav/NavCollectionsList';
import PropTypes from 'prop-types';

class MobileNav extends Component {
  static propTypes = {
    handleNavItemClick: PropTypes.func,
    collections: PropTypes.array,
    navOpen: PropTypes.bool,
    quickLinks: PropTypes.array
  };

  state = {
    // Holds the open/close states of mobile subnavigation items (assuming they have children)
    menu: {
      collections: {
        open: true
      }
    }
  };

  handleClick = () => {
    console.log('yo yo');
  };

  render() {
    const { collections, handleNavItemClick } = this.props;
    const { menu } = this.state;

    return (
      <nav
        id="mobile-nav"
        aria-label="mobile menu"
        style={this.props.navOpen ? { display: 'block' } : { display: 'none' }}
      >
        <ul onClick={handleNavItemClick}>
          <li tabIndex="0">
            <Link to="/">Explore Collections</Link>
            <span className={`arrow ${menu.collections.open ? 'open' : ''}`}>
              <a aria-haspopup="true" role="button">
                <span>Expand</span>
                Submenu
              </a>
            </span>
            <ul
              aria-expanded="false"
              aria-hidden="true"
              style={
                menu.collections.open
                  ? { display: 'block' }
                  : { display: 'none' }
              }
            >
              <NavCollectionsList collections={collections} />
            </ul>
          </li>
          <li>
            <Link to="/search">Browse Items</Link>
          </li>
        </ul>
        <div id="mobile-nav-bottom">
          {/* from #global-links */}
          <ul id="mobile-nav-bottom-left">
            <GlobalLinks />
          </ul>
          {/* from #quick-links */}
          <ul id="mobile-nav-bottom-right">
            <QuickLinksItems quickLinks={this.props.quickLinks} />
          </ul>
        </div>
      </nav>
    );
  }
}

export default MobileNav;
