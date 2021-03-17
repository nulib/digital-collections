import React from "react";
import * as elasticSearchParser from "../../services/elasticsearch-parser";
import ButtonRow from "./DetailSummary/ButtonRow";
import SocialLinks from "./DetailSummary/SocialLinks";
import PropTypes from "prop-types";
import { chopString } from "../../services/helpers";
import IIIFDraggable from "./IIIFDraggable";

const LargeFeature = (props) => {
  const { item } = props;
  const title = elasticSearchParser.getESTitle(item.descriptiveMetadata);
  const description =
    elasticSearchParser.getESDescription(item) || "No description provided.";

  const styles = {
    paddedBlock: {
      marginBottom: "1em",
    },
    subhead: {
      display: "block",
      fontFamily: "Akkurat Pro Bold,Arial Black,sans-serif",
    },
  };

  return (
    <div
      data-testid="section-item-details"
      className="section large-feature item-summary-wrapper"
    >
      <h3>Item Details</h3>
      <div className="large-feature-inner">
        <div className="content-side">
          {title && <h4 data-testid="item-title">{title}</h4>}
          <div className="text">
            {Array.isArray(description) &&
              description.map((desc) => (
                <p key={desc} data-testid="item-description">
                  {chopString(desc, 70)}
                </p>
              ))}
          </div>
          <ButtonRow />
        </div>
        <div data-testid="item-summary" className="right-side item-summary">
          <h4>Item Metadata</h4>
          <div style={styles.paddedBlock}>
            <span style={styles.subhead}>Identifier</span>
            <span data-testid="identifier">{item.id}</span>
          </div>
          <div style={styles.paddedBlock}>
            <SocialLinks item={item} />
          </div>

          <IIIFDraggable iiifManifest={item.iiifManifest} />
        </div>
      </div>
    </div>
  );
};

LargeFeature.propTypes = {
  item: PropTypes.object,
};

export default LargeFeature;
