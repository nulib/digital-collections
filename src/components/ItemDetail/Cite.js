import React from 'react';
import PropTypes from 'prop-types';
import MultiMetadata from './MultiMetadata';
import SingleMetadata from './SingleMetadata';

const Cite = props => {
  if (!props.item) {
    return [];
  }

  const {
    title = null,
    permalink = null,
    identifier = null,
    license = null,
    use_statement = null
  } = props.item;

  let formatMLA = () => {
    return [title.primary + " here's the rest MLA"];
  };

  let formatChicago = () => {
    return [title.primary + ' chicago format'];
  };

  let formatAPA = () => {
    return [title.primary + ' apa format'];
  };

  let formatWikipedia = () => {
    return [title.primary + ' wikipedia format'];
  };

  return (
    <div>
      <div className="cite-group-col">
        <div className="cite-group">
          <SingleMetadata title="Ark" items={[permalink]} />
          <MultiMetadata title="Identifier" items={identifier} />
          <MultiMetadata title="License" items={license} />
          <SingleMetadata title="Use Statement" items={use_statement} />
        </div>
      </div>
      <div className="cite-group-col">
        <SingleMetadata title="MLA Format" items={formatMLA()} />
        <SingleMetadata
          title="Chicago/Turabian Format"
          items={formatChicago()}
        />
        <SingleMetadata title="APA Format" items={formatAPA()} />
        <SingleMetadata title="Wikipedia Citation" items={formatWikipedia()} />
      </div>
    </div>
  );
};

Cite.propTypes = {
  item: PropTypes.object
};

export default Cite;
