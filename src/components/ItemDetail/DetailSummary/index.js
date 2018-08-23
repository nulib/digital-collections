import React from 'react';
import PropTypes from 'prop-types';
import MetadataSummary from './MetadataSummary';
import ButtonRow from './ButtonRow';
import DownloadRow from './DownloadRow';
import IdentifiersRow from './IdentifiersRow';
import Permalink from './Permalink';

const DetailSummary = props => {
  if (!props.item) {
    return [];
  }

  const { item } = props;

  return (
    <section className="item-summary-wrapper item-section">
      <div className="item-summary contain-1120">
        <article className="item-left">
          <h3>{item.title.primary}</h3>
          <p>{item.description}</p>
          <MetadataSummary item={item} />
          <ButtonRow />
        </article>
        <article className="item-right">
          <IdentifiersRow item={item} />
          <div className="summary-list">
            {props.item.permalink && (
              <Permalink permalink={props.item.permalink} />
            )}
          </div>
          {item.representative_file_url && <DownloadRow item={item} />}
        </article>
      </div>
    </section>
  );
};

DetailSummary.propTypes = {
  item: PropTypes.object
};

export default DetailSummary;
