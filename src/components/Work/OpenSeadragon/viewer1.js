import React, { useState, useEffect } from "react";
import OpenSeadragon, { Viewer } from "openseadragon";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";
import WorkOpenSeadragonThumbnails from "./Thumbnails";
import WorkOpenSeadragonToolBar from "./Toolbar";
import WorkOpenSeadragonFilesetReactSelect from "./FilesetReactSelect";
import Canvas2Image from "@reglendo/canvas2image";
// import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { parseHash, updateUrl } from "../../../services/osd-hash-params";

const OpenSeadragonViewer = ({
  tileSources = [],
  rightsStatement = {},
  itemTitle = ""
}) => {
  const [currentTileSource, setCurrentTileSource] = useState(tileSources[0]);
  const [currentFileSet, setCurrentFileSet] = useState(0);
  const [openSeadragonInstance, setOpenSeadragonInstance] = useState();
  const [locationKeys, setLocationKeys] = useState([]);
  const [initHash, setInitHash] = useState({});

  useEffect(() => {
    const urlParams = parseHash();
    console.log("urlParams", urlParams);
    const fileSet = urlParams["fileset"];
    console.log("fileset", fileSet);
    const pan = { x: urlParams["x"], y: urlParams["y"] };
    // setInitHash({ pan, tileSourceIndex: fileSet, zoom: urlParams["zoom"] });

    // const params = new URLSearchParams(window.location.hash);
    // const fileSet = params.get("fileset");

    if (fileSet) {
      setCurrentTileSource(tileSources[fileSet]);
      setCurrentFileSet(fileSet);
    }
    updateUrl({ pan, tileSourceIndex: fileSet, zoom: urlParams["zoom"] });
  }, [tileSources]);

  useEffect(() => {
    loadOpenSeadragon();
  }, []);

  useEffect(() => {
    if (openSeadragonInstance) {
      openSeadragonInstance.addHandler("page", handlePageChange);
      openSeadragonInstance.addHandler("pan", handlePanZoomUpdate);
      openSeadragonInstance.addHandler("zoom", handlePanZoomUpdate);
      // openSeadragonInstance.bookmarkUrl();
      if (currentFileSet > 0) {
        openSeadragonInstance.goToPage(currentFileSet);
      }
    }
    return () => {
      if (openSeadragonInstance) {
        openSeadragonInstance.removeHandler("page");
        openSeadragonInstance.removeHandler("pan");
        openSeadragonInstance.removeHandler("zoom");
      }
    };
  }, [openSeadragonInstance]);

  const handlePanZoomUpdate = () => {
    console.log("handlePanZoomUpdate()");
    console.log("window.location", window.location);
    // console.log("this.props.history", this.props.history);

    if (openSeadragonInstance) {
      const pan = openSeadragonInstance.viewport.getCenter();
      const zoom = openSeadragonInstance.viewport.getZoom();
      console.log("pan", pan);
      console.log("zoom", zoom);
      updateUrl({ pan, zoom });
    }
  };

  const calculateDownloadDimensions = () => {
    const noCopyrightRightsStatements = [
      "No Copyright - United States",
      "No Copyright - Non Commercial Use Only"
    ];
    let returnObj = {};

    try {
      let height,
        width,
        defaultWidth =
          noCopyrightRightsStatements.indexOf(rightsStatement.label) > -1
            ? 3000
            : 1500,
        canvasHeight = openSeadragonInstance.drawer.canvas.height,
        canvasWidth = openSeadragonInstance.drawer.canvas.width,
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
  };

  function loadOpenSeadragon() {
    const customControlIds = {
      zoomInButton: "zoom-in",
      zoomOutButton: "zoom-out",
      homeButton: "home",
      fullPageButton: "full-page",
      nextButton: "next",
      previousButton: "previous"
    };
    setOpenSeadragonInstance(
      OpenSeadragon({
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
        tileSources: tileSources.map(t => t.id),
        visibilityRatio: 1,
        ...customControlIds
      })
    );
  }

  const handleFilesetSelectChange = id => {
    loadNewFileset(id);
  };

  const handleThumbClick = id => {
    loadNewFileset(id);
  };

  const handlePageChange = ({ page }) => {
    let currentUrlParams = new URLSearchParams(window.location.hash.slice(1));
    currentUrlParams.set("fileset", page);
    const url = window.location.pathname + "#" + currentUrlParams.toString();
    window.history.replaceState({}, "", url);
    // setState({
    //   currentTileSource: tileSources[page],
    //   currentFileSet: page
    // });
  };

  const handleDownloadCropClick = () => {
    const { width, height } = calculateDownloadDimensions();
    if (width && height) {
      Canvas2Image.saveAsJPEG(
        openSeadragonInstance.drawer.canvas,
        itemTitle.split(" ").join("-"),
        width,
        height
      );
    }
  };

  const handleDownloadFullSize = () => {
    const { width } = calculateDownloadDimensions();
    const path = `${currentTileSource.id}/full/${width},/0/default.jpg`;
    window.open(path, "_blank");
  };

  function loadNewFileset(id) {
    const index = tileSources.findIndex(element => element.id === id);
    setCurrentTileSource(tileSources[index]);
    openSeadragonInstance.goToPage(index);
  }

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
            onFileSetChange={handleFilesetSelectChange}
            tileSources={tileSources}
          />

          <div id="toolbarDiv" className="toolbar">
            <WorkOpenSeadragonToolBar
              isMobile={isMobile}
              onDownloadCropClick={handleDownloadCropClick}
              onDownloadFullSize={handleDownloadFullSize}
            />
          </div>
        </div>
      </div>

      <div id="openseadragon1" className="open-seadragon-container"></div>

      {tileSources.length > 1 && (
        <WorkOpenSeadragonThumbnails
          currentTileSource={currentTileSource}
          onThumbClick={handleThumbClick}
          tileSources={tileSources}
        />
      )}
    </div>
  );
};

Viewer.propTypes = {
  itemTitle: PropTypes.string,
  fileUrl: PropTypes.string,
  rightsStatement: PropTypes.object,
  tileSources: PropTypes.array
};

export default withRouter(OpenSeadragonViewer);
