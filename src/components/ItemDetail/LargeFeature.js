import React from 'react';
import * as elasticSearchParser from '../../services/elasticsearch-parser';
import ButtonRow from './DetailSummary/ButtonRow';
import Permalink from './DetailSummary/Permalink';
import SocialLinks from './DetailSummary/SocialLinks';
import DownloadRow from './DetailSummary/DownloadRow';
import PropTypes from 'prop-types';
import * as globalVars from '../../services/global-vars';
import { chopString } from '../../services/helpers';

const LargeFeature = props => {
  const { item } = props;
  const title = elasticSearchParser.getESTitle(item);
  const description =
    elasticSearchParser.getESDescription(item) || 'No description provided.';
  const imageUrl = elasticSearchParser.getESImagePath(
    item,
    globalVars.IIIF_LARGE_FEATURE_REGION
  );

  const styles = {
    contentSide: {
      width: '66%'
    },
    paddedBlock: {
      marginBottom: '1em'
    },
    rightSide: {
      width: '33%'
    },
    subhead: {
      display: 'block',
      fontFamily: 'Akkurat Pro Bold,Arial Black,sans-serif'
    }
  };

  return (
    <div className="section large-feature item-summary-wrapper">
      <h3>Item Details</h3>
      <div className="large-feature-inner">
        <div className="content-side" style={styles.contentSide}>
          <h4>{title}</h4>
          <div className="text">
            <p>{chopString(description, 70)}</p>
          </div>
          <ButtonRow />
        </div>
        <div className="right-side item-summary" style={styles.rightSide}>
          <h4>Item Metadata</h4>
          <div style={styles.paddedBlock}>
            <span style={styles.subhead}>Identifier</span>
            {item.id}
          </div>
          <div className="summary-list" style={styles.paddedBlock}>
            <Permalink permalink={item.permalink} />
          </div>
          <div stlye={styles.paddedBlock}>
            <SocialLinks item={item} />
          </div>
          <DownloadRow item={item} />
        </div>
      </div>
    </div>
  );
};

LargeFeature.propTypes = {
  item: PropTypes.object
};

export default LargeFeature;
