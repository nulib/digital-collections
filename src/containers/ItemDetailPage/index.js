import React, {Component} from 'react';
import './ItemDetailPage.css';
import ItemDetailApi from '../../api/item-detail-api';
import MetadataItem from './MetadataItem';

class ItemDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      metadata: [],
      id: '',
      sample_image_url: ''
    };

    this.itemDetailApi = new ItemDetailApi();
    this.id = props.match.params.id
  }

  componentDidMount() {
    document.body.className="standard-page narrow-page";

    // Get item details
    this.itemDetailApi.getItemDetails(this.id).then((data) => {
        if (data.response.docs.length > 0) {
          this.setState({
            metadata: data.response.docs[0],
            isLoaded: true
          });
        } else {
          this.setState({
            error: `${this.id} not found`,
            isLoaded: true
          });
        }
    });

    // Get a placeholder image
    this.itemDetailApi.getIIIFImage(this.id).then((data) => {
      this.setState({
        sample_image_url: data,
        isLoaded: true
      });
    });
  }

  render() {
    const { error, isLoaded, metadata, sample_image_url } = this.state;

    if (error) {
      return <div>Error: {error}</div>;
    } else if (!isLoaded) {
      return <div>Loading ....</div>;
    } else {
      return (
        <div id="page" className="item-detail-page">
          <main id="main-content" className="content-full" tabIndex="0">
            <section className="contain-1120">
              <h2>{metadata.title_tesim}</h2>

              <article className="uv-viewer-wrapper">
                <img src={sample_image_url} alt="Universal Viewer sample holder" />
              </article>

              <article className="item-detail-metadata">
                <h4>{metadata.title_tesim}</h4>
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
