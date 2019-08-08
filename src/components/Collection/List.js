import React, { Component } from 'react';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import PhotoGrid from '../UI/PhotoGrid';
import LoadingSpinner from '../UI/LoadingSpinner';
import { getAllCollections } from '../../api/elasticsearch-api';
import { prepPhotoGridItems } from '../../services/elasticsearch-parser';
import * as globalVars from '../../services/global-vars';

const { title } = globalVars.ROUTES.COLLECTIONS_ALL;
const breadcrumbItems = [
  { title: 'Collections', link: 'collections' },
  { title, link: '/' }
];

class CollectionList extends Component {
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
      <>
        <Breadcrumbs items={breadcrumbItems} />
        <div className="contain-1120">
          <h2>{title}</h2>
          <LoadingSpinner loading={loading} />
          <PhotoGrid items={allCollections} cols={4} />
        </div>
      </>
    );
  }
}

export default CollectionList;
