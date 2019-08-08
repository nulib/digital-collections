import React from 'react';
import PropTypes from 'prop-types';

export function handleDownload(file, width) {
  const path = `${file}/full/${width},/0/default.jpg`;
  window.location = path;
}

const styles = {
  container: {
    marginBottom: '1rem'
  }
};

const DownloadRow = props => {
  const file = props.item.representative_file_url;
  const smallSize = 760;
  const bigSize = 1500;

  return (
    <div className="summary-list" style={styles.container}>
      <div className="summary-list-item download">
        <div className="data-label">Download Options</div>
        <div className="data-value">
          <button
            className="download-option-box"
            onClick={() => {
              handleDownload(file, smallSize);
            }}
          >
            {`${smallSize}px`}
          </button>
          <button
            className="download-option-box big"
            onClick={() => {
              handleDownload(file, bigSize);
            }}
          >
            {`${bigSize}px`}
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
