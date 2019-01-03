import React from 'react';
import PropTypes from 'prop-types';
import { chopString } from '../../services/helpers';
import { getESDescription } from '../../services/elasticsearch-parser';
import { Link } from 'react-router-dom';
import { facetValues } from '../../services/reactive-search';
import Collapsible from 'react-collapsible';
import CollapsibleHeader from '../CollapsibleHeader';

const AboutMetaValues = props => {
  const values = [...props.items];

  // Facet value provided, so give a link to the Search Results page to prep the search results
  if (props.facetValue) {
    return values.map(value => (
      <li key={value}>
        <Link
          to={{
            pathname: '/search',
            state: {
              facetValue: props.facetValue,
              searchValue: '' + value
            }
          }}
        >
          {value}
        </Link>
      </li>
    ));
  }

  // Just display the value with no link
  return values.map(value => <li key={value}>{value}</li>);
};

const SidebarAboutTab = props => {
  const { collectionItems, item } = props;
  let aboutMetaMapper = {};
  const indexKeys = ['admin_set', 'based_near', 'date', 'subject'];

  // Initialize empty arrays for each index key
  indexKeys.forEach(key => {
    aboutMetaMapper[key] = new Set();
  });

  // Calculate values for the aboutMetaMapper
  collectionItems.forEach(item => {
    const { _source } = item;

    indexKeys.forEach(indexKey => {
      if (_source[indexKey] && _source[indexKey].length > 0) {
        // Not admin_set s
        _source[indexKey].forEach(sourceVal => {
          aboutMetaMapper[indexKey].add(
            typeof sourceVal === 'object' ? sourceVal.label : sourceVal
          );
        });
      }
      // admin_set - has a unique data structure
      if (indexKey === 'admin_set') {
        aboutMetaMapper[indexKey].add(_source[indexKey].title[0]);
      }
    });
  });

  return (
    <div>
      <h3>Collection Description</h3>
      <p>{chopString(getESDescription(item), 70)}</p>

      <div className="collapsible-no-side-margins">
        <div className="expander expander1">
          {/*
          // TODO: Re-enable this once the Created Date field gets indexed:
          https://github.com/nulib/next-gen-front-end-react/issues/240

          <Collapsible
            trigger={<CollapsibleHeader label="Dates / Origin" />}
            open={true}
            key="Dates / Origin"
          >
            <ul>
              <AboutMetaValues items={aboutMetaMapper.date} />
            </ul>
          </Collapsible> */}

          <Collapsible
            trigger={<CollapsibleHeader label="Library Locations" />}
            open={true}
            key="Library Locations"
          >
            <ul>
              <AboutMetaValues
                items={aboutMetaMapper.admin_set}
                facetValue={facetValues.LIBRARY_UNIT}
              />
            </ul>
          </Collapsible>

          <Collapsible
            trigger={<CollapsibleHeader label="Locations" />}
            open={true}
            key="Locations"
          >
            <ul>
              <AboutMetaValues
                items={aboutMetaMapper.based_near}
                facetValue={facetValues.LOCATION}
              />
            </ul>
          </Collapsible>

          <Collapsible
            trigger={<CollapsibleHeader label="Subjects" />}
            open={true}
            key="Subjects"
          >
            <ul>
              <AboutMetaValues
                items={aboutMetaMapper.subject}
                facetValue={facetValues.SUBJECT}
              />
            </ul>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

SidebarAboutTab.propTypes = {
  collectionItems: PropTypes.array,
  item: PropTypes.object
};

export default SidebarAboutTab;
