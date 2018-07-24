import React, { Component } from 'react';
import SearchResults from '../components/SearchResults';
import SearchResulsSidebar from '../components/SearchResults/SearchResultsSidebar';

class SearchResultsContainer extends Component {
  componentDidMount() {
    document.body.classList.add('standard-page');
    document.getElementById('page').classList.remove('standard-margin');
  }

  render() {
    return (
      <div className="standard-page">
        <div id="page" className="search">
          <SearchResulsSidebar />
          <SearchResults />
        </div>
      </div>
    );
  }
}

export default SearchResultsContainer;
