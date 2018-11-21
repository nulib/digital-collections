import React, { Component } from 'react';
import { withRouter } from 'react-router';
import * as elasticsearchApi from '../api/elasticsearch-api.js';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import ErrorSection from '../components/ErrorSection';
import Sidebar from '../components/Collection/Sidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  DataSearch,
  ReactiveList,
  SelectedFilters
} from '@appbaseio/reactivesearch';
import PhotoBox from '../components/PhotoBox';
import {
  getESDescription,
  getESImagePath,
  getESTitle
} from '../services/elasticsearch-parser';
import searchIcon from '../images/library-search.svg';
import {
  COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
  imageFilters
} from '../services/reactive-search';

// 'collection-search' is the Da
const allFilters = [COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID, ...imageFilters];

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
    this.getCollection(id);
  }

  createBreadcrumbData(collection) {
    let crumbs = [{ title: 'Collections', link: '/collections' }];

    if (collection) {
      crumbs.push({
        title: getESTitle(collection),
        link: ''
      });
    }
    return crumbs;
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

  /**
   * Helper function to display a custom component to display instead of ReactiveSearch's
   * @param {Object} res - ReactivSearch result object
   */
  onData(res) {
    let item = {
      description: getESDescription(res),
      id: res.id,
      imageUrl: getESImagePath(res),
      label: getESTitle(res),
      type: res.model.name
    };

    return <PhotoBox key={item.id} item={item} />;
  }

  render() {
    const { collection, error, loading } = this.state;
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
                  <DataSearch
                    autosuggest={false}
                    className="datasearch web-form"
                    componentId={COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID}
                    dataField={['full_text']}
                    filterLabel="Collections search"
                    icon={
                      <img
                        src={searchIcon}
                        className="rs-search-icon"
                        alt="search icon"
                      />
                    }
                    iconPosition="right"
                    innerClass={{
                      input: 'searchbox rs-search-input',
                      list: 'suggestionlist'
                    }}
                    queryFormat="or"
                    placeholder="Search within collection"
                    showFilter={true}
                    URLParams={false}
                  />
                  <SelectedFilters />
                  <ReactiveList
                    componentId="results"
                    dataField="title"
                    react={{
                      and: allFilters
                    }}
                    defaultQuery={(value, props) => ({
                      bool: {
                        must: [
                          { match: { 'model.name': 'Image' } },
                          { match: { 'collection.id': collection.id } }
                        ]
                      }
                    })}
                    loader={<LoadingSpinner loading={true} />}
                    size={12}
                    pagination={true}
                    paginationAt="bottom"
                    onData={this.onData}
                    innerClass={{
                      list: 'rs-result-list photo-grid three-grid',
                      pagination: 'rs-pagination',
                      resultsInfo: 'rs-results-info'
                    }}
                  />
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
          {loading && (
            <div style={{ marginBottom: '5rem' }}>
              <LoadingSpinner loading={loading} />
            </div>
          )}
          {renderDisplay()}
        </div>
      </div>
    );
  }
}
const withRouterCollectionContainer = withRouter(CollectionContainer);
export default withRouterCollectionContainer;
