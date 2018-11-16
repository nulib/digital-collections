import React, { Component } from 'react';
import {
  DataSearch,
  MultiList,
  SelectedFilters,
  ReactiveList
} from '@appbaseio/reactivesearch';
import searchIcon from '../images/library-search.svg';
import PhotoBox from '../components/PhotoBox';
import {
  getESDescription,
  getESImagePath,
  getESTitle
} from '../services/elasticsearch-parser';
import LoadingSpinner from '../components/LoadingSpinner';
import YearSlider from '../components/reactive-search-wrappers/YearSlider';
import {
  GLOBAL_SEARCH_BAR_COMPONENT_ID,
  imageFacets,
  imageFilters
} from '../services/reactive-search';

class ReactivesearchContainer extends Component {
  constructor(props) {
    super(props);
    this.searchValue = null;
    this.facetValue = null;
  }

  componentDidMount() {
    this.searchValue = this.props.location.state
      ? this.props.location.state.searchValue
      : '';
    this.facetValue = this.props.location.state
      ? this.props.location.state.facetValue
      : '';
  }

  /**
   * Helper function to display a custom component to display instead of ReactiveSearch's
   * @param {Object} res - ReactivSearch result object
   */
  onData(res) {
    let item = {
      description: getESDescription(res),
      id: res.id,
      imageUrl: getESImagePath(res),
      label: getESTitle(res),
      type: res.model.name
    };

    return <PhotoBox key={item.id} item={item} />;
  }

  render() {
    const allFilters = [GLOBAL_SEARCH_BAR_COMPONENT_ID, ...imageFilters];

    // Css class name helper
    const multiListInnerClass = {
      title: 'rs-facet-title',
      list: 'rs-facet-list',
      label: 'rs-facet-label'
    };

    //TODO: Break this into components
    return (
      <div className="standard-page">
        <div id="page" className="search">
          <div id="sidebar" className="left-sidebar content" tabIndex="-1">
            <div className="box">
              {imageFacets.map(facet => {
                let defaultVal =
                  this.facetValue && this.facetValue === facet.name
                    ? [this.searchValue]
                    : [];
                return (
                  <MultiList
                    key={facet.name}
                    className={'adam'}
                    innerClass={multiListInnerClass}
                    componentId={facet.name.replace(/\s+/g, '')}
                    dataField={facet.field}
                    defaultSelected={defaultVal}
                    title={facet.name}
                    showCheckbox={false}
                    showMissing={true}
                    showSearch={false}
                    URLParams={true}
                    react={{
                      and: allFilters.filter(entry => {
                        return entry !== facet.name.replace(/\s+/g, '');
                      })
                    }}
                  />
                );
              })}
              <YearSlider />
            </div>
          </div>
          <main id="main-content" className="content" tabIndex="-1">
            <div>
              <h2>Search Results</h2>
              <DataSearch
                className="datasearch web-form"
                componentId={GLOBAL_SEARCH_BAR_COMPONENT_ID}
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
                    src={searchIcon}
                    className="rs-search-icon"
                    alt="search icon"
                  />
                }
                iconPosition="right"
                filterLabel="Search"
                URLParams={true}
              />
            </div>
            <SelectedFilters />
            <ReactiveList
              componentId="results"
              dataField="title"
              react={{
                and: allFilters
              }}
              defaultQuery={(value, props) => ({
                match: {
                  'model.name': 'Image'
                }
              })}
              loader={<LoadingSpinner loading={true} />}
              size={12}
              pagination={true}
              paginationAt="bottom"
              onData={this.onData}
              innerClass={{
                list: 'rs-result-list photo-grid three-grid',
                pagination: 'rs-pagination',
                resultsInfo: 'rs-results-info'
              }}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default ReactivesearchContainer;
