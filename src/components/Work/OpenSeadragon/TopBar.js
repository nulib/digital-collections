import React from "react";
import PropTypes from "prop-types";

const WorkOpenSeadragonTopBar = ({
  currentTileSource,
  onFileSetChange,
  tileSources = []
}) => {
  if (!currentTileSource) {
    return null;
  }

  return (
    <div className="open-seadgragon-top-bar-wrapper">
      <div className="contain-1120 open-seadgragon-top-bar">
        <span data-testid="fileset-label" className="fileset-label">
          {currentTileSource && currentTileSource.label}
        </span>
        <form className="web-form open-seadgragon-fileset-select-form">
          <select
            data-testid="filesets-select"
            value={currentTileSource.id}
            onChange={onFileSetChange}
          >
            {tileSources.map((t, index) => (
              <option key={t.id} value={t.id}>
                {`page ${index + 1}: ${t.label}`}
              </option>
            ))}
          </select>
        </form>
      </div>
    </div>
  );
};

const tileSourceShape = {
  label: PropTypes.string,
  id: PropTypes.string
};

WorkOpenSeadragonTopBar.propTypes = {
  currentTileSource: PropTypes.shape(tileSourceShape),
  onFileSetChange: PropTypes.func,
  tileSources: PropTypes.arrayOf(PropTypes.shape(tileSourceShape))
};

export default WorkOpenSeadragonTopBar;
