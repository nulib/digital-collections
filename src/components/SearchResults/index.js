import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import SearchResultItem from './SearchResultItem';
import Sort from './Sort';

const SearchResults = props => {
  const numResults = props.results ? props.results.length : 0;

  const breadCrumbItems = [
    {
      title: 'Search',
      link: '/search-results'
    },
    {
      title: props.searchTerm,
      link: ''
    }
  ];

  return (
    <main id="main-content" className="content" tabIndex="-1">
      <Breadcrumbs items={breadCrumbItems} />
      <h4>
        {numResults} results found for {props.searchTerm}
      </h4>
      <Sort />

      <div className="section">
        <div className="photo-grid three-grid">
          <SearchResultItem />
        </div>
      </div>
    </main>
  );
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  searchTerm: PropTypes.string
};

export default SearchResults;
