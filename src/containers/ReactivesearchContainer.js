import React, { Component } from 'react';
import {
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
  imagesOnlyDefaultQuery,
  simpleQueryStringQuery
} from '../services/reactive-search';
import { generateTitleTag } from '../services/helpers';
import { Helmet } from 'react-helmet';
import PhotoBox from '../components/PhotoBox';
import { withRouter } from 'react-router-dom';
import { MOBILE_BREAKPOINT, ROUTES } from '../services/global-vars';
import withSizes from 'react-sizes';
import FacetsSidebar from '../components/FacetsSidebar';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { loadDataLayer } from '../services/google-tag-manager';
import FiltersShowHideButton from '../components/FiltersShowHideButton';

const breadcrumbs = [
  { link: '/', title: 'Home' },
  { link: '', title: 'Search Results' }
];

class ReactivesearchContainer extends Component {
  state = {
    componentLoaded: false,
    showSidebar: false
  };

  componentDidMount() {
    loadDataLayer({ pageTitle: ROUTES.SEARCH.title });
    this.setState({ componentLoaded: true });
  }

  handleDisplaySidebarClick = e => {
    e.preventDefault();
    this.setState({ showSidebar: !this.state.showSidebar });
  };

  /**
   * Helper function to display a custom component to display instead of ReactiveSearch's
   * @param {Object} res - ReactivSearch result object
   */
  renderItem = res => {
    let item = {
      id: res.id,
      imageUrl: getESImagePath(res),
      label: getESTitle(res),
      type: res.model.name
    };

    return <PhotoBox key={item.id} item={item} />;
  };

  render() {
    const allFilters = [GLOBAL_SEARCH_BAR_COMPONENT_ID, ...imageFilters];
    const { componentLoaded, showSidebar } = this.state;

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
              searchValue={this.searchValue}
              showSidebar={showSidebar}
            />
          )}

          <main
            id="main-content"
            className={`content ${!showSidebar ? 'extended' : ''}`}
            tabIndex="-1"
          >
            <Breadcrumbs items={breadcrumbs} />

            <h2>Search Results</h2>

            <DataSearch
              autosuggest={false}
              className="datasearch web-form"
              customQuery={simpleQueryStringQuery}
              componentId={GLOBAL_SEARCH_BAR_COMPONENT_ID}
              dataField={[
                'full_text',
                'all_titles',
                'description',
                'all_subjects'
              ]}
              debounce={1000}
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

            <FiltersShowHideButton
              showSidebar={showSidebar}
              handleToggleFiltersClick={this.handleDisplaySidebarClick}
            />

            <ReactiveList
              componentId="results"
              dataField="title.primary.keyword"
              innerClass={{
                list: 'rs-result-list photo-grid four-grid',
                pagination: 'rs-pagination',
                resultsInfo: 'rs-results-info'
              }}
              defaultQuery={imagesOnlyDefaultQuery}
              loader={<LoadingSpinner loading={true} />}
              renderItem={this.renderItem}
              pagination={true}
              paginationAt="bottom"
              react={{
                and: allFilters
              }}
              sortBy="asc"
              size={12}
              URLParams={true}
            />
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
