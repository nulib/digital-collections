import React from 'react';
import LineEntry from './LineEntry';

const ItemDetailMetadata = props => {
  if (!props.item) {
    return [];
  }

  return (
    <div aria-labelledby="tab-item-data" id="tab-panel1" role="tabpanel">
      <LineEntry title="Title" items={props.item.title_tesim} />
      <LineEntry title="Collections" items={props.item.admin_set_tesim} />
      <LineEntry
        title="Topics"
        items={props.item.subject_topical_label_tesim}
      />
      <LineEntry title="Genres" items={props.item.genre_label_tesim} />
      <LineEntry
        title="Type of Resource"
        items={props.item.human_readable_type_tesim}
      />
      <LineEntry title="Identifiers" items={props.item.ark_tesim} />
      <LineEntry
        title="Rights Statement"
        items={props.item.rights_statement_tesim}
      />
    </div>
  );
};

export default ItemDetailMetadata;
