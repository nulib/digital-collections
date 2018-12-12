import React, { Component } from 'react';
import MobileNav from './MobileNav';
import { getAllCollections } from '../../api/elasticsearch-api';

class MobileLinks extends Component {
  state = {
    collections: [],
    navOpen: false,
    searchOpen: false
  };

  componentDidMount() {
    this.getCollections();
  }

  handleMenuClick = e => {
    e.preventDefault();

    this.setState({
      navOpen: !this.state.navOpen,
      searchOpen: false
    });
  };

  /**
   * This function handles closing the mobile navigation when a legit link has been clicked
   */
  handleNavItemClick = e => {
    // Check if user clicked or touched the dropdown arrow
    let isLink = !(e.target.getAttribute('role') === 'button');

    if (isLink) {
      this.setState({
        navOpen: false,
        searchOpen: false
      });
    }
  };

  handleSearchClick = e => {
    e.preventDefault();

    this.setState({
      navOpen: false,
      searchOpen: !this.state.searchOpen
    });
  };

  async getCollections() {
    let response = await getAllCollections();
    let collections = response.hits.hits;

    if (collections && collections.length > 0) {
      this.setState({
        collections
      });
    }
  }

  render() {
    const { collections, navOpen, searchOpen } = this.state;
    const classes = `mobile-link mobile-nav-link ${navOpen ? 'open' : ''}`;

    return (
      <div id="mobile-links">
        <a
          href="#mobile-nav"
          className={classes}
          onClick={this.handleMenuClick}
        >
          <span className="hide-label">Menu</span>
        </a>
        <MobileNav
          {...this.props}
          collections={collections}
          navOpen={navOpen}
          handleNavItemClick={this.handleNavItemClick}
        />
        <a href="#mobile-search" className="mobile-link mobile-search-link">
          <span className="hide-label">Search</span>
        </a>
      </div>
    );
  }
}

export default MobileLinks;
