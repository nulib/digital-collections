import React from 'react';
import PropTypes from 'prop-types';
import MultiMetadata from './MultiMetadata';
import SingleMetadata from './SingleMetadata';

const ItemDetailMetadata = props => {
  if (!props.item) {
    return [];
  }

  const {
    title: { primary: [title] } = '',
    title: { alternate: [alternate] } = '',
    abstract: [abstract] = '',
    caption: [caption] = '',
    contributor = null,
    date: [date] = '',
    description: [description] = '',
    admin_set: { title: [admin_set] } = '', // division
    keyword = '',
    language = null,
    location = null,
    provenance: [provenance] = '',
    publisher = '',
    related_url = null,
    rights_holder = '',
    source = '',
    subject = '',
    rights_statement = '',
    extra_fields: { genre } = null,
    extra_fields: { physical_description: { material } } = null,
    extra_fields: { physical_description: { size } } = null,
    extra_fields: { style_period } = null,
    extra_fields: { technique } = null
  } = props.item;

  let getCreators = contributors => {
    let creators = [];
    for (let entry of contributors) {
      if (entry.type === 'creator') creators.push(entry);
    }
    return creators;
  };

  let getContributors = contributors => {
    let c = [];
    for (let entry of contributors) {
      if (entry.type === 'contributor') c.push(entry);
    }
    return c;
  };

  return (
    <div>
      <SingleMetadata title="Title" item={title} />
      <SingleMetadata title="Alternate Title" item={alternate} />
      <SingleMetadata title="Abstract" item={abstract} />
      <SingleMetadata title="Caption" item={caption} />
      <MultiMetadata title="Creator" items={getCreators(contributor)} />
      <MultiMetadata title="Contributor" items={getContributors(contributor)} />
      <SingleMetadata title="Date" item={date} />
      <SingleMetadata title="Description" item={description} />
      <SingleMetadata title="Division" item={admin_set} />
      <MultiMetadata title="Genre" items={genre} />
      <MultiMetadata title="Keyword" items={keyword} />
      <MultiMetadata title="Language" items={language} />
      <MultiMetadata title="Location" items={location} />
      <MultiMetadata title="Physcial Description Material" items={material} />
      <MultiMetadata title="Physcial Description Size" items={size} />
      <SingleMetadata title="Provenance" item={provenance} />
      <MultiMetadata title="Publisher" items={publisher} />
      <MultiMetadata title="Related url" items={related_url} />
      <MultiMetadata title="Rights holder" items={rights_holder} />
      <SingleMetadata title="Rights Statement" item={rights_statement} />
      <MultiMetadata title="Source" items={source} />
      <MultiMetadata title="Style period" items={style_period} />
      <MultiMetadata title="Subjects" items={subject} />
      <MultiMetadata title="Technique" items={technique} />
    </div>
  );
};

ItemDetailMetadata.propTypes = {
  item: PropTypes.object
};

export default ItemDetailMetadata;
