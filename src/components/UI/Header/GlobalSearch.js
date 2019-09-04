import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class GlobalSearch extends Component {
  state = {
    searchValue: ''
  };

  componentDidUpdate(prevProps) {
    const searchValue = this.props.search.searchValue;
    if (prevProps.search.searchValue !== searchValue) {
      this.setState({ searchValue });
    }
  }

  escapeDoubleQuotes(str) {
    return str.replace(/["]+/g, '%5C"');
  }

  handleSubmit = e => {
    const { searchValue } = this.state;

    e.preventDefault();
    this.props.history.push({
      pathname: `/search`,
      search: `?q="${this.escapeDoubleQuotes(searchValue)
        .split(' ')
        .join('+')}"`
    });
  };

  handleSearchChange = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  render() {
    return (
      <div id="search" className="hide-mobile">
        <div className="search-form searchblox">
          <form role="search" onSubmit={this.handleSubmit}>
            <label className="hide-label" htmlFor="q-desktop">
              Search this website
            </label>
            <input
              placeholder="Search this site"
              type="text"
              value={this.state.searchValue}
              onChange={this.handleSearchChange}
            />
            <input type="hidden" name="advanced" value="false" />
            <button type="submit">
              <span className="hide-label">Search</span>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search
});

const ConnectedGlobalSearch = connect(mapStateToProps)(GlobalSearch);

export default withRouter(ConnectedGlobalSearch);
