import React, { Component } from "react";
import OpenSeadragon from "openseadragon";
import PropTypes from "prop-types";
import { MOBILE_BREAKPOINT } from "../../../services/global-vars";
import withSizes from "react-sizes";
import WorkOpenSeadragonThumbnails from "./Thumbnails";
import WorkOpenSeadragonToolBar from "./Toolbar";
import WorkOpenSeadragonFilesetSelect from "./FilesetSelect";

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
    this.openSeadragonInstance.removeHandler("page");
  }

  buildDownloadLink = () => {
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

    // Event listener for when OpenSeadragon's file are 'ready'
    this.openSeadragonInstance.addHandler("open", this.buildDownloadLink);

    this.openSeadragonInstance.addHandler("page", this.handleToolbarPageClick);
  }

  handleFilesetSelectChange = e => {
    this.loadNewFileset(e.target.value);
  };

  handleThumbClick = id => {
    this.loadNewFileset(id);
  };

  handleToolbarPageClick = ({ page }) => {
    this.setState({ currentTileSource: this.props.tileSources[page] });
  };

  loadNewFileset(id) {
    const { tileSources } = this.props;
    const index = tileSources.findIndex(element => element.id === id);

    this.setState({ currentTileSource: tileSources[index] });
    this.openSeadragonInstance.goToPage(index);
  }

  render() {
    const { currentTileSource } = this.state;
    const { isMobile, itemTitle, tileSources } = this.props;

    return (
      <div>
        <div className="open-seadgragon-top-bar-wrapper">
          <div className="open-seadgragon-top-bar">
            <WorkOpenSeadragonFilesetSelect
              currentTileSource={currentTileSource}
              onFileSetChange={this.handleFilesetSelectChange}
              tileSources={tileSources}
            />

            <div id="toolbarDiv" className="toolbar">
              <WorkOpenSeadragonToolBar
                canDownloadFullSize={this.canDownloadFullSize()}
                downloadLink={this.buildDownloadLink()}
                isMobile={isMobile}
                itemTitle={itemTitle}
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
