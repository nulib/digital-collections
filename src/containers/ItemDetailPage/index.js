import React, { Component } from 'react';
import ErrorSection from '../../components/ErrorSection';
import ItemDetailApi from '../../api/item-detail-api';
import MetadataItem from './MetadataItem';
import './ItemDetailPage.css';

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
    this.sectionType = props.match.params.sectionType;
    this.setId = props.match.params.id;
    this.itemId = props.match.params.itemId;
  }

  componentDidMount() {
    document.body.className = 'standard-page narrow-page';
    // Grab REST API data here
    if (this.sectionType === 'collections') {
      this.itemDetailApi
        .getItemDetails(this.itemId)
        .then(this.updateItemDetailsState.bind(this));
    } else {
      this.itemDetailApi
        .getMockItemDetails()
        .then(this.updateItemDetailsState.bind(this));
    }

    // Get a placeholder image
    this.itemDetailApi.getIIIFImage(this.itemId).then(data => {
      this.setState({
        sample_image_url: data
      });
    });

    this.setState({ isLoaded: true });
  }

  updateItemDetailsState(data) {
    if (data.error) {
      this.setState({ error: data.error });
    } else if (data.response.docs.length === 0) {
      this.setState({ error: `${this.itemId} not found` });
    } else {
      this.setState({
        metadata: data.response.docs[0]
      });
    }
  }

  render() {
    const { error, isLoaded, metadata, sample_image_url } = this.state;

    if (error) {
      return <ErrorSection error={error} />;
    } else if (!isLoaded) {
      return <div>Loading ....</div>;
    } else {
      return (
        <div id="page" className="item-detail-page">
          <main id="main-content" className="content-full" tabIndex="0">
            <section className="contain-1120">
              <h2>{metadata.title_tesim}</h2>

              <article className="uv-viewer-wrapper">
                <img
                  src={sample_image_url}
                  alt="Universal Viewer sample holder"
                />
              </article>

              <article className="item-detail-metadata">
                <h4>{metadata.title_tesim}</h4>
                <MetadataItem label="Creator" value={metadata.creator_tesim} />
                <MetadataItem label="Title" value={metadata.title_tesim} />
                <MetadataItem label="Keywords" value={metadata.keyword_tesim} />
                <MetadataItem
                  label="Date Created"
                  value={metadata.date_created_tesim}
                />
                <MetadataItem
                  label="Publisher"
                  value={metadata.publisher_tesim}
                />
                <MetadataItem
                  label="Geographic Location"
                  value={metadata.based_near_label_tesim}
                />
                <MetadataItem
                  label="Description"
                  value={metadata.description_tesim}
                />
                <MetadataItem label="License" value={metadata.license_tesim} />
                <MetadataItem
                  label="Rights Statement"
                  value={metadata.rights_statement_tesim}
                />
                <MetadataItem
                  label="Member of Collection(s)"
                  value={metadata.member_of_collections_ssim}
                />
              </article>

              <article className="item-detail-metadata">
                <hr />
                <p>This shows everything returned directly from solr:</p>
                {Object.keys(metadata).map((keyName, index) => (
                  <MetadataItem
                    label={keyName}
                    value={metadata[keyName]}
                    key={index}
                  />
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
