import React, { Component } from 'react';
import { DONUT_URL } from '../services/global-vars';
import { withRouter } from 'react-router';

/* eslint-disable */
class UniversalViewerContainer extends Component {
  componentDidMount() {
    this.loadUVEmbedScript();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.removeUVEmbedScript();
      this.loadUVEmbedScript();
    }
  }

  componentWillUnmount() {
    // Leaving to a new route, avoid unnecessarily removing UV
    if (this.props.history.location.pathname !== this.props.match.url) {
      this.removeUVEmbedScript();
    }
  }

  /**
   * Manually add the universal viewer embed script to the DOM
   * Note: Not a great solution, but the only way (as of now), we've found to render different
   * embed viewers in a single page application.
   */
  loadUVEmbedScript() {
    const script = document.createElement('script');

    script.id = 'uv-embed-script';
    script.src = `${location.origin}/uv-2.0.2/lib/embed.js`;
    script.async = true;
    document.body.appendChild(script);
  }

  /**
   * Manually removed the universal viewer embed script from the DOM, and put a
   * hack on the 'window' object to trick UV into re-rendering.
   */
  removeUVEmbedScript() {
    const el = document.getElementById('uv-embed-script');
    el.parentNode.removeChild(el);

    // This is a hack to get UV to re-render
    window.embedScriptIncluded = false;
  }

  render() {
    const { id, item } = this.props;

    // No item, no render
    if (!item) {
      return null;
    }

    return (
      <section className="item-viewer-wrapper">
        <div className="contain-1440">
          <div
            className="uv"
            data-locale="en-GB:English (GB),cy-GB:Cymraeg"
            data-config=""
            data-uri={`${DONUT_URL}concern/images/${id}/manifest`}
            /* These are example config options below, but for now seem better without them */
            // data-collectionindex="0"
            // data-manifestindex="0"
            // data-sequenceindex="0"
            // data-canvasindex="0"
            // data-xywh="-1742,-20,4698,2007"
            // data-rotation="0"
            style={styles.uvWrapper}
          />
        </div>
      </section>
    );
  }
}

const styles = {
  uvWrapper: {
    width: '100%',
    height: '700px',
    backgroundColor: '#000'
  }
};

export default withRouter(UniversalViewerContainer);
/* eslint-enable */
