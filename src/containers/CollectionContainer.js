import React, { Component } from 'react';
import { withRouter } from 'react-router';
import * as elasticsearchApi from '../api/elasticsearch-api.js';
import { prepPhotoGridItems } from '../services/elasticsearch-parser';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import ErrorSection from '../components/ErrorSection';
import Sidebar from '../components/Collection/Sidebar';
import PhotoGrid from '../components/PhotoGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import * as globalVars from '../services/global-vars';

export class CollectionContainer extends Component {
  state = {
    collection: null,
    error: null,
    items: null,
    loading: true
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (!id) {
      return this.setState({
        error: 'Missing id in query param',
        loading: false
      });
    }
    setTimeout(() => {
      this.getCollection(id);
      this.getCollectionItems(id);
    }, 4000);
  }

  getCollection(id) {
    const request = async () => {
      const response = await elasticsearchApi.getCollection(id);
      let error = null;

      if (response.error) {
        error = response.error.reason;
      } else if (!response.found) {
        error = 'Collection not found';
      }
      this.setState({ collection: response._source, error, loading: false });
    };
    request();
  }

  getCollectionItems(id) {
    const request = async () => {
      const response = await elasticsearchApi.getCollectionItems(id);
      let error = null;

      if (response.error) {
        error = response.error.reason;
        return this.setState({ error, items: [] });
      }
      // Prep the data for PhotoGrid
      let items = prepPhotoGridItems(response, globalVars.IMAGE_MODEL);
      this.setState({ items, loading: false });
    };
    request();
  }

  createBreadcrumbData(collection) {
    let crumbs = [{ title: 'Collections', link: '/collections' }];

    if (collection) {
      crumbs.push({
        title: collection.title.primary[0],
        link: ''
      });
    }
    return crumbs;
  }

  render() {
    const { collection, error, items, loading } = this.state;
    const breadCrumbData = collection
      ? this.createBreadcrumbData(collection)
      : [];
    const renderDisplay = () => {
      if (error) {
        return <ErrorSection message={error} />;
      }
      if (collection) {
        return (
          <div>
            <Sidebar item={collection} />
            <main id="main-content" className="content" tabIndex="-1">
              <Breadcrumbs items={breadCrumbData} />
              {!loading && (
                <div>
                  <h2>{collection && collection.title.primary[0]}</h2>
                  <div className="section">
                    {items && <PhotoGrid items={items} cols={3} />}
                  </div>
                </div>
              )}
            </main>
          </div>
        );
      }
    };

    return (
      <div className="standard-page">
        <div id="page" className="collection-items">
          <LoadingSpinner loading={loading} />
          {renderDisplay()}
        </div>
      </div>
    );
  }
}
const withRouterCollectionContainer = withRouter(CollectionContainer);
export default withRouterCollectionContainer;
