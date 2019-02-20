import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchToggle } from '../actions/search';
import { getAllCollections } from '../api/elasticsearch-api';
import NavCollectionsList from '../components/Nav/NavCollectionsList';
import { withRouter } from 'react-router';

// From reactivesearch - we need to hook into their Redux store to get access to the clearValues() action
import { connect as reactiveSearchConnect } from '@appbaseio/reactivesearch/lib/utils';
import { clearValues } from '@appbaseio/reactivecore/lib/actions';

const styles = {
  searchButton: {
    backgroundColor: 'transparent',
    cursor: 'pointer'
  }
};

class NavContainer extends Component {
  state = {
    collections: []
  };

  componentDidMount() {
    this.getCollections();
  }

  async getCollections() {
    let response = await getAllCollections();
    let collections = response.hits.hits;

    if (collections && collections.length > 0) {
      this.setState({
        collections
      });
    }
  }

  handleBrowseItemsClick = e => {
    // Currently on the Search Results page
    if (this.props.history.location.pathname === '/search') {
      // Clear existing filters on Search Results page
      this.props.clearValues();
    }
  };

  handleSearchIconClick = e => {
    // Send redux action that Global Search is open or close
    this.props.searchToggle();
  };

  render() {
    const { collections } = this.state;

    return (
      <nav id="top-nav" aria-label="main navigation menu">
        <div className="contain-1120">
          <ul>
            <li>
              <Link to="/collections">
                Explore Collections
                <span className="dropdown-arrow" />
              </Link>
              <ul
                className="dropdown-two-column"
                aria-label="navigation submenu"
              >
                <li>
                  <ul>
                    <NavCollectionsList collections={collections} />
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/search" onClick={this.handleBrowseItemsClick}>
                Browse Items
              </Link>
            </li>
            <li id="library-search-button">
              <button
                className="button-link"
                style={styles.searchButton}
                onClick={this.handleSearchIconClick}
              >
                &nbsp;
                <span className="hide-label">Click to open search menu</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  searchToggle: () => dispatch(searchToggle())
});

const mapRSDispatchToProps = dispatch => ({
  clearValues: () => dispatch(clearValues())
});

const NavContainerWithRouter = withRouter(NavContainer);
const ConnectedNavContainerWithRouter = reactiveSearchConnect(
  null,
  mapRSDispatchToProps
)(NavContainerWithRouter);

export default connect(
  null,
  mapDispatchToProps
)(ConnectedNavContainerWithRouter);
