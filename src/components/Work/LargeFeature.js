import React from "react";
import * as elasticSearchParser from "../../services/elasticsearch-parser";
import ButtonRow from "./DetailSummary/ButtonRow";
import SocialLinks from "./DetailSummary/SocialLinks";
import DownloadRow from "./DetailSummary/DownloadRow";
import PropTypes from "prop-types";
import { chopString } from "../../services/helpers";
import IIIFDraggable from "./IIIFDraggable";
import { MOBILE_BREAKPOINT } from "../../services/global-vars";
import withSizes from "react-sizes";

const LargeFeature = props => {
  const { isMobile, item } = props;
  const title = elasticSearchParser.getESTitle(item);
  const description =
    elasticSearchParser.getESDescription(item) || "No description provided.";

  const styles = {
    paddedBlock: {
      marginBottom: "1em"
    },
    subhead: {
      display: "block",
      fontFamily: "Akkurat Pro Bold,Arial Black,sans-serif"
    }
  };

  return (
    <div className="section large-feature item-summary-wrapper">
      <h3>Item Details</h3>
      <div className="large-feature-inner">
        <div className="content-side">
          <h4>{title}</h4>
          <div className="text">
            <p>{chopString(description, 70)}</p>
          </div>
          <ButtonRow />
        </div>
        <div className="right-side item-summary">
          <h4>Item Metadata</h4>
          <div style={styles.paddedBlock}>
            <span style={styles.subhead}>Identifier</span>
            {item.id}
          </div>
          <div stlye={styles.paddedBlock}>
            <SocialLinks item={item} />
          </div>

          {/* Removing this until we support a "Download All" feature which downloads all filesets in a work, and not just the first fileset */}
          {/* {!isMobile && <DownloadRow item={item} />} */}

          <IIIFDraggable iiifManifest={item.iiif_manifest} />
        </div>
      </div>
    </div>
  );
};

LargeFeature.propTypes = {
  item: PropTypes.object
};

const mapSizeToProps = ({ width }) => ({
  isMobile: width <= MOBILE_BREAKPOINT
});

export default withSizes(mapSizeToProps)(LargeFeature);
