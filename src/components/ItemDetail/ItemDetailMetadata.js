import React from 'react';
import PropTypes from 'prop-types';
import LineEntry from './LineEntry';

const ItemDetailMetadata = props => {
  if (!props.item) {
    return [];
  }

  const {
    title_tesim = null,
    alternate_title_tesim = null,
    abstract = null,
    caption = null,
    creator = null,
    nul_creator = null,
    contributor = null,
    date = null,
    description = null,
    admin_set_tesim = null, // division
    genre_label_tesim = null,
    genre_tesim = null,
    keyword = null,
    language = null,
    location = null,
    physical_description_material = null,
    physical_description_size = null,
    provenance = null,
    publisher = null,
    related_url = null,
    rights_holder = null,
    source = null,
    style_period = null,
    technique = null,
    subject_topical_label_tesim = null,
    subject_topical_tesim = null,
    rights_statement_label_tesim = null
  } = props.item;

  return (
    <div>
      <LineEntry title="Title" labels={title_tesim} />
      <LineEntry title="Alternate Title" labels={alternate_title_tesim} />
      <LineEntry title="Abstract" labels={abstract} />
      <LineEntry title="Caption" labels={caption} />
      <LineEntry title="Creator" labels={creator} urls={creator} />
      <LineEntry title="Contributor" labels={contributor} urls={contributor} />
      <LineEntry title="Date" labels={date} urls={date} />
      <LineEntry title="Description" labels={description} />
      <LineEntry
        title="Division"
        labels={admin_set_tesim}
        urls={admin_set_tesim}
      />
      <LineEntry title="Genre" labels={genre_label_tesim} urls={genre_tesim} />
      <LineEntry title="Keyword" labels={keyword} urls={keyword} />
      <LineEntry title="Language" labels={language} urls={language} />
      <LineEntry title="Location" labels={location} urls={location} />
      <LineEntry
        title="Physcial Description Material"
        labels={physical_description_material}
        urls={physical_description_material}
      />
      <LineEntry
        title="Physcial Description Size"
        labels={physical_description_size}
        urls={physical_description_size}
      />
      <LineEntry title="Provenance" labels={provenance} />
      <LineEntry title="Publisher" labels={publisher} urls={publisher} />
      <LineEntry title="Related url" labels={related_url} urls={related_url} />
      <LineEntry
        title="Rights holder"
        labels={rights_holder}
        urls={rights_holder}
      />
      <LineEntry
        title="Rights Statement"
        labels={rights_statement_label_tesim}
        urls={rights_statement_label_tesim}
      />
      <LineEntry title="Source" labels={source} urls={source} />
      <LineEntry
        title="Style period"
        labels={style_period}
        urls={style_period}
      />
      <LineEntry
        title="Subjects"
        labels={subject_topical_label_tesim}
        urls={subject_topical_tesim}
      />
      <LineEntry title="Technique" labels={technique} urls={technique} />
    </div>
  );
};

ItemDetailMetadata.propTypes = {
  item: PropTypes.object
};

export default ItemDetailMetadata;
