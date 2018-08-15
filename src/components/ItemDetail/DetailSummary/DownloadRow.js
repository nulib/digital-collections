import React from 'react';
import PropTypes from 'prop-types';

export function handleDownload(file, width) {
  const path = `${file}/full/${width},/0/default.jpg`;
  window.location = path;
}

const DownloadRow = props => {
  const file = props.item.representative_file_url;

  return (
    <div className="summary-list">
      <div className="summary-list-item download">
        <div className="data-label">Download Options</div>
        <div className="data-value">
          <button
            className="download-option-box"
            onClick={() => {
              handleDownload(file, 300);
            }}
          >
            300px
          </button>
          <button
            className="download-option-box big"
            onClick={() => {
              handleDownload(file, 760);
            }}
          >
            760px
          </button>
        </div>
      </div>
    </div>
  );
};

DownloadRow.propTypes = {
  item: PropTypes.object.isRequired
};

export default DownloadRow;
