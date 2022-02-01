import React from "react";
import PropTypes from "prop-types";
import OpenSeadragonContainer from "screens/Work/OpenSeadragonContainer";
import useWorkType from "hooks/use-work-type";
import WorkMediaPlayerWrapper from "components/Work/MediaPlayer/Wrapper";
import Work from "components/Work/Work";
function SharedItem({ work }) {
  const { isMediaType } = useWorkType();

  if (!work) return null;

  return (
    <div data-testid="shared-item">
      {work && !isMediaType(work.workType) && (
        <OpenSeadragonContainer item={work} />
      )}
      {work && isMediaType(work.workType) && (
        <WorkMediaPlayerWrapper manifestId={work.iiifManifest} />
      )}

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
