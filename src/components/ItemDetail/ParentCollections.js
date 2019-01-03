import React from 'react';
import PhotoGrid from '../PhotoGrid';
import PropTypes from 'prop-types';
import ThisItem from './ThisItem';
import SectionTop from '../SectionTop';
import { facetValues } from '../../services/reactive-search';

const ParentCollections = props => {
  const { adminSetItems, collectionId, collectionItems, item } = props;
  const adminSetTitle = item.admin_set ? item.admin_set.title[0] : '';

  return (
    <div>
      {item &&
        adminSetItems && (
          <section className="section">
            <SectionTop
              sectionTitle="Library Department"
              optionalSubhead={adminSetTitle}
              optionalButtons={[
                {
                  label: 'View All Items in Library Department',
                  url: '/search',
                  state: {
                    facetValue: facetValues.LIBRARY_UNIT,
                    searchValue: adminSetTitle
                  }
                }
              ]}
            />
            <PhotoGrid items={adminSetItems} hideDescriptions={true} />
          </section>
        )}

      {item &&
        collectionItems.length > 0 && (
          <section className="section">
            <SectionTop
              sectionTitle="Collection"
              optionalSubhead={item.collection[0].title[0]}
              optionalButtons={[
                {
                  label: 'View All Items in Collection',
                  url: `/collections/${collectionId}`
                }
              ]}
            />
            <PhotoGrid items={collectionItems} />
          </section>
        )}

      <ThisItem item={item} />
    </div>
  );
};

ParentCollections.propTypes = {
  adminSetItems: PropTypes.array.isRequired,
  collectionId: PropTypes.string.isRequired,
  collectionItems: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired
};

export default ParentCollections;
