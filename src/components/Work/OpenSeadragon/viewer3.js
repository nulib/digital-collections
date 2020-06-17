import React, { Component } from "react";
import OpenSeadragon from "openseadragon";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";
import WorkOpenSeadragonThumbnails from "./Thumbnails";
import WorkOpenSeadragonToolBar from "./Toolbar";
import WorkOpenSeadragonFilesetReactSelect from "./FilesetReactSelect";
import Canvas2Image from "@reglendo/canvas2image";
import { withRouter } from "react-router-dom";
import {
  parseHash,
  updateUrl,
  useParams
} from "../../../services/osd-hash-params";

class OpenSeadragonViewer extends Component {
  constructor(props) {
    super(props);
    this.openSeadragonInstance = null;
  }

  static propTypes = {
    itemTitle: PropTypes.string,
    fileUrl: PropTypes.string,
    rightsStatement: PropTypes.object,
    tileSources: PropTypes.array
  };

  state = {
    currentTileSource: null,
    currentTileSourceIndex: null,
    currentURLParams: window.location.hash,
    isParamsLoaded: false
  };

  componentDidMount() {
    let { tileSources } = this.props;

    const urlParams = parseHash();
    console.log("urlParams", urlParams);

    this.setState({
      currentURLParams: urlParams,
      isParamsLoaded: false
    });
    const fileSet = urlParams["fileset"];

    // let currentUrlParams = new URLSearchParams(window.location.hash.slice(1));
    // const url = window.location.pathname + "#" + currentUrlParams.toString();
    // window.history.replaceState({}, "", url);

    this.setState({
      currentTileSourceIndex: fileSet || 0,
      currentTileSource: tileSources[fileSet || 0]
    });

    this.loadOpenSeadragon(tileSources.map(t => t.id));

    if (fileSet > 0) {
      // const url = `${window.location.pathname}#fileset=${fileSet}`;
      // window.history.replaceState({}, "", url);
      this.openSeadragonInstance.goToPage(fileSet);

      //   currentUrlParams.set("fileset", page);
      //   const url = window.location.pathname + "#" + currentUrlParams.toString();
      //   window.history.replaceState({}, "", url);
    }
  }

  componentDidUpdate() {
    console.log("componentDidUpdate()", this.state.currentURLParams);
    console.log("window.location.pathname", window.location.pathname);
    const urlParams = this.state.currentURLParams;
    updateUrl({
      pan: { x: urlParams["x"], y: urlParams["y"] },
      zoom: urlParams["zoom"]
    });
    this.openSeadragonInstance.viewport.zoomTo(urlParams["zoom"], null, true);
    // useParams({ x: urlParams["x"], y: urlParams["y"] ,
    // zoom: urlParams["zoom"]});
    // this.openSeadragonInstance.viewport.panTo(new $.Point(params.x, params.y), true)
  }

  componentWillUnmount() {
    console.log("componentWillUnmount()");
    this.openSeadragonInstance.removeHandler("page");
    this.openSeadragonInstance.removeHandler("pan");
    this.openSeadragonInstance.removeHandler("zoom");
    this.openSeadragonInstance = undefined;
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
      showNavigator: isMobile,
      showReferenceStrip: false,
      toolbar: "toolbarDiv",
      tileSources,
      visibilityRatio: 1,
      ...customControlIds
    });
    this.openSeadragonInstance.addHandler("page", this.handlePageChange);
    this.openSeadragonInstance.addHandler("pan", this.handlePanZoomUpdate);
    this.openSeadragonInstance.addHandler("zoom", this.handlePanZoomUpdate);

    // this.openSeadragonInstance.addHandler("bookmark-url-change", function(
    //   event
    // ) {});
    //this.openSeadragonInstance.bookmarkUrl();
  }

  handlePanZoomUpdate = () => {
    console.log(
      "Handle zoom update called",
      this.state.isParamsLoaded,
      this.state.currentURLParams
    );

    if (this.openSeadragonInstance) {
      const pan = this.openSeadragonInstance.viewport.getCenter();
      const zoom = this.openSeadragonInstance.viewport.getZoom();
      console.log("pan", pan);
      console.log("zoom", zoom);
      updateUrl({ pan, zoom });
    }
  };

  handleFilesetSelectChange = id => {
    this.loadNewFileset(id);
  };

  handleThumbClick = id => {
    this.loadNewFileset(id);
  };

  handlePageChange = ({ page }) => {
    let currentUrlParams = new URLSearchParams(window.location.hash.slice(1));
    currentUrlParams.set("fileset", page);
    const url = window.location.pathname + "#" + currentUrlParams.toString();
    window.history.replaceState({}, "", url);
    this.setState({
      currentTileSource: this.props.tileSources[page],
      currentTileSourceIndex: page
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
    const { tileSources = [] } = this.props;

    return (
      <div>
        <div className="open-seadgragon-top-bar-wrapper">
          <div
            className={`open-seadgragon-top-bar ${
              tileSources.length < 2 ? "centered" : ""
            }`}
          >
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

export default withRouter(OpenSeadragonViewer);
