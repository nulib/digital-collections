import React from "react";
import PropTypes from "prop-types";
import OpenSeadragonContainer from "../../screens/Work/OpenSeadragonContainer";
import Work from "../Work/Work";

function SharedItem({ work }) {
  if (!work) {
    return null;
  }
  return (
    <div data-testid="shared-item">
      <OpenSeadragonContainer item={work} />
      <div id="page">
        <main id="main-content" className="content" tabIndex="0">
          <Work work={work} />
        </main>
      </div>
    </div>
  );
}

SharedItem.propTypes = {
  work: PropTypes.object,
};

export default SharedItem;
