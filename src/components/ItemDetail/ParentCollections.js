import React from 'react';
import FeatureBoxSection from '../FeatureBoxSection';
import PropTypes from 'prop-types';
import ThisItem from './ThisItem';
import SectionTop from '../SectionTop';
import { facetValues } from '../../services/reactive-search';

const ParentCollections = props => {
  const { adminSetItems, collectionItems, item } = props;
  const adminSetTitle = item.admin_set ? item.admin_set.title[0] : '';

  return (
    <section>
      {item &&
        adminSetItems && (
          <div>
            <SectionTop
              sectionTitle="Library Division"
              optionalSubhead={adminSetTitle}
              optionalButtons={[
                {
                  label: 'View All Items in Library Division',
                  url: '/search',
                  state: {
                    facetValue: facetValues.LIBRARY_UNIT,
                    searchValue: adminSetTitle
                  }
                }
              ]}
            />
            <FeatureBoxSection items={adminSetItems} />
          </div>
        )}

      {item &&
        collectionItems.length > 0 && (
          <div>
            <SectionTop
              sectionTitle="Collection"
              optionalSubhead={item.collection[0].title[0]}
              optionalButtons={[
                {
                  label: 'View All Items in Collection',
                  url: '/search',
                  state: {
                    facetValue: facetValues.COLLECTION,
                    searchValue: item.collection[0].title[0]
                  }
                }
              ]}
            />
            <FeatureBoxSection items={collectionItems} />
          </div>
        )}

      <ThisItem item={item} />
    </section>
  );
};

ParentCollections.propTypes = {
  adminSetItems: PropTypes.array.isRequired,
  collectionItems: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired
};

export default ParentCollections;
