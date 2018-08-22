import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';

class Permalink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  render() {
    const { permalink } = this.props;

    return (
      <div className="summary-list-item permalink">
        <div className="data-label">Permalink</div>
        <div className="data-value web-form permalink-wrapper">
          <input
            readOnly
            type="text"
            className="permalink-input"
            value={permalink}
          />
          <CopyToClipboard
            text={permalink}
            onCopy={() => this.setState({ copied: true })}
          >
            <button className="copy-button button">
              <FontAwesomeIcon icon="copy" />
            </button>
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}

Permalink.propTypes = {
  permalink: PropTypes.string.isRequired
};

export default Permalink;
