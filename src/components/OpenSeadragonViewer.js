import React, { Component } from 'react';
import OpenSeadragon from 'openseadragon';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = {
  viewer: {
    display: 'inline-block',
    width: '100%',
    height: '700px'
  }
};

class OpenSeadragonViewer extends Component {
  static propTypes = {
    tileSources: PropTypes.array
  };

  componentDidMount() {
    let { tileSources } = this.props;
    this.loadOpenSeadragon(tileSources);
  }

  loadOpenSeadragon(tileSources = []) {
    const customControlIds = {
      zoomInButton: 'zoom-in',
      zoomOutButton: 'zoom-out',
      homeButton: 'home',
      fullPageButton: 'full-page',
      nextButton: 'next',
      previousButton: 'previous'
    };

    OpenSeadragon({
      id: 'openseadragon1',
      prefixUrl: 'images/openseadragon/',
      preserveViewport: true,
      defaultZoomLevel: 0,
      referenceStripScroll: 'vertical',
      sequenceMode: true,
      showNavigator: true,
      showReferenceStrip: true,
      toolbar: 'toolbarDiv',
      tileSources,
      visibilityRatio: 1,
      gestureSettingsMouse: {
        scrollToZoom: false,
        clickToZoom: true,
        dblClickToZoom: true,
        pinchToZoom: true
      },
      ...customControlIds
    });
  }

  render() {
    return (
      <div>
        <div id="toolbarDiv" className="toolbar" style={styles.toolbar}>
          <a id="zoom-in" href="#zoom-in" className="toolbar-controls">
            <FontAwesomeIcon icon="search-plus" />
          </a>
          <a id="zoom-out" href="#zoom-out" className="toolbar-controls">
            <FontAwesomeIcon icon="search-minus" />
          </a>
          <a id="full-page" href="#full-page" className="toolbar-controls">
            <FontAwesomeIcon icon="expand" />
          </a>
        </div>
        <div id="openseadragon1" style={styles.viewer} />
      </div>
    );
  }
}

export default OpenSeadragonViewer;
