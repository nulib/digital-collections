import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doSearch } from '../actions/search';
import { withRouter } from 'react-router';

class GlobalSearch extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  state = {
    searchInput: ''
  };

  styles = {
    section: {
      display: 'block'
    }
  };

  handleInputChange(e) {
    this.setState({ searchInput: e.target.value });
  }

  handleSearchSubmit() {
    this.props.doSearch(this.state.searchInput);
    this.props.history.push('/search-results');
  }

  render() {
    return (
      <section
        className="contain-1440 home-search"
        id="library-search-dropdown"
        style={this.styles.section}
      >
        <div className="contain-1120">
          <div className="section-top">
            <p className="subhead">
              {
                " Explore 729,730 items digitized from Northwestern's digital collections. "
              }
            </p>
          </div>
          <div className="for-column">
            <span>for</span>
            <input
              className="searchbox"
              maxLength="256"
              name="query"
              placeholder="Ex: Cleopatra"
              size="20"
              title="search"
              type="text"
              value={this.state.searchInput}
              onChange={this.handleInputChange}
            />
            <button type="submit" onClick={this.handleSearchSubmit}>
              <span className="hide-label">Search</span>
            </button>
            <div className="advanced-search">
              <a>Advanced Search</a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doSearch: searchTerm => dispatch(doSearch(searchTerm))
});
const mapStateToProps = state => ({
  search: state.search
});

const globalSearchWithRouter = withRouter(GlobalSearch);
export default connect(mapStateToProps, mapDispatchToProps)(
  globalSearchWithRouter
);
