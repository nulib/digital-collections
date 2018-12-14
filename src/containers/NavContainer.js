import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchToggle } from '../actions/search';
import { getAllCollections } from '../api/elasticsearch-api';
import NavCollectionsList from '../components/Nav/NavCollectionsList';

const styles = {
  searchButton: {
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
              <Link to="/">
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
              <Link to="/search">Browse Items</Link>
            </li>
            <li id="library-search-button">
              <a
                style={styles.searchButton}
                onClick={this.handleSearchIconClick}
              >
                &nbsp;
                <span className="hide-label">Click to open search menu</span>
              </a>
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

export default connect(
  null,
  mapDispatchToProps
)(NavContainer);
