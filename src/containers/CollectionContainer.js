import React, { Component } from 'react';
import { withRouter } from 'react-router';
import * as elasticsearchApi from '../api/elasticsearch-api.js';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import ErrorSection from '../components/ErrorSection';
import Sidebar from '../components/Collection/Sidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  DataSearch,
  DataController,
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
  COLLECTION_DATA_CONTROLLER_ID,
  imageFilters,
  simpleQueryStringQuery
} from '../services/reactive-search';
import { connect } from 'react-redux';
import { generateTitleTag } from '../services/helpers';
import { Helmet } from 'react-helmet';

const allFilters = [COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID, ...imageFilters];

export class CollectionContainer extends Component {
  state = {
    collection: null,
    collectionItems: [],
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
    this.getApiData(id);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.location) {
      return;
    }
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ loading: true });
      const { id } = this.props.match.params;
      this.getApiData(id);
    }
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

  getApiData(id) {
    // Grab collection data from ElasticSearch
    this.getCollection(id);

    // Grab collection items to pass to About tab
    this.getCollectionItems(id);
  }

  getCollection(id) {
    const request = async () => {
      const response = await elasticsearchApi.getCollection(id);
      let error = null;

      // Handle errors
      // Generic error
      if (response.error) {
        error = response.error.reason;
      }
      // Collection not found
      else if (!response.found) {
        error = 'Collection not found.';
      }
      // Restricted collection
      else if (response._source.visibility === 'restricted') {
        error = `The current collection's visibility is restricted.`;
      }
      // Authentication problem
      else if (
        response._source.visibility === 'authenticated' &&
        !this.props.auth.token
      ) {
        error = `The current collection's visibility is restricted to logged in users.`;
      }

      this.setState({ collection: response._source, error, loading: false });
    };
    request();
  }

  async getCollectionItems(id) {
    let response = await elasticsearchApi.getCollectionItems(id, 1000);

    if (response.hits.hits.length > 0) {
      this.setState({
        collectionItems: response.hits.hits
      });
    }
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

    return <PhotoBox key={item.id} item={item} hideDescriptions={true} />;
  }

  render() {
    const { collection, collectionItems, error, loading } = this.state;
    const breadCrumbData = collection
      ? this.createBreadcrumbData(collection)
      : [];
    const collectionTitle = collection ? getESTitle(collection) : '';

    const renderDisplay = () => {
      if (error) {
        return <ErrorSection message={error} />;
      }

      // This check ensures that the new collection's data is freshly rendered on a route id change
      if (loading) {
        return null;
      }

      if (collection) {
        return (
          <div>
            <Sidebar item={collection} collectionItems={collectionItems} />
            <main id="main-content" className="content" tabIndex="-1">
              <Breadcrumbs items={breadCrumbData} />
              {!loading && (
                <div>
                  <h2>{collection && collection.title.primary[0]}</h2>

                  <DataController
                    title="DataController"
                    componentId={COLLECTION_DATA_CONTROLLER_ID}
                    dataField="collection.id"
                    customQuery={(item, props) => {
                      return {
                        match: {
                          'collection.id': collection.id
                        }
                      };
                    }}
                  />

                  <DataSearch
                    customQuery={simpleQueryStringQuery}
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
                    componentId="collection-items-results"
                    dataField="title"
                    react={{
                      and: [COLLECTION_DATA_CONTROLLER_ID, ...allFilters]
                    }}
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
        <Helmet>
          <title>{generateTitleTag(collectionTitle)}</title>
        </Helmet>
        <div id="page" className="collection-items">
          {loading && <LoadingSpinner loading={loading} />}
          {renderDisplay()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const withRouterCollectionContainer = withRouter(CollectionContainer);
export default connect(mapStateToProps)(withRouterCollectionContainer);
