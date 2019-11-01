import React, { Component } from "react";
import OpenSeadragon from "openseadragon";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MOBILE_BREAKPOINT } from "../../../services/global-vars";
import withSizes from "react-sizes";
import WorkOpenSeadragonThumbnails from "./Thumbnails";
import WorkOpenSeadragonTopBar from "./TopBar";

class OpenSeadragonViewer extends Component {
  constructor(props) {
    super(props);
    this.openSeadragonInstance = null;
  }

  static propTypes = {
    isMobile: PropTypes.bool,
    itemTitle: PropTypes.string,
    rightsStatement: PropTypes.object,
    tileSources: PropTypes.array
  };

  state = {
    currentTileSource: null,
    downloadLink: null
  };

  componentDidMount() {
    let { tileSources } = this.props;
    this.setState({ currentTileSource: tileSources[0] });
    this.loadOpenSeadragon(tileSources.map(t => t.id));
  }

  componentWillUnmount() {
    this.openSeadragonInstance.removeHandler("open");
  }

  buildDownloadLink = obj => {
    // TODO: Figure out a better way to find the event which fires when this is ready
    setTimeout(() => {
      let img = this.openSeadragonInstance.drawer.canvas.toDataURL("image/png");
      this.setState({ downloadLink: img });
    }, 3000);
  };

  canDownloadFullSize() {
    const { rightsStatement } = this.props;

    return (
      rightsStatement.hasOwnProperty("uri") &&
      rightsStatement.uri === "http://rightsstatements.org/vocab/NoC-US/1.0/"
    );
  }

  loadOpenSeadragon(tileSources = []) {
    const customControlIds = {
      zoomInButton: "zoom-in",
      zoomOutButton: "zoom-out",
      homeButton: "home",
      fullPageButton: "full-page",
      nextButton: "next",
      previousButton: "previous"
    };

    this.openSeadragonInstance = OpenSeadragon({
      id: "openseadragon1",
      crossOriginPolicy: "use-credentials",
      loadTilesWithAjax: true,
      ajaxWithCredentials: true,
      defaultZoomLevel: 0,
      navigatorPosition: "ABSOLUTE",
      navigatorTop: "30px",
      navigatorLeft: "40px",
      navigatorHeight: "200px",
      navigatorWidth: "260px",
      preserveViewport: true,
      referenceStripScroll: "vertical",
      sequenceMode: true,
      showNavigator: !this.props.isMobile,
      showReferenceStrip: false,
      toolbar: "toolbarDiv",
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
    this.openSeadragonInstance.addHandler("open", this.buildDownloadLink);
  }

  handleFilesetSelectChange = e => {
    console.log("e.target.value", e.target.value);
    this.loadNewFileset(e.target.value);
  };

  handleThumbClick = id => {
    this.loadNewFileset(id);
  };

  loadNewFileset(id) {
    const { tileSources } = this.props;
    const index = tileSources.findIndex(element => element.id === id);

    this.setState({ currentTileSource: tileSources[index] });
    this.openSeadragonInstance.goToPage(index);
  }

  render() {
    const { currentTileSource, downloadLink } = this.state;
    const downloadTitle = `${this.props.itemTitle.split(" ").join("-")}.png`;
    const { isMobile, tileSources } = this.props;

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

          {!isMobile && this.canDownloadFullSize() && (
            <a
              href={downloadLink || `#`}
              className="toolbar-controls"
              download={downloadTitle}
              title="Download Image"
            >
              <FontAwesomeIcon icon="download" />
            </a>
          )}
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

        {tileSources.length > 1 && (
          <WorkOpenSeadragonTopBar
            currentTileSource={currentTileSource}
            onFileSetChange={this.handleFilesetSelectChange}
            tileSources={tileSources}
          />
        )}

        <div id="openseadragon1" className="open-seadragon-container" />

        {tileSources.length > 1 && (
          <WorkOpenSeadragonThumbnails
            currentTileSource={currentTileSource}
            onThumbClick={this.handleThumbClick}
            tileSources={tileSources}
          />
        )}
      </div>
    );
  }
}

const mapSizeToProps = ({ width }) => ({
  isMobile: width <= MOBILE_BREAKPOINT
});

export default withSizes(mapSizeToProps)(OpenSeadragonViewer);
