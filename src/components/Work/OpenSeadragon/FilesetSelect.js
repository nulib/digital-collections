import React from "react";
import PropTypes from "prop-types";

const WorkOpenSeadragonFilesetSelect = ({
  currentTileSource,
  onFileSetChange,
  tileSources = []
}) => {
  const tileSourcesCount = tileSources.length;

  if (!currentTileSource || tileSourcesCount < 2) return null;

  return (
    <form className="web-form open-seadgragon-fileset-select-form">
      <select
        data-testid="filesets-select"
        value={currentTileSource.id}
        onChange={onFileSetChange}
      >
        {tileSources.map((t, index) => (
          <option key={t.id} value={t.id}>
            {`${index + 1} of ${tileSourcesCount}: ${t.label}`}
          </option>
        ))}
      </select>
    </form>
  );
};

const tileSourceShape = {
  label: PropTypes.string,
  id: PropTypes.string
};

WorkOpenSeadragonFilesetSelect.propTypes = {
  currentTileSource: PropTypes.shape(tileSourceShape),
  onFileSetChange: PropTypes.func,
  tileSources: PropTypes.array
};

export default WorkOpenSeadragonFilesetSelect;
