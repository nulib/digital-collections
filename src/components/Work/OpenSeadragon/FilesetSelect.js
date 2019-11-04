import React from "react";
import PropTypes from "prop-types";

const WorkOpenSeadragonFilesetSelect = ({
  currentTileSource,
  onFileSetChange,
  tileSources = []
}) => {
  if (!currentTileSource) return null;

  return (
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
