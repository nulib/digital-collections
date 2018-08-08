import React from 'react';
import PropTypes from 'prop-types';
import MultiMetadata from './MultiMetadata';
import SingleMetadata from './SingleMetadata';

const Cite = props => {
  if (!props.item) {
    return [];
  }

  const {
    title_tesim = null,
    ark_tesim = null,
    identifier = null,
    license = null,
    use_statement = null
  } = props.item;

  let formatMLA = () => {
    return [title_tesim + " here's the rest MLA"];
  };

  let formatChicago = () => {
    return [title_tesim + ' chicago format'];
  };

  let formatAPA = () => {
    return [title_tesim + ' apa format'];
  };

  let formatWikipedia = () => {
    return [title_tesim + ' wikipedia format'];
  };

  return null;

  return (
    <div>
      <div className="cite-group-col">
        <div className="cite-group">
          <MultiMetadata title="Ark" labels={ark_tesim} urls={ark_tesim} />
          <MultiMetadata
            title="Identifier"
            labels={identifier}
            urls={identifier}
          />
          <MultiMetadata title="License" labels={license} urls={license} />
          <SingleMetadata
            title="Use Statement"
            labels={use_statement}
            urls={use_statement}
          />
        </div>
      </div>
      <div className="cite-group-col">
        <SingleMetadata title="MLA Format" labels={formatMLA()} />
        <SingleMetadata
          title="Chicago/Turabian Format"
          labels={formatChicago()}
        />
        <SingleMetadata title="APA Format" labels={formatAPA()} />
        <SingleMetadata title="Wikipedia Citation" labels={formatWikipedia()} />
      </div>
    </div>
  );
};

Cite.propTypes = {
  item: PropTypes.object
};

export default Cite;
