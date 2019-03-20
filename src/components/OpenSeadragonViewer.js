import React, { Component } from 'react';
import OpenSeadragon from 'openseadragon';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class OpenSeadragonViewer extends Component {
  constructor(props) {
    super(props);
    this.openSeadragonInstance = null;
  }

  static propTypes = {
    itemTitle: PropTypes.string,
    tileSources: PropTypes.array
  };

  state = {
    downloadLink: null
  };

  componentDidMount() {
    let { tileSources } = this.props;
    this.loadOpenSeadragon(tileSources);
  }

  componentWillUnmount() {
    this.openSeadragonInstance.removeHandler('open');
  }

  buildDownloadLink = obj => {
    // TODO: Figure out a better way to find the event which fires when this is ready
    setTimeout(() => {
      let img = this.openSeadragonInstance.drawer.canvas.toDataURL('image/png');
      this.setState({ downloadLink: img });
    }, 3000);
  };

  loadOpenSeadragon(tileSources = []) {
    const customControlIds = {
      zoomInButton: 'zoom-in',
      zoomOutButton: 'zoom-out',
      homeButton: 'home',
      fullPageButton: 'full-page',
      nextButton: 'next',
      previousButton: 'previous'
    };

    this.openSeadragonInstance = OpenSeadragon({
      id: 'openseadragon1',
      crossOriginPolicy: 'use-credentials',
      loadTilesWithAjax: true,
      ajaxWithCredentials: true,
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

    // Event listener for when OpenSeadragon's file are 'ready'
    this.openSeadragonInstance.addHandler('open', this.buildDownloadLink);
  }

  render() {
    const { downloadLink } = this.state;
    const downloadTitle = `${this.props.itemTitle.split(' ').join('-')}.png`;

    return (
      <div>
        <div id="toolbarDiv" className="toolbar">
          <a
            id="zoom-in"
            href="#zoom-in"
            className="toolbar-controls"
            title="Zoom In"
          >
            <FontAwesomeIcon icon="search-plus" />
          </a>
          <a
            id="zoom-out"
            href="#zoom-out"
            className="toolbar-controls"
            title="Zoom Out"
          >
            <FontAwesomeIcon icon="search-minus" />
          </a>
          <a
            id="full-page"
            href="#full-page"
            className="toolbar-controls"
            title="Full Screen"
          >
            <FontAwesomeIcon icon="expand" />
          </a>
          <a
            href={downloadLink || `#`}
            className="toolbar-controls"
            download={downloadTitle}
            title="Download Image"
          >
            <FontAwesomeIcon icon="download" />
          </a>
          <a
            id="previous"
            href="#previous"
            className="toolbar-controls"
            title="Previous"
          >
            <FontAwesomeIcon icon="arrow-circle-left" />
          </a>
          <a id="next" href="#next" className="toolbar-controls" title="Next">
            <FontAwesomeIcon icon="arrow-circle-right" />
          </a>
        </div>

        <div id="openseadragon1" className="open-seadragon-container" />
      </div>
    );
  }
}

export default OpenSeadragonViewer;
