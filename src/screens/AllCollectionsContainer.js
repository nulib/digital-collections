import React, { Component } from 'react';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import PhotoGrid from '../components/PhotoGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import { getAllCollections } from '../api/elasticsearch-api';
import { prepPhotoGridItems } from '../services/elasticsearch-parser';
import * as globalVars from '../services/global-vars';
import { generateTitleTag } from '../services/helpers';
import { Helmet } from 'react-helmet';
import { loadDataLayer } from '../services/google-tag-manager';
import { loadDefaultStructuredData } from '../services/google-structured-data';

const { title } = globalVars.ROUTES.COLLECTIONS_ALL;
const breadcrumbItems = [
  { title: 'Collections', link: 'collections' },
  { title, link: '/' }
];

class AllCollectionsContainer extends Component {
  state = {
    allCollections: [],
    loading: true
  };

  componentDidMount() {
    this.getAllCollections();
    loadDataLayer({ pageTitle: globalVars.ROUTES.COLLECTIONS_ALL.title });
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
        <Helmet>
          <title>{generateTitleTag(title)}</title>
          <script type="application/ld+json">
            {JSON.stringify(loadDefaultStructuredData())}
          </script>
        </Helmet>
        <div id="page">
          <main id="main-content" className="content extended" tabIndex="0">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="contain-1120">
              <h2>{title}</h2>
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
