import React, { Component } from 'react';
import OpenSeadragonViewer from '../../components/OpenSeadragonViewer';
import PropTypes from 'prop-types';
import { getTileSources } from '../../services/iiif-parser';
import { getManifest } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getESTitle } from '../../services/elasticsearch-parser';

const styles = {
  spinner: {
    padding: '50px 0'
  },
  wrapper: {
    background: '#342f2e',
    position: 'relative',
    textAlign: 'center'
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
    tileSources: []
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
    let tileSources = getTileSources(response);
    this.setState({ loading: false, tileSources });
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
    if (process.env.REACT_APP_LIVE_IIIF === 'true') {
      return url;
    }

    if (
      process.env.NODE_ENV === 'development' ||
      url.indexOf('http://devbox.library.northwestern.edu') > -1
    ) {
      const publicIndex = url.indexOf('/public');
      return (
        url.slice(0, publicIndex) + ':3000' + url.slice(publicIndex, url.length)
      );
    }
    return url;
  }

  render() {
    const { loading, tileSources } = this.state;
    const { item } = this.props;
    const rightsStatement = item ? item.rights_statement : null;

    return (
      <div>
        <LoadingSpinner loading={loading} />
        {tileSources.length > 0 && (
          <section style={styles.wrapper}>
            <OpenSeadragonViewer
              tileSources={tileSources}
              itemTitle={this.itemTitle}
              rightsStatement={rightsStatement}
            />
          </section>
        )}
      </div>
    );
  }
}

export default OpenSeadragonContainer;
