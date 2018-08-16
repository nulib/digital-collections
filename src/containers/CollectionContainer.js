import React, { Component } from 'react';
import { withRouter } from 'react-router';
import * as elasticsearchApi from '../api/elasticsearch-api.js';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import ErrorSection from '../components/ErrorSection';
import Sidebar from '../components/Collection/Sidebar';
import PhotoGrid from '../components/PhotoGrid';

export class CollectionContainer extends Component {
  state = {
    error: null,
    collection: null,
    items: null
  };

  componentDidMount() {
    document.body.className = 'standard-page';
    const { match } = this.props;

    if (!match.params.id) {
      return this.setState({
        error: 'Missing id in query param'
      });
    }
    this.getCollection(match.params.id);
    this.getCollectionItems(match.params.id);
  }

  getCollection(id) {
    const request = async () => {
      const response = await elasticsearchApi.getCollection(id);
      let error = null;

      console.log(response);

      if (response.error) {
        error = response.error.reason;
      } else if (!response.found) {
        error = 'Collection not found';
      }
      this.setState({ collection: response._source, error });
    };
    request();
  }

  getCollectionItems(id) {
    const request = async () => {
      const response = await elasticsearchApi.getCollectionItems(id);
      let error = null;

      console.log(response);

      if (response.error) {
        error = response.error.reason;
      }
      this.setState({ items: response.hits.hits, error });
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
    const { collection, error, items } = this.state;
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
            <main id="main-content" className="content" tabindex="-1">
              <Breadcrumbs items={breadCrumbData} />
              <h2>{collection && collection.title.primary[0]}</h2>
              <div className="section">
                {items && <PhotoGrid items={items} />}
              </div>
            </main>
          </div>
        );
      }
    };

    return (
      <div className="standard-page">
        <div id="page" className="collection-items">
          {renderDisplay()}
        </div>
      </div>
    );
  }
}
const withRouterCollectionContainer = withRouter(CollectionContainer);
export default withRouterCollectionContainer;
