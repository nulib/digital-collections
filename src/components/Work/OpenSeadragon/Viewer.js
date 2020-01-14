import React, { Component } from "react";
import OpenSeadragon from "openseadragon";
import PropTypes from "prop-types";
import { MOBILE_BREAKPOINT } from "../../../services/global-vars";
import withSizes from "react-sizes";
import WorkOpenSeadragonThumbnails from "./Thumbnails";
import WorkOpenSeadragonToolBar from "./Toolbar";
import WorkOpenSeadragonFilesetReactSelect from "./FilesetReactSelect";
import Canvas2Image from "@reglendo/canvas2image";

class OpenSeadragonViewer extends Component {
  constructor(props) {
    super(props);
    this.openSeadragonInstance = null;
  }

  static propTypes = {
    isMobile: PropTypes.bool,
    itemTitle: PropTypes.string,
    fileUrl: PropTypes.string,
    rightsStatement: PropTypes.object,
    tileSources: PropTypes.array
  };

  state = {
    currentTileSource: null
  };

  componentDidMount() {
    let { tileSources } = this.props;

    this.setState({ currentTileSource: tileSources[0] });
    this.loadOpenSeadragon(tileSources.map(t => t.id));
  }

  componentWillUnmount() {
    this.openSeadragonInstance.removeHandler("page");
  }

  calculateDownloadDimensions() {
    const noCopyrightRightsStatements = [
      "No Copyright - United States",
      "No Copyright - Non Commercial Use Only"
    ];
    let returnObj = {};

    try {
      let height,
        width,
        defaultWidth =
          noCopyrightRightsStatements.indexOf(
            this.props.rightsStatement.label
          ) > -1
            ? 3000
            : 1500,
        canvasHeight = this.openSeadragonInstance.drawer.canvas.height,
        canvasWidth = this.openSeadragonInstance.drawer.canvas.width,
        proportionRatio = canvasHeight / canvasWidth;

      if (canvasWidth > defaultWidth) {
        width = defaultWidth;
      }
      width = canvasWidth > defaultWidth ? defaultWidth : canvasWidth;
      height = width * proportionRatio;

      returnObj = { width, height };
    } catch {
      console.log(
        "Error in handling download click for a fileset in OpenSeadragon viewer"
      );
      returnObj = {};
    }

    return returnObj;
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
      ajaxWithCredentials: true,
      crossOriginPolicy: "use-credentials",
      defaultZoomLevel: 0,
      gestureSettingsMouse: {
        scrollToZoom: false,
        clickToZoom: true,
        dblClickToZoom: true,
        pinchToZoom: true
      },
      id: "openseadragon1",
      loadTilesWithAjax: true,
      navigatorPosition: "ABSOLUTE",
      navigatorTop: "100px",
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
      ...customControlIds
    });

    this.openSeadragonInstance.addHandler("page", this.handlePageChange);
  }

  handleFilesetSelectChange = id => {
    this.loadNewFileset(id);
  };

  handleThumbClick = id => {
    this.loadNewFileset(id);
  };

  handlePageChange = ({ page }) => {
    this.setState({
      currentTileSource: this.props.tileSources[page]
    });
  };

  handleDownloadCropClick = () => {
    const { width, height } = this.calculateDownloadDimensions();

    if (width && height) {
      Canvas2Image.saveAsJPEG(
        this.openSeadragonInstance.drawer.canvas,
        this.props.itemTitle.split(" ").join("-"),
        width,
        height
      );
    }
  };

  handleDownloadFullSize = () => {
    const { width } = this.calculateDownloadDimensions();
    const path = `${this.state.currentTileSource.id}/full/${width},/0/default.jpg`;
    window.open(path, "_blank");
  };

  loadNewFileset(id) {
    const { tileSources } = this.props;
    const index = tileSources.findIndex(element => element.id === id);

    this.setState({ currentTileSource: tileSources[index] });
    this.openSeadragonInstance.goToPage(index);
  }

  render() {
    const { currentTileSource } = this.state;
    const { isMobile, tileSources = [] } = this.props;

    return (
      <div>
        <div className="open-seadgragon-top-bar-wrapper">
          <div
            className={`open-seadgragon-top-bar ${
              tileSources.length < 2 ? "centered" : ""
            }`}
          >
            {/* <WorkOpenSeadragonFilesetSelect
              currentTileSource={currentTileSource}
              onFileSetChange={this.handleFilesetSelectChange}
              tileSources={tileSources}
            /> */}
            <WorkOpenSeadragonFilesetReactSelect
              currentTileSource={currentTileSource}
              onFileSetChange={this.handleFilesetSelectChange}
              tileSources={tileSources}
            />

            <div id="toolbarDiv" className="toolbar">
              <WorkOpenSeadragonToolBar
                isMobile={isMobile}
                onDownloadCropClick={this.handleDownloadCropClick}
                onDownloadFullSize={this.handleDownloadFullSize}
              />
            </div>
          </div>
        </div>

        <div id="openseadragon1" className="open-seadragon-container"></div>

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
