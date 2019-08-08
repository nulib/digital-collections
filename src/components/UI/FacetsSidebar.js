import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RSMultiList from './ReactiveSearchWrappers/RSMultiList';
import { withRouter } from 'react-router-dom';
import { ROUTES } from '../../services/global-vars';
import {
  imagesOnlyDefaultQuery,
  collectionDefaultQuery
} from '../../services/reactive-search';

class FacetsSidebar extends Component {
  static propTypes = {
    facets: PropTypes.array,
    facetValue: PropTypes.string,
    filters: PropTypes.array,
    location: PropTypes.object, // provided by { withRouter }
    match: PropTypes.object, // provided by { withRouter }
    searchValue: PropTypes.string,
    showSidebar: PropTypes.bool,
    excludes: PropTypes.array
  };

  isSearchPage = () => {
    return this.props.location.pathname.indexOf(ROUTES.SEARCH.path) > -1;
  };

  collectionsQuery = () => {
    return collectionDefaultQuery(
      this.props.match.params.id,
      this.props.excludes
    );
  };

  render() {
    const {
      facets,
      facetValue,
      filters,
      searchValue,
      showSidebar
    } = this.props;

    return (
      <div
        aria-label="section navigation menu"
        aria-hidden={!showSidebar}
        className={`facets-sidebar ${!showSidebar ? 'collapsed' : ''}`}
        tabIndex="-1"
      >
        <div
          className={`facet-sidebar-content-wrapper ${
            !showSidebar ? 'hidden' : ''
          }`}
        >
          <h2>Filter By</h2>
          {facets.map(facet => {
            let defaultVal =
              facetValue && facetValue === facet.name ? [searchValue] : [];

            return (
              <RSMultiList
                key={facet.name}
                allFilters={filters}
                defaultVal={defaultVal}
                defaultQuery={
                  this.isSearchPage()
                    ? imagesOnlyDefaultQuery
                    : this.collectionsQuery
                }
                facet={facet}
                title={facet.name}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(FacetsSidebar);
