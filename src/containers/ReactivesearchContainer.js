import React, { Component } from 'react';
import {
  DataSearch,
  MultiList,
  SelectedFilters,
  ResultCard,
  DynamicRangeSlider
} from '@appbaseio/reactivesearch';
import searchIcon from '../images/library-search.svg';

class ReactivesearchContainer extends Component {
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
      'Search',
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

    const multiListInnerClass = {
      title: 'rs-facet-title',
      list: 'rs-facet-list',
      label: 'rs-facet-label'
    };

    return (
      <div className="standard-page">
        <div id="page" className="search">
          <div id="sidebar" className="left-sidebar content" tabIndex="-1">
            <div className="box">
              {facets.map(facet => (
                <MultiList
                  key={facet.name}
                  className={'adam'}
                  innerClass={multiListInnerClass}
                  componentId={facet.name.replace(/\s+/g, '')}
                  dataField={facet.field}
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
              ))}
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
              <h2>Reactivesearch</h2>
              <DataSearch
                className="datasearch web-form"
                componentId="Search"
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
            <ResultCard
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
              size={12}
              pagination={true}
              onData={function(res) {
                return {
                  image: res.thumbnail_url,
                  url: '/items/' + res.id,
                  title: res.title.primary,
                  description: <div>{res.description}</div>
                };
              }}
              className="rs-result-card-data"
              innerClass={{
                image: 'rs-result-image',
                listItem: 'rs-result-item',
                pagination: 'rs-pagination',
                title: 'rs-result-title'
              }}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default ReactivesearchContainer;
