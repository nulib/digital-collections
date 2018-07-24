import React, { Component } from 'react';
import SearchResults from '../components/SearchResults';
import SearchResulsSidebar from '../components/SearchResults/SearchResultsSidebar';
import { connect } from 'react-redux';

class SearchResultsContainer extends Component {
  render() {
    const { results, searchTerm = '' } = this.props.search;

    return (
      <div className="standard-page">
        <div id="page" className="search">
          <SearchResulsSidebar />
          <SearchResults results={results} searchTerm={searchTerm} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps)(SearchResultsContainer);
