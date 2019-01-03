import React, { Component } from 'react';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import PhotoGrid from '../components/PhotoGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import { getAllCollections } from '../api/elasticsearch-api';
import { prepPhotoGridItems } from '../services/elasticsearch-parser';
import * as globalVars from '../services/global-vars';

const breadcrumbItems = [
  { title: 'Collections', link: 'collections' },
  { title: 'All Collections', link: '/' }
];

class AllCollectionsContainer extends Component {
  state = {
    allCollections: [],
    loading: true
  };

  componentDidMount() {
    this.getAllCollections();
  }

  async getAllCollections() {
    let response = await getAllCollections(100);

    // Prep the data for PhotoGrid
    let allCollections = prepPhotoGridItems(
      response,
      globalVars.COLLECTION_MODEL
    );
    this.setState({ allCollections, loading: false });
  }

  render() {
    const { allCollections, loading } = this.state;

    return (
      <div className="standard-page">
        <div id="page" className="full-width">
          <main id="main-content" className="content" tabIndex="0">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="contain-1120">
              <h2>All Collections</h2>
              <LoadingSpinner loading={loading} />
              <PhotoGrid items={allCollections} cols={4} />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default AllCollectionsContainer;
