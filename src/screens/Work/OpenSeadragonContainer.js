import React, { Component } from "react";
import { OpenSeadragonViewer } from "openseadragon-react-viewer";
import PropTypes from "prop-types";
import { getManifest } from "../../api";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { getESTitle } from "../../services/elasticsearch-parser";

const styles = {
  spinner: {
    padding: "50px 0"
  },
  wrapper: {
    background: "#342f2e",
    position: "relative",
    textAlign: "center"
  }
};

class OpenSeadragonContainer extends Component {
  constructor(props) {
    super(props);
    this.itemTitle = getESTitle(props.item);
  }

  static propTypes = {
    item: PropTypes.object
  };

  state = {
    loading: true,
    manifestUrl: ""
  };

  componentDidMount() {
    this.getManifest(this.props.item.iiif_manifest);
  }

  async getManifest(url) {
    const environtmentUrl = this.getEnvironmentManifestUrl(url);
    let response = await getManifest(environtmentUrl);

    if (response.error) {
      // TODO: Some kind of error handling to the UI here
      return;
    }
    // Get the sources for OpenSeadragon viewer from the manifest
    this.setState({ loading: false, manifestUrl: environtmentUrl });
  }

  /**
   * Helper function to update the manifest url with local dev port number ":3000".
   * This handles 2 conditions
   * 1.) Running the local dev environment and;
   * 2.) Local production build, served via the "devbox.library.northwestern.edu" url
   *
   * This also assumes that local DONUT instance is running on port 3000.
   */
  getEnvironmentManifestUrl(url) {
    if (process.env.REACT_APP_DONUT_URL.includes("staging")) {
      const url = process.env.REACT_APP_DONUT_URL;
      const pairtree = this.props.item.id.match(/../g).join("/");
      return `${url}public/${pairtree}-manifest.json`;
    }

    if (process.env.REACT_APP_LIVE_IIIF === "true") {
      return url;
    }

    if (
      process.env.NODE_ENV === "development" ||
      url.indexOf("http://devbox.library.northwestern.edu") > -1
    ) {
      const publicIndex = url.indexOf("/public");
      return (
        url.slice(0, publicIndex) + ":3000" + url.slice(publicIndex, url.length)
      );
    }
    return url;
  }

  render() {
    const { loading, manifestUrl } = this.state;

    const options = {
      showDropdown: true,
      showThumbnails: true,
      showToolbar: true,
      deepLinking: true
    };

    return (
      <div>
        <LoadingSpinner loading={loading} />
        {manifestUrl && (
          <section style={styles.wrapper} data-testid="section-open-seadragon">
            <OpenSeadragonViewer manifestUrl={manifestUrl} options={options} />
          </section>
        )}
      </div>
    );
  }
}

export default OpenSeadragonContainer;
