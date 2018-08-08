import React from 'react';
import Cite from './Cite';
import ItemDetailMetadata from './ItemDetailMetadata';

const ItemDetail = props => {
  return (
    <section className="item-section contain-970 item-categories-wrapper">
      <div id="tab-container">
        <ul id="tabs" role="tablist">
          <li role="presentation">
            <a
              aria-controls="tab-panel1"
              href="#tab-panel1"
              id="tab1"
              role="tab"
            >
              About this Item
            </a>
          </li>
          <li role="presentation">
            <a
              aria-controls="tab-panel2"
              href="#tab-panel2"
              id="tab2"
              role="tab"
            >
              Find this Item
            </a>
          </li>
          <li role="presentation">
            <a
              aria-controls="tab-panel3"
              href="#tab-panel3"
              id="tab3"
              role="tab"
            >
              Cite this Item
            </a>
          </li>
        </ul>
        <div id="tab-content">
          <div aria-labelledby="tab-item-data" id="tab-panel1" role="tabpanel">
            <ItemDetailMetadata item={props.item} />
          </div>
          <div aria-labelledby="tab-cite" id="tab-panel3" role="tabpanel">
            <Cite item={props.item} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetail;
