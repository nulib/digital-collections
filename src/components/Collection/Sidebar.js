import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MultiList } from '@appbaseio/reactivesearch';
import YearSlider from '../reactive-search-wrappers/YearSlider';
import Collapsible from 'react-collapsible';
import CollapsibleHeader from '../CollapsibleHeader';

const Sidebar = props => {
  const { item } = props;

  const facets = [
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
    <div
      id="sidebar"
      className="left-sidebar content collection-sidebar"
      tabIndex="-1"
    >
      <div className="box">
        <div id="tab-container">
          <Tabs selectedTabClassName="active" id="tab-container">
            <TabList id="tabs" role="tablist">
              <Tab>About</Tab>
              <Tab>Filters</Tab>
            </TabList>

            <div id="tab-content">
              {/* About tab */}
              <TabPanel>
                <h3>Collection Description</h3>
                <p>{item.description}</p>
                <h4>Dates / Origin</h4>
                <ul>
                  <li>Circa 1916 (Approximate)</li>
                </ul>
                <h4>Library Locations</h4>
                <ul>
                  <li>Northwestern University Transportation Library</li>
                </ul>
                <h4>Subjects</h4>
                <ul>
                  <li>Wilmo Company</li>
                  <li>Automobiles</li>
                  <li>Parts</li>
                  <li>Commercial catalogs</li>
                  <li>Automobile factories</li>
                </ul>
                <h4>Work Types</h4>
                <ul>
                  <li>Photographs</li>
                </ul>
              </TabPanel>

              {/* Filter */}
              <TabPanel>
                <div className="collapsible-no-side-margins">
                  <div className="expander expander1">
                    {facets.map(facet => {
                      return (
                        <Collapsible
                          trigger={<CollapsibleHeader label={facet.name} />}
                          open={true}
                          key={facet.name}
                        >
                          <MultiList
                            key={facet.name}
                            innerClass={multiListInnerClass}
                            componentId={facet.name.replace(/\s+/g, '')}
                            dataField={facet.field}
                            title=""
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
                        </Collapsible>
                      );
                    })}
                  </div>
                </div>

                <YearSlider />
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  item: PropTypes.object
};

export default Sidebar;
