import React, { Component } from 'react';
import {
  DataSearch,
  SingleList,
  MultiList,
  DateRange,
  SelectedFilters,
  ResultCard
} from '@appbaseio/reactivesearch';

class ReactivesearchContainer extends Component {
  render() {
    return (
      <div className="standard-page">
        <div id="page" className="search">
          <div id="sidebar" className="left-sidebar content" tabIndex="-1">
            <div className="box">
              <MultiList
                componentId="KeywordFilter"
                dataField="keyword.keyword"
                title="Keyword"
                showSearch={false}
                URLParams={true}
              />
              <SingleList
                componentId="CollectionFilter"
                dataField="collection.title.keyword"
                title="Collection"
                showSearch={false}
                URLParams={true}
              />
              <SingleList
                componentId="ContributorFilter"
                dataField="contributor.label.keyword"
                title="Contributor"
                showSearch={false}
                URLParams={true}
              />
              <MultiList
                componentId="SubjectFilter"
                dataField="subject.label.keyword"
                title="Subject (All)"
                showSearch={false}
                URLParams={true}
              />
              <MultiList
                componentId="AdminSetFilter"
                dataField="admin_set.title.keyword"
                title="Division"
                showSearch={false}
                URLParams={true}
              />
              <DateRange
                componentId="DateRange"
                dataField="expanded_date"
                title="Date Range"
              />
            </div>
          </div>
          <main id="main-content" className="content" tabIndex="-1">
            <div>
              <h2>Reactivesearch</h2>
              <DataSearch
                className="datasearch"
                componentId="mainSearch"
                dataField={['full_text']}
                queryFormat="or"
                placeholder="Search for an item"
                innerClass={{
                  input: 'searchbox',
                  list: 'suggestionlist'
                }}
                autosuggest={false}
                iconPosition="left"
                filterLabel="search"
              />
            </div>
            <SelectedFilters />
            <ResultCard
              componentId="results"
              dataField="title"
              react={{
                or: [
                  'mainSearch',
                  'KeywordFilter',
                  'CollectionFilter',
                  'DateRange',
                  'ContributorFilter',
                  'SubjectFilter'
                ]
              }}
              defaultQuery={(value, props) => ({
                match: {
                  'model.name': 'Image'
                }
              })}
              size={12}
              onData={function(res) {
                return {
                  image: res.thumbnail_url,
                  url: '/items/' + res.id,
                  title: res.title.primary,
                  description: <div>{res.description}</div>
                };
              }}
              className="result-data"
              innerClass={{
                title: 'result-title',
                image: 'result-image',
                listItem: 'result-item'
              }}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default ReactivesearchContainer;
