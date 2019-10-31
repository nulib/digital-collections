import React from "react";
import PropTypes from "prop-types";

const WorkOpenSeadragonThumbnails = ({
  currentTileSource,
  tileSources = [],
  onThumbClick
}) => {
  return (
    <div
      data-testid="open-seadragon-thumbnails-container"
      className="bottom-panel"
    >
      <div className="thumbnail-view">
        <ul className="panel-listing-thumbs">
          {tileSources.map(t => (
            <li
              key={t.id}
              data-testid="fileset-thumbnail"
              onClick={() => onThumbClick(t.id)}
              aria-label="Thumbnail"
              className={
                currentTileSource && currentTileSource.id === t.id
                  ? "active"
                  : ""
              }
            >
              <img
                src={`${t.id}/square/70,70/0/default.jpg`}
                className="thumbnail-image"
                alt={t.label}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

WorkOpenSeadragonThumbnails.propTypes = {
  currentTileSource: PropTypes.object,
  onThumbClick: PropTypes.func,
  tileSources: PropTypes.array
};

export default WorkOpenSeadragonThumbnails;
