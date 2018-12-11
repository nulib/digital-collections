import React, { Component } from 'react';
import OpenSeadragonViewer from '../components/OpenSeadragonViewer';
import PropTypes from 'prop-types';
import { IIIF_LARGE_IMAGE_REGION } from '../services/global-vars';
import { getTileSources } from '../services/iiif-parser';
import { getManifest } from '../api';

const styles = {
  wrapper: {
    background: '#342f2e',
    position: 'relative',
    textAlign: 'center'
  }
};

class OpenSeadragonContainer extends Component {
  static propTypes = {
    id: PropTypes.string,
    item: PropTypes.object
  };

  state = {
    showOpenSeadragon: false,
    tileSources: []
  };

  componentDidMount() {
    this.getManifest(this.props.item.iiif_manifest);
  }

  async getManifest(url) {
    let response = await getManifest(url);

    if (response.error) {
      // TODO: Some kind of error handling to the UI here
      return;
    }
    // Get the sources for OpenSeadragon viewer from the manifest
    let tileSources = getTileSources(response);
    this.setState({ tileSources });
  }

  handleImageClick = () => {
    if (!this.state.showOpenSeadragon) {
      this.setState({ showOpenSeadragon: true });
    }
  };

  render() {
    const { item } = this.props;
    const imgUrl = this.props.item.representative_file_url;
    const { showOpenSeadragon, tileSources } = this.state;

    if (item) {
      return (
        <section style={styles.wrapper}>
          {!showOpenSeadragon && (
            <img
              src={`${imgUrl}${IIIF_LARGE_IMAGE_REGION}`}
              alt="NUL"
              onClick={this.handleImageClick}
            />
          )}

          {showOpenSeadragon && (
            <OpenSeadragonViewer tileSources={tileSources} />
          )}
        </section>
      );
    }

    return null;
  }
}

export default OpenSeadragonContainer;
