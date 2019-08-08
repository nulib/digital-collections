import React, { Component } from 'react';
import MobileNav from './MobileNav';
import { getAllCollections } from '../../../api/elasticsearch-api';
import { withRouter } from 'react-router-dom';

class MobileLinks extends Component {
  state = {
    collections: [],
    navOpen: false,
    searchOpen: false,
    searchValue: ''
  };

  componentDidMount() {
    this.getCollections();
  }

  handleChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  handleMenuClick = e => {
    this.setState({
      navOpen: !this.state.navOpen,
      searchOpen: false
    });
  };

  handleSearchClick = e => {
    e.preventDefault();

    this.setState({
      navOpen: false,
      searchOpen: !this.state.searchOpen
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push({
      pathname: '/search',
      state: {
        globalSearch: this.state.searchValue
      }
    });

    this.setState({
      searchOpen: false
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
        <button className={classes} onClick={this.handleMenuClick}>
          <span className="hide-label">Menu</span>
        </button>
        <MobileNav
          {...this.props}
          collections={collections}
          navOpen={navOpen}
          closeMenu={this.handleMenuClick}
        />

        <button
          className={`mobile-link mobile-search-link ${
            searchOpen ? 'open' : ''
          }`}
          onClick={this.handleSearchClick}
        >
          <span className="hide-label">Search</span>
        </button>

        {this.state.searchOpen && (
          <div id="mobile-search">
            <div className="search-form group">
              {/* TODO: convert this to a higher order component for both search forms (desktop / mobile) */}
              <form onSubmit={this.handleSubmit} role="search">
                <label className="hide-label" htmlFor="mobile-search-input">
                  Search this site
                </label>
                <input
                  id="mobile-search-input"
                  placeholder="Search this site"
                  type="text"
                  onChange={e => this.handleChange(e)}
                />
                <button type="submit">
                  <span className="hide-label">Search</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(MobileLinks);
