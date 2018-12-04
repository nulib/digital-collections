import React from 'react';
import PropTypes from 'prop-types';
import { chopString } from '../../services/helpers';
import { getESDescription } from '../../services/elasticsearch-parser';
import { Link } from 'react-router-dom';
import { facetValues } from '../../services/reactive-search';

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
              searchValue: value
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
      <h4>Dates / Origin</h4>
      <ul>
        <AboutMetaValues
          items={aboutMetaMapper.date}
          facetValue={facetValues.DATE}
        />
      </ul>
      <h4>Library Locations</h4>
      <ul>
        <AboutMetaValues items={aboutMetaMapper.admin_set} />
      </ul>
      <h4>Locations</h4>
      <ul>
        <AboutMetaValues
          items={aboutMetaMapper.based_near}
          facetValue={facetValues.LOCATION}
        />
      </ul>
      <h4>Subjects</h4>
      <ul>
        <AboutMetaValues
          items={aboutMetaMapper.subject}
          facetValue={facetValues.SUBJECT}
        />
      </ul>
      <h4>Work Types (display or no)?</h4>
      <ul>
        <li>Photographs</li>
      </ul>
    </div>
  );
};

SidebarAboutTab.propTypes = {
  collectionItems: PropTypes.array,
  item: PropTypes.object
};

export default SidebarAboutTab;
