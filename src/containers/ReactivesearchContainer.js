import React, { Component } from 'react';
import {
  DataSearch,
  MultiList,
  SelectedFilters,
  ResultCard,
  DynamicRangeSlider
} from '@appbaseio/reactivesearch';

class ReactivesearchContainer extends Component {
  render() {
    return (
      <div className="standard-page">
        <div id="page" className="search">
          <div id="sidebar" className="left-sidebar content" tabIndex="-1">
            <div className="box">
              <MultiList
                componentId="Collection"
                dataField="collection.title.keyword"
                title="Collection"
                showSearch={false}
                URLParams={true}
              />
              <MultiList
                componentId="Creator"
                dataField="creator.label.keyword"
                title="Creator"
                showSearch={false}
                URLParams={true}
              />
              <MultiList
                componentId="Contributor"
                dataField="contributor.label.keyword"
                title="Contributor"
                showSearch={false}
                URLParams={true}
              />
              <MultiList
                componentId="Genre"
                dataField="genre.label.keyword"
                title="Genre"
                showSearch={false}
                URLParams={true}
              />
              <MultiList
                componentId="Language"
                dataField="language.label.keyword"
                title="Language"
                showSearch={false}
                URLParams={true}
              />
              <MultiList
                componentId="AdminSet"
                dataField="admin_set.title.keyword"
                title="Library Unit"
                showSearch={false}
                URLParams={true}
              />
              <MultiList
                componentId="RightsStatement"
                dataField="rights_statement.label.keyword"
                title="Rights Statement"
                showSearch={false}
                URLParams={true}
              />
              <MultiList
                componentId="StylePeriod"
                dataField="style_period.label.keyword"
                title="Style Period"
                showSearch={false}
                URLParams={true}
              />
              <MultiList
                componentId="Subject"
                dataField="subject.label.keyword"
                title="Subject"
                showSearch={false}
                URLParams={true}
              />
              <MultiList
                componentId="Technique"
                dataField="technique.label.keyword"
                title="Technique"
                showSearch={false}
                URLParams={true}
              />
              <MultiList
                componentId="Visibility"
                dataField="visibility.keyword"
                title="Visibility"
                showSearch={false}
                URLParams={true}
              />
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
                className="datasearch"
                componentId="Search"
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
                URLParams={true}
              />
            </div>
            <SelectedFilters />
            <ResultCard
              componentId="results"
              dataField="title"
              react={{
                and: [
                  'Search',
                  'Date',
                  'Visibility',
                  'Technique',
                  'Subject',
                  'StylePeriod',
                  'RightsStatement',
                  'AdminSet',
                  'Language',
                  'Genre',
                  'Contributor',
                  'Creator',
                  'Collection'
                ]
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
