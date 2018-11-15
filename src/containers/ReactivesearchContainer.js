import React, { Component } from 'react';
import {
  DataSearch,
  MultiList,
  SelectedFilters,
  ReactiveList,
  DynamicRangeSlider
} from '@appbaseio/reactivesearch';
import searchIcon from '../images/library-search.svg';
import PhotoBox from '../components/PhotoBox';
import {
  getESDescription,
  getESImagePath,
  getESTitle
} from '../services/elasticsearch-parser';
import LoadingSpinner from '../components/LoadingSpinner';

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
    const facets = [
      { name: 'Collection', field: 'collection.title.keyword' },
      { name: 'Creator', field: 'creator.label.keyword' },
      { name: 'Contributor', field: 'contributor.label.keyword' },
      { name: 'Genre', field: 'genre.label.keyword' },
      { name: 'Language', field: 'language.label.keyword' },
      { name: 'Library Unit', field: 'admin_set.title.keyword' },
      { name: 'Rights Statement', field: 'rights_statement.label.keyword' },
      { name: 'Style Period', field: 'style_period.label.keyword' },
      { name: 'Subject', field: 'subject.label.keyword' },
      { name: 'Technique', field: 'technique.label.keyword' },
      { name: 'Visibility', field: 'visibility.keyword' }
    ];

    const allFilters = [
      'search',
      'Date',
      'Visibility',
      'Technique',
      'Subject',
      'StylePeriod',
      'RightsStatement',
      'LibraryUnit',
      'Language',
      'Genre',
      'Contributor',
      'Creator',
      'Collection'
    ];

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
              {facets.map(facet => {
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
              <DynamicRangeSlider
                componentId="Date"
                dataField="year"
                title="Date"
                showHistogram={true}
                showFilter={true}
                stepValue={10}
              />
            </div>
          </div>
          <main id="main-content" className="content" tabIndex="-1">
            <div>
              <h2>Search Results</h2>
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
                    src={searchIcon}
                    className="rs-search-icon"
                    alt="search icon"
                  />
                }
                iconPosition="right"
                filterLabel="search"
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
