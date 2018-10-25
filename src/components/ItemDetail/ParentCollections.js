import React from 'react';
import FeatureBoxSection from '../FeatureBoxSection';
import PropTypes from 'prop-types';
import ThisItem from './ThisItem';
import SectionTop from '../SectionTop';

const ParentCollections = props => {
  const { adminSetItems, collectionItems, item } = props;

  return (
    <section>
      {item &&
        adminSetItems && (
          <div>
            <SectionTop
              sectionTitle="Library Division"
              optionalSubhead={item.admin_set.title[0]}
              optionalButtons={[
                { label: 'View All Items in Collection', url: '/' }
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
                { label: 'View All Items in Collection', url: '/' }
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
