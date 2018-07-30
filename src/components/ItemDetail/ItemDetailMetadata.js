import React from 'react';
import LineEntry from './LineEntry';

const ItemDetailMetadata = props => {
  if (!props.item) {
    return [];
  }

  return (
    <section className="item-section contain-970 item-categories-wrapper">
      <div id="tab-container">
        <div aria-labelledby="tab-item-data" id="tab-panel1" role="tabpanel">
          <LineEntry title="Title" labels={props.item.title_tesim} />
          <LineEntry title="Collections" labels={props.item.admin_set_tesim} />
          <LineEntry
            title="Topics"
            labels={props.item.subject_topical_label_tesim}
            urls={props.item.subject_topical_tesim}
          />
          <LineEntry
            title="Genres"
            labels={props.item.genre_label_tesim}
            urls={props.item.genre_tesim}
          />
          <LineEntry
            title="Type of Resource"
            labels={props.item.human_readable_type_tesim}
          />
          <LineEntry title="Identifiers" labels={props.item.ark_tesim} />
          <LineEntry
            title="Rights Statement"
            labels={props.item.rights_statement_tesim}
            urls={props.item.rights_statement_tesim}
          />
        </div>
      </div>
    </section>
  );
};

export default ItemDetailMetadata;
