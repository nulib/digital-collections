import React, {Component} from 'react';
import uvSampleImg from '../../images/sample-uv.png';
import './ItemDetailPage.css';
import ItemDetailApi from '../../api/item-detail-api';
import MetadataItem from './MetadataItem';

class ItemDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      metadata: []
    };

    this.itemDetailApi = new ItemDetailApi();
  }

  componentDidMount() {
    document.body.className="standard-page narrow-page";

    // Get metadata
    this.itemDetailApi.getMetadata().then((data) => {
      this.setState({
        metadata: data,
        isLoaded: true
      });
    });
  }

  render() {
    const { error, isLoaded, metadata } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading ....</div>;
    } else {
      return (
        <div id="page" className="item-detail-page">
          <main id="main-content" className="content-full" tabIndex="0">
            <section className="contain-1120">
              <h2>{metadata.title_tesim}</h2>

              <article className="uv-viewer-wrapper">
                <img src={uvSampleImg} alt="Universal Viewer sample holder" />
              </article>

              <article className="item-detail-metadata">
                <h4>Little Richard Title Piece Goes Here</h4>
                <MetadataItem label="Creator" value={metadata.creator_tesim} />
                <MetadataItem label="Title" value={metadata.title_tesim} />
                <MetadataItem label="Keywords" value={metadata.keyword_tesim} />
                <MetadataItem label="Date Created" value={metadata.date_created_tesim} />
                <MetadataItem label="Publisher" value={metadata.publisher_tesim} />
                <MetadataItem label="Geographic Location" value={metadata.based_near_label_tesim} />
                <MetadataItem label="Description" value={metadata.description_tesim} />
                <MetadataItem label="License" value={metadata.license_tesim} />
                <MetadataItem label="Rights Statement" value={metadata.rights_statement_tesim} />
                <MetadataItem label="Member of Collection(s)" value={metadata.member_of_collections_ssim} />
              </article>

              <article className="item-detail-metadata">
                <hr />
                <p>This shows everything returned directly from solr:</p>
                {Object.keys(metadata).map((keyName, index) => (
                  <MetadataItem label={keyName} value={metadata[keyName]} key={index} />
                ))}
              </article>
            </section>
          </main>
        </div>
      );
    }
  }
}

export default ItemDetailPage;
