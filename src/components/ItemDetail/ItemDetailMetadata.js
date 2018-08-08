import React from 'react';
import PropTypes from 'prop-types';
import LineEntry from './LineEntry';

const ItemDetailMetadata = props => {
  if (!props.item) {
    return [];
  }
  console.log('Props: ' + props);

  const { title } = props.item;

  return (
    <section className="item-section contain-970 item-categories-wrapper">
      <div id="tab-container">
        <div aria-labelledby="tab-item-data" id="tab-panel1" role="tabpanel">
          <h4>Title: {title.primary}</h4>
        </div>
      </div>
    </section>
  );
};

ItemDetailMetadata.propTypes = {
  item: PropTypes.object
};

export default ItemDetailMetadata;
