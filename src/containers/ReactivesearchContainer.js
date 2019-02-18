import React, { Component } from 'react';
import {
  DataSearch,
  SelectedFilters,
  ReactiveList
} from '@appbaseio/reactivesearch';
import searchIcon from '../images/library-search.svg';
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
import RSMultiList from '../components/reactive-search-wrappers/RSMultiList';
import { generateTitleTag } from '../services/helpers';
import { Helmet } from 'react-helmet';
import RSPhotoBox from '../components/reactive-search-wrappers/RSPhotoBox';

class ReactivesearchContainer extends Component {
  constructor(props) {
    super(props);
    this.searchValue = null;
    this.facetValue = null;
  }

  state = {
    componentLoaded: false
  };

  componentDidMount() {
    this.searchValue = this.props.location.state
      ? this.props.location.state.searchValue
      : '';
    this.facetValue = this.props.location.state
      ? this.props.location.state.facetValue
      : '';

    this.setState({ componentLoaded: true });
  }

  /**
   * Helper function to display a custom component to display instead of ReactiveSearch's
   * @param {Object} res - ReactivSearch result object
   */
  onData = res => {
    let item = {
      description: getESDescription(res),
      id: res.id,
      imageUrl: getESImagePath(res),
      label: getESTitle(res),
      type: res.model.name
    };

    return <RSPhotoBox key={item.id} item={item} />;
  };

  render() {
    const allFilters = [GLOBAL_SEARCH_BAR_COMPONENT_ID, ...imageFilters];
    const { componentLoaded } = this.state;

    const queryStringQuery = (value, props) => ({
      query_string: {
        default_field: 'full_text',
        query: value
      }
    });

    //TODO: Break this into components
    return (
      <div className="standard-page">
        <Helmet>
          <title>{generateTitleTag('Search')}</title>
        </Helmet>
        <div id="page" className="search">
          <div id="sidebar" className="left-sidebar content" tabIndex="-1">
            <div className="box">
              {componentLoaded &&
                imageFacets.map(facet => {
                  let defaultVal =
                    this.facetValue && this.facetValue === facet.name
                      ? [this.searchValue]
                      : [];

                  return (
                    <RSMultiList
                      key={facet.name}
                      allFilters={allFilters}
                      defaultVal={defaultVal}
                      facet={facet}
                      title={facet.name}
                    />
                  );
                })}
              <YearSlider title="Date" />
            </div>
          </div>
          <main id="main-content" className="content" tabIndex="-1">
            <div>
              <h2>Search Results</h2>
              <DataSearch
                customQuery={queryStringQuery}
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
              defaultQuery={(value, props) => ({
                match: {
                  'model.name': 'Image'
                },
                sort: [
                  {
                    'title.primary.keyword': {
                      order: 'asc'
                    }
                  }
                ]
              })}
              innerClass={{
                list: 'rs-result-list photo-grid three-grid',
                pagination: 'rs-pagination',
                resultsInfo: 'rs-results-info'
              }}
              loader={<LoadingSpinner loading={true} />}
              onData={this.onData}
              pagination={true}
              paginationAt="bottom"
              react={{
                and: allFilters
              }}
              size={12}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default ReactivesearchContainer;
