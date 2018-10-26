import React, { Component } from 'react';
import { withRouter } from 'react-router';
import * as elasticsearchApi from '../api/elasticsearch-api.js';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import ErrorSection from '../components/ErrorSection';
import ItemDetail from '../components/ItemDetail/ItemDetail';
import UniversalViewerContainer from './UniversalViewerContainer';
import * as elasticsearchParser from '../services/elasticsearch-parser';
import * as globalVars from '../../src/services/global-vars';
import LoadingSpinner from '../components/LoadingSpinner';
import { shuffleArray } from '../services/helpers';
import ParentCollections from '../components/ItemDetail/ParentCollections';
import LargeFeature from '../components/ItemDetail/LargeFeature';

export class ItemDetailContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminSetItems: [],
      collectionItems: [],
      error: null,
      id: null,
      item: null,
      loading: true
    };

    this.styles = {
      page: {
        marginTop: '2rem',
        marginBottom: '2rem'
      }
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    if (!match.params.id) {
      return this.setState({
        error: 'Missing id in query param',
        loading: false
      });
    }
    this.getApiData(match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.location) {
      return;
    }
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.getApiData(this.props.match.params.id);
    }
  }

  createBreadcrumbData(item) {
    let crumbs = [{ title: 'Items', link: '/reactivesearch' }];

    if (item) {
      crumbs.push({
        title: elasticsearchParser.getESTitle(item),
        link: ''
      });
    }
    return crumbs;
  }

  async getAdminSets(adminSetId) {
    let adminSetResponse = await elasticsearchApi.getAdminSetItems(
      adminSetId,
      4
    );
    return elasticsearchParser.prepPhotoGridItems(
      adminSetResponse,
      globalVars.IMAGE_MODEL,
      globalVars.IIIF_FEATURE_BOX_REGION
    );
  }

  async getApiData(id) {
    let item = await this.getItem(id);

    if (!item) {
      return;
    }

    let adminSetItems = await this.getAdminSets(item.admin_set.id);
    let collectionItems = await this.getCollections(item);

    this.setState({
      adminSetItems: shuffleArray(adminSetItems),
      collectionItems,
      id,
      item,
      loading: false
    });
  }

  async getCollections(item) {
    const { collection } = item;
    if (collection.length === 0) {
      return [];
    }

    let response = await elasticsearchApi.getCollectionItems(
      collection[0].id,
      4
    );
    let items = elasticsearchParser.prepPhotoGridItems(
      response,
      globalVars.IMAGE_MODEL,
      globalVars.IIIF_FEATURE_BOX_REGION
    );

    return items;
  }

  async getItem(id) {
    let itemError = '';
    let itemResponse = await elasticsearchApi.getItem(id);

    // Handle possible errors
    if (itemResponse.error) {
      itemError = itemResponse.error.reason;
    } else if (!itemResponse.found) {
      itemError = 'Item not found';
    }
    if (itemError) {
      this.setState(
        {
          id: id,
          item: null,
          error: itemError,
          loading: false
        },
        // Return a null value for item, indicating something went south
        () => null
      );
    }

    return itemResponse._source;
  }

  render() {
    const {
      id,
      item,
      error,
      collectionItems,
      adminSetItems,
      loading
    } = this.state;
    const breadCrumbData = item ? this.createBreadcrumbData(item) : [];

    // This check ensures that when changing ids (items) on the same route, Universal Viewer embed
    // workaround behaves consistently and displays the correct item
    const idInSync = this.props.match.params.id === id;

    const renderDisplay = () => {
      if (error) {
        return <ErrorSection message={error} />;
      }
      return (
        <div>
          <Breadcrumbs items={breadCrumbData} />
          <LoadingSpinner loading={loading} />

          {!loading && (
            <div>
              <LargeFeature item={item} />
              {idInSync && <UniversalViewerContainer id={id} item={item} />}
              <ParentCollections
                item={item}
                adminSetItems={adminSetItems}
                collectionItems={collectionItems}
              />
              <ItemDetail item={item} />
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="landing-page">
        <div id="page" style={this.styles.page}>
          <main id="main-content" className="content" tabIndex="0">
            {renderDisplay()}
          </main>
        </div>
      </div>
    );
  }
}

const withRouterItemDetailContainer = withRouter(ItemDetailContainer);
export default withRouterItemDetailContainer;
