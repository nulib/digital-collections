import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { DataSearch } from '@appbaseio/reactivesearch';
import * as actions from '../actions/search';
import { SlideDown } from 'react-slidedown';
import { GLOBAL_SEARCH_BAR_COMPONENT_ID } from '../services/reactive-search';
import 'react-slidedown/lib/slidedown.css';

class GlobalSearchContainer extends Component {
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
    inputWrapper: {
      width: '450px'
    }
  };

  handleClick = e => {
    const queryString = `?search="${this.textInput.value.replace(' ', '+')}"`;
    this.props.searchToggle();
    this.props.history.push(`/search${queryString}`);
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleClick(e);
    }
  };

  render() {
    return (
      <SlideDown closed={!this.props.open}>
        <section
          className="contain-1440 home-search"
          id="library-search-dropdown"
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
                autosuggest={false}
                style={this.styles.inputWrapper}
                className="datasearch web-form"
                componentId={GLOBAL_SEARCH_BAR_COMPONENT_ID}
                dataField={['full_text']}
                filterLabel="Search"
                icon={
                  <a
                    tabIndex="0"
                    style={this.styles.searchIcon}
                    className="rs-search-icon"
                    alt="search icon"
                    onClick={this.handleClick}
                    onKeyPress={this.handleKeyPress}
                  >
                    Search
                  </a>
                }
                iconPosition="right"
                innerRef={this.setTextInputRef}
                innerClass={{
                  input: 'searchbox rs-search-input',
                  list: 'suggestionlist'
                }}
                onClick={this.handleClick}
                onKeyPress={this.handleKeyPress}
                queryFormat="or"
                placeholder="Search for an item"
                showFilter={false}
                URLParams={true}
              />
            </div>
          </div>
        </section>
      </SlideDown>
    );
  }
}

const mapStateToProps = state => ({
  open: state.search.open
});

const mapDispatchToProps = dispatch => ({
  searchToggle: () => dispatch(actions.searchToggle())
});

const globalSearchWithRouter = withRouter(GlobalSearchContainer);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(globalSearchWithRouter);
