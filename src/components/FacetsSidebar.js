import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RSMultiList from './reactive-search-wrappers/RSMultiList';
import YearSlider from './reactive-search-wrappers/YearSlider';

class FacetsSidebar extends Component {
  static propTypes = {
    facets: PropTypes.array,
    filters: PropTypes.array,
    isMobile: PropTypes.bool.isRequired,
    showSidebar: PropTypes.bool
  };

  render() {
    const { facets, filters, isMobile, showSidebar } = this.props;

    return (
      <>
        {!isMobile && (
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
                  this.facetValue && this.facetValue === facet.name
                    ? [this.searchValue]
                    : [];

                return (
                  <RSMultiList
                    key={facet.name}
                    allFilters={filters}
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
      </>
    );
  }
}

export default FacetsSidebar;
