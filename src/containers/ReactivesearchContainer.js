import React, { Component } from 'react';
import {
  DataSearch,
  SelectedFilters,
  ReactiveList
} from '@appbaseio/reactivesearch';
import { getESImagePath, getESTitle } from '../services/elasticsearch-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingSpinner from '../components/LoadingSpinner';
import YearSlider from '../components/reactive-search-wrappers/YearSlider';
import {
  DATASEARCH_PLACEHOLDER,
  GLOBAL_SEARCH_BAR_COMPONENT_ID,
  imageFacets,
  imageFilters,
  simpleQueryStringQuery
} from '../services/reactive-search';
import RSMultiList from '../components/reactive-search-wrappers/RSMultiList';
import { generateTitleTag } from '../services/helpers';
import { Helmet } from 'react-helmet';
import PhotoBox from '../components/PhotoBox';
import { withRouter } from 'react-router-dom';
import { MOBILE_BREAKPOINT } from '../services/global-vars';
import withSizes from 'react-sizes';
import { Link } from 'react-router-dom';

const styles = {
  facetsShowHideIcon: {
    marginRight: '5px'
  }
};

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
    const allFilters = [GLOBAL_SEARCH_BAR_COMPONENT_ID, ...imageFilters];
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
          {!isMobile && (
            <div
              aria-label="section navigation menu"
              className={`facets-sidebar ${!showSidebar ? 'collapsed' : ''}`}
              tabIndex="-1"
            >
              <div
                className={`facet-sidebar-content-wrapper ${
                  !showSidebar ? 'hidden' : ''
                }`}
              >
                <h2>Filter By</h2>
                {componentLoaded &&
                  imageFacets.map(facet => {
                    let defaultVal =
                      this.facetValue && this.facetValue === facet.name
                        ? [this.searchValue]
                        : [];

                    return (
                      <RSMultiList
                        key={facet.name}
                        allFilters={allFilters}
                        defaultVal={defaultVal}
                        facet={facet}
                        title={facet.name}
                      />
                    );
                  })}
                <YearSlider title="Date" />
              </div>
            </div>
          )}

          <main
            id="main-content"
            className={`content ${!showSidebar ? 'extended' : ''}`}
            tabIndex="-1"
          >
            <section className="contain-1120">
              <ul id="breadcrumbs">
                {!isMobile && (
                  <li>
                    {/* eslint-disable-next-line */}
                    <a
                      href="#"
                      onClick={this.handleSidebarClick}
                      className="facet-sidebar-collapse-link"
                    >
                      <FontAwesomeIcon
                        icon={showSidebar ? 'eye-slash' : 'eye'}
                        style={styles.facetsShowHideIcon}
                      />
                      {showSidebar ? 'Hide Filters' : 'Show Filters'}
                    </a>
                  </li>
                )}

                <li style={{ background: 'none' }}>
                  <Link to="/">Home</Link>
                </li>
                <li>Search Results</li>
              </ul>
            </section>

            <div className={!showSidebar ? 'contain-1120' : ''}>
              <h2>Search Results</h2>
              <DataSearch
                customQuery={simpleQueryStringQuery}
                className="datasearch web-form"
                componentId={GLOBAL_SEARCH_BAR_COMPONENT_ID}
                dataField={['full_text']}
                debounce={1000}
                defaultSelected={globalSearchValue || null}
                queryFormat="or"
                placeholder={DATASEARCH_PLACEHOLDER}
                innerClass={{
                  input: 'searchbox rs-search-input',
                  list: 'suggestionlist'
                }}
                autosuggest={false}
                filterLabel="Search"
                URLParams={true}
              />
              <SelectedFilters />
              <ReactiveList
                componentId="results"
                dataField="title"
                defaultQuery={(value, props) => ({
                  match: {
                    'model.name': 'Image'
                  },
                  sort: [
                    {
                      'title.primary.keyword': {
                        order: 'asc'
                      }
                    }
                  ]
                })}
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
