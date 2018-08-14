import React from 'react';
import PropTypes from 'prop-types';
import MultiMetadata from './MultiMetadata';
import SingleMetadata from './SingleMetadata';

const Cite = props => {
  if (!props.item) {
    return [];
  }

  const {
    title: { primary: [title] } = '',
    permalink = '',
    identifier = null,
    license = null,
    use_statement = ''
  } = props.item;

  let formatMLA = `${title} here's the rest MLA`;
  let formatChicago = `${title} chicago format`;
  let formatAPA = `${title} apa format`;
  let formatWikipedia = `${title} wikipedia format`;

  return (
    <div>
      <div className="cite-group-col">
        <div className="cite-group">
          <SingleMetadata title="Ark" item={permalink} />
          <MultiMetadata title="Identifier" items={identifier} />
          <MultiMetadata title="License" items={license} />
          <SingleMetadata title="Use Statement" item={use_statement} />
        </div>
      </div>
      <div className="cite-group-col">
        <SingleMetadata title="MLA Format" item={formatMLA} />
        <SingleMetadata title="Chicago/Turabian Format" item={formatChicago} />
        <SingleMetadata title="APA Format" item={formatAPA} />
        <SingleMetadata title="Wikipedia Citation" item={formatWikipedia} />
      </div>
    </div>
  );
};

Cite.propTypes = {
  item: PropTypes.object
};

export default Cite;
