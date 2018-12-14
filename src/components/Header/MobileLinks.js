import React, { Component } from 'react';
import MobileNav from './MobileNav';
import { connect } from 'react-redux';
import { searchToggle } from '../../actions/search';
import { getAllCollections } from '../../api/elasticsearch-api';

class MobileLinks extends Component {
  state = {
    collections: [],
    navOpen: false
  };

  componentDidMount() {
    this.getCollections();
  }

  handleMenuClick = e => {
    console.log('handleMenuClick');
    e.preventDefault();

    this.setState({
      navOpen: !this.state.navOpen,
      searchOpen: false
    });
  };

  handleSearchClick = e => {
    e.preventDefault();

    this.setState({
      navOpen: false
    });

    this.props.searchToggle();
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
    const { collections, navOpen } = this.state;
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
          closeMenu={this.handleMenuClick}
        />
        <a
          href="#mobile-search"
          className="mobile-link mobile-search-link"
          onClick={this.handleSearchClick}
        >
          <span className="hide-label">Search</span>
        </a>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  searchToggle: () => dispatch(searchToggle())
});

export default connect(
  null,
  mapDispatchToProps
)(MobileLinks);
