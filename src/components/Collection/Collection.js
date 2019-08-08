import React, { Component } from 'react';
import { withRouter } from 'react-router';
import * as elasticsearchApi from '../../api/elasticsearch-api.js';
import ErrorSection from '../UI/ErrorSection';
import FacetsSidebar from '../UI/FacetsSidebar';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import LoadingSpinner from '../UI/LoadingSpinner';
import {
  DataSearch,
  ReactiveList,
  SelectedFilters
} from '@appbaseio/reactivesearch';
import {
  getESDescription,
  getESImagePath,
  getESTitle
} from '../../services/elasticsearch-parser';
import {
  COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
  collectionDefaultQuery,
  facetValues,
  imageFacets,
  imageFilters,
  simpleQueryStringQuery
} from '../../services/reactive-search';
import { connect } from 'react-redux';
import PhotoBox from '../UI/PhotoBox';
import { MOBILE_BREAKPOINT, ROUTES } from '../../services/global-vars';
import withSizes from 'react-sizes';
import CollectionDescription from './CollectionDescription';
import FiltersShowHideButton from '../UI/FiltersShowHideButton';
import PropTypes from 'prop-types';

const styles = {
  mobileDescription: {
    marginBottom: '2rem'
  }
};

export class Collection extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      token: PropTypes.string
    }),
    history: PropTypes.object,
    isMobile: PropTypes.bool,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.node
      }).isRequired
    }).isRequired
  };

  state = {
    collection: null,
    collectionItems: [],
    error: null,
    items: null,
    loading: true,
    showSidebar: false,
    excludes: null
  };

  componentDidMount() {
    this.getApiData(this.props.match.params.id);
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

  defaultQuery = () => {
    const { collection, excludes } = this.state;
    return collection ? collectionDefaultQuery(collection.id, excludes) : null;
  };

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

      const member_ids = await elasticsearchApi.getMemberIdsForImages(id);

      // Handle errors
      // Generic error
      if (response.error) {
        return this.handle404redirect(response.error.reason);
      }
      // Collection not found
      else if (!response.found) {
        return this.handle404redirect();
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

      this.setState({
        collection: response._source,
        excludes: member_ids,
        error,
        loading: false
      });
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

  handleDisplaySidebarClick = e => {
    e.preventDefault();
    this.setState({ showSidebar: !this.state.showSidebar });
  };

  handle404redirect(
    message = 'There was an error retrieving the collection, or the collection id does not exist.'
  ) {
    this.props.history.push(ROUTES.PAGE_NOT_FOUND.path, {
      message
    });
  }

  /**
   * Helper function to display a custom component to display instead of ReactiveSearch's
   * @param {Object} res - ReactivSearch result object
   */
  renderItem(res) {
    let item = {
      id: res.id,
      imageUrl: getESImagePath(res),
      label: getESTitle(res),
      type: res.model.name
    };

    return <PhotoBox key={item.id} item={item} />;
  }

  render() {
    const { collection, error, loading, showSidebar, excludes } = this.state;
    const { isMobile } = this.props;
    const breadCrumbData = collection
      ? this.createBreadcrumbData(collection)
      : [];
    const collectionTitle = collection ? getESTitle(collection) : '';
    const collectionDescription = collection
      ? getESDescription(collection)
      : '';

    // Split the description by line breaks, so it displays properly
    const descriptionDisplay = collectionDescription
      .split('\n')
      .map((i, key) => <p key={key}>{i}</p>);

    const allFilters = [
      COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID,
      ...imageFilters
    ];
    const imageFacetsNoCollection = imageFacets.filter(
      facet => facet.name !== facetValues.COLLECTION
    );

    const renderDisplay = () => {
      if (error) {
        return <ErrorSection message={error} />;
      }

      // This check ensures that the new collection's data is freshly rendered on a route id change
      if (loading) {
        return null;
      }

      if (collection && excludes) {
        return (
          <div>
            <FacetsSidebar
              facets={imageFacetsNoCollection}
              filters={allFilters}
              showSidebar={showSidebar}
              excludes={excludes}
            />
            <main
              id="main-content"
              className={`content ${!showSidebar ? 'extended' : ''}`}
              tabIndex="-1"
            >
              <Breadcrumbs items={breadCrumbData} />
              {!loading && (
                <div>
                  {!isMobile && (
                    <div id="sidebar">
                      <div className="box">
                        <h3>Collection Description</h3>
                        {descriptionDisplay}
                      </div>
                    </div>
                  )}

                  <h2>{collectionTitle}</h2>

                  {isMobile && (
                    <div style={styles.mobileDescription}>
                      <CollectionDescription description={descriptionDisplay} />
                    </div>
                  )}

                  <DataSearch
                    customQuery={simpleQueryStringQuery}
                    autosuggest={false}
                    className="datasearch web-form"
                    componentId={COLLECTION_ITEMS_SEARCH_BAR_COMPONENT_ID}
                    dataField={['full_text']}
                    filterLabel="Collections search"
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

                  <FiltersShowHideButton
                    showSidebar={showSidebar}
                    handleToggleFiltersClick={this.handleDisplaySidebarClick}
                  />

                  <ReactiveList
                    componentId="collection-items-results"
                    dataField="title"
                    react={{
                      and: [...allFilters]
                    }}
                    defaultQuery={this.defaultQuery}
                    loader={<LoadingSpinner loading={true} />}
                    size={12}
                    pagination={true}
                    paginationAt="bottom"
                    renderItem={this.renderItem}
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
      <>
        {loading && <LoadingSpinner loading={loading} />}
        {renderDisplay()}
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapSizeToProps = ({ width }) => ({
  isMobile: width <= MOBILE_BREAKPOINT
});

const SizedCollection = withSizes(mapSizeToProps)(Collection);
const withRouterCollection = withRouter(SizedCollection);
export default connect(mapStateToProps)(withRouterCollection);
