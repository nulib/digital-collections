import React from 'react';
import CarouselSection from '../CarouselSection';
import PropTypes from 'prop-types';
import ThisItem from './ThisItem';
import Collapsible from 'react-collapsible';
import CollapsibleHeader from '../CollapsibleHeader';

const ItemDetailCarousels = props => {
  const { adminSetItems, collectionItems, item } = props;

  const renderCollectionsCarousel = () => {
    const shouldDisplay =
      Object.keys(item).length > 0 &&
      Object.keys(collectionItems).length > 0 &&
      item.collection.length > 0;

    if (!shouldDisplay) {
      return null;
    }

    return (
      <CarouselSection
        sectionTitle={item.collection[0].title[0]}
        linkTo=""
        items={collectionItems.items}
        slidesPerView={6}
        loading=""
        error=""
      />
    );
  };

  return (
    <section className="contain-1120 item-section item-categories-wrapper">
      <h3>Library Division and Collections with this Item:</h3>
      <div className="expander expander1">
        <Collapsible
          trigger={<CollapsibleHeader label="Library Division" />}
          open={true}
        >
          {item &&
            adminSetItems && (
              <CarouselSection
                sectionTitle={item.admin_set.title[0]}
                linkTo=""
                items={adminSetItems.items}
                slidesPerView={6}
                loading=""
                error=""
              />
            )}
        </Collapsible>
        <Collapsible
          trigger={<CollapsibleHeader label="Collection" />}
          open={true}
        >
          {renderCollectionsCarousel()}
        </Collapsible>
      </div>

      <ThisItem item={item} />
    </section>
  );
};

ItemDetailCarousels.propTypes = {
  adminSetItems: PropTypes.object.isRequired,
  collectionItems: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default ItemDetailCarousels;
