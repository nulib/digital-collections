import React, { useState, useEffect } from "react";
import OpenSeadragon, { Viewer } from "openseadragon";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";
import WorkOpenSeadragonThumbnails from "./Thumbnails";
import WorkOpenSeadragonToolBar from "./Toolbar";
import WorkOpenSeadragonFilesetReactSelect from "./FilesetReactSelect";
import Canvas2Image from "@reglendo/canvas2image";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

const OpenSeadragonViewer = ({
  tileSources = [],
  rightsStatement = {},
  itemTitle = ""
}) => {
  const [currentTileSource, setCurrentTileSource] = useState(tileSources[0]);
  const [currentFileSet, setCurrentFileSet] = useState(0);
  const [openSeadragonInstance, setOpenSeadragonInstance] = useState();
  const [locationKeys, setLocationKeys] = useState([]);
  const history = useHistory();
  console.log("history", history);
  useEffect(() => {
    // history.location.hash = "";
    console.log(history.location.hash, "--Location hash here");
    history.location.hash = "";
    history.listen(location => {
      if (history.action === "PUSH") {
        console.log("push called");
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);
          // history.location.hash = "";
          history.replace(history.location.pathname, {});
          // history.replaceState({}, "", history.location.pathname);
          console.log("Forward called with ", history);
          console.log("Hash: ", window.location.hash);
          window.history.replaceState({}, "", window.location.pathname);
          // Handle forward event
        } else {
          setLocationKeys(keys => [location.key, ...keys]);
          console.log("Back called with ", locationKeys);
          console.log("Hash: ", window.location.hash);

          history.replace(history.location.pathname, {});
          // Handle back event
        }
      }
    });
  }, [locationKeys]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash);
    const fileSet = params.get("fileset");

    if (fileSet) {
      setCurrentTileSource(tileSources[fileSet]);
      setCurrentFileSet(fileSet);
    }
  }, [tileSources]);

  useEffect(() => {
    loadOpenSeadragon();
  }, []);

  useEffect(() => {
    if (openSeadragonInstance) {
      openSeadragonInstance.addHandler("page", handlePageChange);
      openSeadragonInstance.addHandler("bookmark-url-change", function(event) {
        console.log("url changed??", history.location);
        // history.push(history.location.pathname, {});
      });
      openSeadragonInstance.bookmarkUrl();
      if (currentFileSet > 0) {
        openSeadragonInstance.goToPage(currentFileSet);
      }
    }
    return () => {
      console.log("RETURN CALLED FROM UNMOUNT", openSeadragonInstance);
      if (openSeadragonInstance) {
        openSeadragonInstance.removeHandler("bookmark-url-change", function(e) {
          console.log("Removed bookmark handler");
        });
        setOpenSeadragonInstance();
        window.location.hash = "#";
        window.history.replaceState({}, "", window.location.pathname);
        // history.replace(history.location.pathname + "#", {});
      }
    };
  }, [openSeadragonInstance]);

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
