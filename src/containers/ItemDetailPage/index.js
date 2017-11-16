import React, {Component} from 'react';
import uvSampleImg from '../../images/sample-uv.png';
import './ItemDetailPage.css';
import * as itemDetailApi from '../../api/item-detail-api';
import MetadataItem from './MetadataItem';

class ItemDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      metadata: []
    };
  }
  componentDidMount() {
    document.body.className="standard-page narrow-page";

    // Get metadata
    const metadata = itemDetailApi.getMetadata();
    this.setState({
      metadata: metadata,
      isLoaded: true
    });
  }

  render() {
    const metadataList = this.state.metadata.map((listItem, i) =>
      <MetadataItem key={i} listItem={listItem} />);

    return (
      <div id="page" className="item-detail-page">
        <main id="main-content" className="content-full" tabIndex="0">
          <section className="contain-1120">
            <h2>Little Richard: Poster for rest of text goes here...</h2>

            <article className="uv-viewer-wrapper">
              <img src={uvSampleImg} />
            </article>

            <article className="item-detail-metadata">
              <h4>Little Richard Title Piece Goes Here</h4>
              <ul className="metadata-list">
                {metadataList}
              </ul>
            </article>
          </section>
        </main>
    </div>
    );
  }
}

export default ItemDetailPage;
