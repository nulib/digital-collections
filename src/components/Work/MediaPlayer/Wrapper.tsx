import React from "react";
import CloverIIIF from "@samvera/clover-iiif";

// This is for testing
// eslint-disable-next-line
const url =
  "https://raw.githubusercontent.com/mathewjordan/mirador-playground/main/assets/iiif/manifest/assortedCanvases.json";

export interface WorkMediaPlayerWrapperProps {
  manifestId: string;
}

const WorkMediaPlayerWrapper: React.FC<WorkMediaPlayerWrapperProps> = ({
  manifestId,
}) => {
  if (!manifestId) return null;
  return (
    <div data-testid="media-player-wrapper">
      <CloverIIIF key={manifestId} manifestId={manifestId} />
    </div>
  );
};

export default WorkMediaPlayerWrapper;
