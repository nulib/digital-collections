import React from 'react';
import CarouselSection from '../CarouselSection';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ItemDetailCarousels = props => {
  const { adminSetItems, collectionItems, item } = props;
  const styles = {
    caret: {
      fontSize: '6rem',
      color: '#f0f0f0'
    }
  };

  const renderCollectionsCarousel = () => {
    const shouldDisplay =
      Object.keys(item).length > 0 && Object.keys(collectionItems).length > 0;

    if (!shouldDisplay) {
      return null;
    }

    return (
      <div>
        <h3 className="open">Collection</h3>
        <CarouselSection
          sectionTitle={item.collection[0].title[0]}
          linkTo=""
          items={collectionItems.items}
          slidesPerView={6}
          loading=""
          error=""
        />
      </div>
    );
  };

  return (
    <section className="contain-1120 item-section item-categories-wrapper">
      <h3>Library Division and Collections with this Item:</h3>

      <div className="expander expander1" data-collapse="data-collapse">
        {item && adminSetItems && <h3 className="open">Library Division</h3>}
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
        {renderCollectionsCarousel()}
      </div>
      <div className="this-item-wrapper">
        <div>
          <FontAwesomeIcon icon="caret-down" style={styles.caret} />
        </div>
        <p>This item</p>
        <img src={item && item.thumbnail_url} alt={item.label} />
      </div>
    </section>
  );
};

ItemDetailCarousels.propTypes = {
  adminSetItems: PropTypes.object.isRequired,
  collectionItems: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default ItemDetailCarousels;
