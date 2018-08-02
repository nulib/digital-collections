import React from 'react';
import PropTypes from 'prop-types';
import LineEntry from './LineEntry';

const ItemDetailMetadata = props => {
  if (!props.item) {
    return [];
  }

  const {
    title_tesim,
    admin_set_tesim,
    subject_topical_label_tesim,
    subject_topical_tesim,
    genre_label_tesim,
    genre_tesim,
    human_readable_type_tesim,
    ark_tesim,
    rights_statement_label_tesim
  } = props.item;

  return (
    <section className="item-section contain-970 item-categories-wrapper">
      <div id="tab-container">
        <div aria-labelledby="tab-item-data" id="tab-panel1" role="tabpanel">
          <LineEntry title="Title" labels={title_tesim} />
          <LineEntry title="Collections" labels={admin_set_tesim} />
          {subject_topical_label_tesim ? (
            <LineEntry
              title="Topics"
              labels={subject_topical_label_tesim}
              urls={subject_topical_tesim}
            />
          ) : null}
          {genre_label_tesim ? (
            <LineEntry
              title="Genres"
              labels={genre_label_tesim}
              urls={genre_tesim}
            />
          ) : null}
          {human_readable_type_tesim ? (
            <LineEntry
              title="Type of Resource"
              labels={human_readable_type_tesim}
            />
          ) : null}
          {ark_tesim ? (
            <LineEntry title="Identifiers" labels={ark_tesim} />
          ) : null}
          {rights_statement_label_tesim ? (
            <LineEntry
              title="Rights Statement"
              labels={rights_statement_label_tesim}
              urls={rights_statement_label_tesim}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};

ItemDetailMetadata.propTypes = {
  item: PropTypes.object
};

export default ItemDetailMetadata;
