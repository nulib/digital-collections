import React, { Component } from 'react';
import {
  DataController,
  DataSearch,
  SelectedFilters,
  ReactiveList
} from '@appbaseio/reactivesearch';
import { getESImagePath, getESTitle } from '../services/elasticsearch-parser';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  DATASEARCH_PLACEHOLDER,
  GLOBAL_SEARCH_BAR_COMPONENT_ID,
  imageFacets,
  imageFilters,
  SEARCH_DATA_CONTROLLER_ID,
  simpleQueryStringQuery
} from '../services/reactive-search';
import { generateTitleTag } from '../services/helpers';
import { Helmet } from 'react-helmet';
import PhotoBox from '../components/PhotoBox';
import { withRouter } from 'react-router-dom';
import { MOBILE_BREAKPOINT, ROUTES } from '../services/global-vars';
import withSizes from 'react-sizes';
import FacetsSidebar from '../components/FacetsSidebar';
import FacetsBreadcrumbs from '../components/breadcrumbs/FacetsBreadcrumbs';
import { loadDataLayer } from '../services/google-tag-manager';

const breadcrumbs = [
  { link: '/', title: 'Home' },
  { link: '', title: 'Search Results' }
];

class ReactivesearchContainer extends Component {
  constructor(props) {
    super(props);
    this.searchValue = null;
    this.facetValue = null;
  }

  state = {
    componentLoaded: false,
    showSidebar: false
  };

  componentDidMount() {
    loadDataLayer({ pageTitle: ROUTES.SEARCH.title });

    this.searchValue = this.props.location.state
      ? this.props.location.state.searchValue
      : '';
    this.facetValue = this.props.location.state
      ? this.props.location.state.facetValue
      : '';

    this.setState({ componentLoaded: true });
  }

  handleSidebarClick = e => {
    e.preventDefault();
    this.setState({ showSidebar: !this.state.showSidebar });
  };

  /**
   * Helper function to display a custom component to display instead of ReactiveSearch's
   * @param {Object} res - ReactivSearch result object
   */
  onData = res => {
    let item = {
      id: res.id,
      imageUrl: getESImagePath(res),
      label: getESTitle(res),
      type: res.model.name
    };

    return <PhotoBox key={item.id} item={item} />;
  };

  render() {
    const allFilters = [
      GLOBAL_SEARCH_BAR_COMPONENT_ID,
      SEARCH_DATA_CONTROLLER_ID,
      ...imageFilters
    ];
    const { componentLoaded, showSidebar } = this.state;
    const { isMobile, location } = this.props;
    const globalSearchValue =
      location.state && location.state.globalSearch
        ? location.state.globalSearch
        : null;

    return (
      <div className="standard-page">
        <Helmet>
          <title>{generateTitleTag('Search')}</title>
        </Helmet>
        <div id="page" className="search">
          {componentLoaded && (
            <FacetsSidebar
              facets={imageFacets}
              facetValue={this.facetValue}
              filters={allFilters}
              isMobile={isMobile}
              searchValue={this.searchValue}
              showSidebar={showSidebar}
            />
          )}

          <main
            id="main-content"
            className={`content ${!showSidebar ? 'extended' : ''}`}
            tabIndex="-1"
          >
            <FacetsBreadcrumbs
              breadcrumbs={breadcrumbs}
              isMobile={isMobile}
              showSidebar={showSidebar}
              handleDisplayClick={this.handleSidebarClick}
            />

            <div className={!showSidebar ? 'contain-1120' : ''}>
              <h2>Search Results</h2>

              <DataController
                componentId={SEARCH_DATA_CONTROLLER_ID}
                dataField="title"
                customQuery={(item, props) => {
                  return {
                    match: {
                      'model.name': 'Image'
                    }
                  };
                }}
              />

              <DataSearch
                autosuggest={false}
                className="datasearch web-form"
                customQuery={simpleQueryStringQuery}
                componentId={GLOBAL_SEARCH_BAR_COMPONENT_ID}
                dataField={['full_text']}
                debounce={1000}
                defaultSelected={globalSearchValue || null}
                filterLabel="Search"
                innerClass={{
                  input: 'searchbox rs-search-input',
                  list: 'suggestionlist'
                }}
                queryFormat="or"
                placeholder={DATASEARCH_PLACEHOLDER}
                URLParams={true}
              />

              <SelectedFilters />

              <ReactiveList
                componentId="results"
                dataField="title.primary.keyword"
                innerClass={{
                  list: 'rs-result-list photo-grid four-grid',
                  pagination: 'rs-pagination',
                  resultsInfo: 'rs-results-info'
                }}
                loader={<LoadingSpinner loading={true} />}
                onData={this.onData}
                pagination={true}
                paginationAt="bottom"
                react={{
                  and: allFilters
                }}
                sortBy="asc"
                size={12}
              />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

const mapSizeToProps = ({ width }) => ({
  isMobile: width <= MOBILE_BREAKPOINT
});

const SizedReactiveSearchContainer = withSizes(mapSizeToProps)(
  ReactivesearchContainer
);

export default withRouter(SizedReactiveSearchContainer);
