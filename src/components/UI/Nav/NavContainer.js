import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAllCollections } from '../../../api/elasticsearch-api';
import NavCollectionsList from './NavCollectionsList';

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
              <Link to="/search">Browse Items</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavContainer;
