import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RSMultiList from './reactive-search-wrappers/RSMultiList';
import { withRouter } from 'react-router-dom';
import { ROUTES } from '../services/global-vars';
import {
  COLLECTION_DATA_CONTROLLER_ID,
  SEARCH_DATA_CONTROLLER_ID
} from '../services/reactive-search';

class FacetsSidebar extends Component {
  static propTypes = {
    facets: PropTypes.array,
    facetValue: PropTypes.string,
    filters: PropTypes.array,
    location: PropTypes.object,
    searchValue: PropTypes.string,
    showSidebar: PropTypes.bool
  };

  render() {
    const {
      facets,
      facetValue,
      filters,
      location,
      searchValue,
      showSidebar
    } = this.props;

    let multiDropdownListId =
      location.pathname === ROUTES.SEARCH.path
        ? SEARCH_DATA_CONTROLLER_ID
        : COLLECTION_DATA_CONTROLLER_ID;

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
                facet={facet}
                multiDropdownListId={multiDropdownListId}
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
