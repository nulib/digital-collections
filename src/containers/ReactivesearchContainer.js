import React, { Component } from 'react';
import {
  DataSearch,
  MultiList,
  SelectedFilters,
  ReactiveList,
  DynamicRangeSlider
} from '@appbaseio/reactivesearch';
import searchIcon from '../images/library-search.svg';
import { Link } from 'react-router-dom';
import { chopString } from '../services/helpers';

class ReactivesearchContainer extends Component {
  onData(res) {
    const url = `/items/${res.id}`;

    return (
      <article key={res._id} className="photo-box" aria-labelledby="grid1">
        <Link to={url}>
          <img src={res.thumbnail_url} alt="enter descriptive text" />
        </Link>
        <h4 id="grid1">
          <Link to={url}>{res.title.primary}</Link>
        </h4>
        <p>{res.description && chopString(res.description[0], 25)}</p>
      </article>
    );
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
