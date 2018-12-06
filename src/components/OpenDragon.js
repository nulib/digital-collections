import React, { Component } from 'react';
import OpenSeadragon from 'openseadragon';

const styles = {
  viewer: {
    width: '1200px',
    height: '800px',
    background: '#000'
  }
};

class OpenDragon extends Component {
  componentDidMount() {
    OpenSeadragon({
      id: 'openseadragon1',
      prefixUrl: 'images/openseadragon/',
      preserveViewport: true,
      //showNavigationControl: false, // set this to TRUE to roll our own navigation icons
      visibilityRatio: 1,
      minZoomLevel: 1,
      defaultZoomLevel: 1,
      sequenceMode: true,
      showReferenceStrip: true,
      /**
      // TODO: We'll have to look at the item manifest (ie. http://iiif.stack.rdc-staging.library.northwestern.edu/public/b1/2a/4d/b3/-c/fb/1-/43/f1/-a/36/0-/40/6f/bd/05/c2/49-manifest.json), and see if there are multiple entries in 'sequences[0].canvases'.  If so we populate the array like so, below.
      */
      tileSources: [
        'http://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/b1%2F80%2F86%2F07%2F-d%2Fc6%2F6-%2F48%2Fbd%2F-a%2Fc3%2F3-%2F86%2Fca%2F9d%2F5d%2F80%2F60',
        'http://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/5d%2F5f%2F32%2Ff0%2F-3%2Fed%2Fa-%2F46%2F77%2F-9%2F87%2Fd-%2F8e%2F7c%2F88%2Fe5%2F36%2F0b',
        'http://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/65%2F4d%2Fc3%2Fb5%2F-a%2F6b%2F6-%2F46%2F86%2F-b%2F42%2F5-%2Fb0%2F28%2Fd8%2Ff4%2F90%2Fe2'
      ]
    });
  }

  render() {
    return (
      <div className="landing-page">
        <div id="page">
          <main id="main-content" className="content" tabIndex="0">
            <div id="openseadragon1" style={styles.viewer} />
          </main>
        </div>
      </div>
    );
  }
}

export default OpenDragon;
