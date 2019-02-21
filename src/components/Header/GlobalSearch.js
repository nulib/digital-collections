import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class GlobalSearch extends Component {
  state = {
    searchValue: '',
    totalItemCount: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push({
      pathname: '/search',
      state: {
        globalSearch: this.state.searchValue
      }
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

export default withRouter(GlobalSearch);
