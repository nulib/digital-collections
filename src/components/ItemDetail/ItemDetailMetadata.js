import React from 'react';
import PropTypes from 'prop-types';
import MultiMetadata from './MultiMetadata';
import SingleMetadata from './SingleMetadata';

const ItemDetailMetadata = props => {
  if (!props.item) {
    return [];
  }
  console.log('Props: ' + props);

  const {
    title = null,
    abstract = null,
    caption = null,
    creator = null,
    contributor = null,
    date = null,
    description = null,
    admin_set = null, // division
    keyword = null,
    language = null,
    location = null,
    provenance = null,
    publisher = null,
    related_url = null,
    rights_holder = null,
    source = null,
    subject = null,
    rights_statement = null,
    extra_fields = null
  } = props.item;

  return (
    <div>
      <SingleMetadata title="Title" items={title.primary} />
      <SingleMetadata title="Alternate Title" items={title.alternate} />
      <SingleMetadata title="Abstract" items={abstract} />
      <SingleMetadata title="Caption" items={caption} />
      <MultiMetadata title="Creator" items={creator} />
      <MultiMetadata title="Contributor" items={contributor} />
      <SingleMetadata title="Date" items={date} />
      <SingleMetadata title="Description" items={description} />
      <SingleMetadata title="Division" items={admin_set.title} />
      <MultiMetadata title="Genre" items={extra_fields.genre} />
      <MultiMetadata title="Keyword" items={keyword} />
      <MultiMetadata title="Language" items={language} />
      <MultiMetadata title="Location" items={location} />
      <MultiMetadata
        title="Physcial Description Material"
        items={extra_fields.physical_description.material}
      />
      <MultiMetadata
        title="Physcial Description Size"
        items={extra_fields.physical_description.size}
      />
      <SingleMetadata title="Provenance" items={provenance} />
      <MultiMetadata title="Publisher" items={publisher} urls={publisher} />
      <MultiMetadata
        title="Related url"
        items={related_url}
        urls={related_url}
      />
      <MultiMetadata title="Rights holder" items={rights_holder} />
      <SingleMetadata title="Rights Statement" items={rights_statement} />
      <MultiMetadata title="Source" items={source} urls={source} />
      <MultiMetadata title="Style period" items={extra_fields.style_period} />
      <MultiMetadata title="Subjects" items={subject} />
      <MultiMetadata title="Technique" items={extra_fields.technique} />
    </div>
  );
};

ItemDetailMetadata.propTypes = {
  item: PropTypes.object
};

export default ItemDetailMetadata;
