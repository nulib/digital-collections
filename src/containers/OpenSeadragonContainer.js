import React, { Component } from 'react';
import OpenSeadragonViewer from '../components/OpenSeadragonViewer';
import PropTypes from 'prop-types';
import { getTileSources } from '../services/iiif-parser';
import { getManifest } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import { getESTitle } from '../services/elasticsearch-parser';

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
    let response = await getManifest(url);

    if (response.error) {
      // TODO: Some kind of error handling to the UI here
      return;
    }
    // Get the sources for OpenSeadragon viewer from the manifest
    let tileSources = getTileSources(response);
    this.setState({ loading: false, tileSources });
  }

  render() {
    const { loading, tileSources } = this.state;

    return (
      <div>
        <LoadingSpinner loading={loading} />
        {tileSources.length > 0 && (
          <section style={styles.wrapper}>
            <OpenSeadragonViewer
              tileSources={tileSources}
              itemTitle={this.itemTitle}
            />
          </section>
        )}
      </div>
    );
  }
}

export default OpenSeadragonContainer;
