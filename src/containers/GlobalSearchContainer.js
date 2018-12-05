import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { DataSearch } from '@appbaseio/reactivesearch';
import * as actions from '../actions/search';
import { SlideDown } from 'react-slidedown';
import { GLOBAL_SEARCH_BAR_COMPONENT_ID } from '../services/reactive-search';
import 'react-slidedown/lib/slidedown.css';
import { getTotalItemCount } from '../api/elasticsearch-api';

const styles = {
  searchIcon: {
    cursor: 'pointer'
  },
  inputWrapper: {
    width: '450px'
  }
};
class GlobalSearchContainer extends Component {
  constructor(props) {
    super(props);

    this.setTextInputRef = element => {
      this.textInput = element;
    };
  }

  state = {
    totalItemCount: null
  };

  componentDidMount() {
    this.getTotalItems();
  }

  async getTotalItems() {
    let response = await getTotalItemCount();

    this.setState({
      totalItemCount: response.hits.total
    });
  }

  handleClick = e => {
    this.props.searchToggle();
    this.props.history.push(`/search`);
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleClick(e);
    }
  };

  render() {
    const { totalItemCount } = this.state;

    return (
      <SlideDown closed={!this.props.open}>
        <section
          className="contain-1440 home-search"
          id="library-search-dropdown"
        >
          <div className="contain-1120">
            <div className="section-top">
              <p className="subhead">
                {`Explore ${totalItemCount} items digitized from Northwestern's digital collections.`}
              </p>
            </div>
            <div className="for-column">
              <span>for</span>
              <DataSearch
                autosuggest={false}
                style={styles.inputWrapper}
                className="datasearch web-form"
                componentId={GLOBAL_SEARCH_BAR_COMPONENT_ID}
                dataField={['full_text']}
                filterLabel="Search"
                icon={
                  <a
                    tabIndex="0"
                    style={styles.searchIcon}
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
                showFilter={true}
                URLParams={false}
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
