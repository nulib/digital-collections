import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { DataSearch } from '@appbaseio/reactivesearch';
import searchIcon from '../images/library-search.svg';
import * as actions from '../actions/search';

class GlobalSearch extends Component {
  constructor(props) {
    super(props);

    this.textInput = null;
    this.setTextInputRef = element => {
      this.textInput = element;
    };
  }

  styles = {
    searchIcon: {
      cursor: 'pointer'
    },
    section: {
      open: {
        display: 'block'
      },
      closed: {
        display: 'none'
      }
    }
  };

  handleClick = e => {
    const queryString = `?search="${this.textInput.value.replace(' ', '+')}"`;

    this.props.searchToggle();
    this.props.history.push(`/reactivesearch${queryString}`);
  };

  render() {
    return (
      <section
        className="contain-1440 home-search"
        id="library-search-dropdown"
        style={
          this.props.open
            ? this.styles.section.open
            : this.styles.section.closed
        }
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
            <DataSearch
              className="datasearch web-form"
              componentId="search"
              dataField={['full_text']}
              queryFormat="or"
              placeholder="Search for an item"
              innerClass={{
                input: 'searchbox rs-search-input',
                list: 'suggestionlist'
              }}
              autosuggest={false}
              icon={
                <img
                  style={this.styles.searchIcon}
                  src={searchIcon}
                  className="rs-search-icon"
                  alt="search icon"
                  onClick={this.handleClick}
                />
              }
              iconPosition="right"
              filterLabel="search"
              URLParams={true}
              innerRef={this.setTextInputRef}
            />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  open: state.search.open
});

const mapDispatchToProps = dispatch => ({
  searchToggle: () => dispatch(actions.searchToggle())
});

const globalSearchWithRouter = withRouter(GlobalSearch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(globalSearchWithRouter);
