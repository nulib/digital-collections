import React, { Component } from 'react';
import { withRouter } from 'react-router';
import * as elasticsearchApi from '../api/elasticsearch-api.js';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import DetailSummary from '../components/ItemDetail/DetailSummary/index.js';
import ErrorSection from '../components/ErrorSection';
import ItemDetail from '../components/ItemDetail/ItemDetail';
import UniversalViewerContainer from './UniversalViewerContainer';
import * as elasticsearchParser from '../services/elasticsearch-parser';
import * as globalVars from '../../src/services/global-vars';
import ItemDetailCarousels from '../components/ItemDetail/ItemDetailCarousels';

export class ItemDetailContainer extends Component {
  state = {
    error: null,
    item: null,
    id: null,
    collectionItems: [],
    adminSetItems: []
  };

  componentDidMount() {
    const { match } = this.props;

    if (!match.params.id) {
      return this.setState({
        error: 'Missing id in query param'
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
    let crumbs = [{ title: 'Items', link: '/search-results' }];

    if (item) {
      crumbs.push({
        title: item.title.primary[0],
        link: ''
      });
    }
    return crumbs;
  }

  async getApiData(id) {
    let itemError = null;
    let adminSets = {
      id: null,
      items: []
    };
    let collection = {
      id: null,
      items: []
    };

    // First, get the item
    const itemResponse = await elasticsearchApi.getItem(id);
    const item = itemResponse._source;
    adminSets.id = item.admin_set.id;
    collection.id = item.collection.length > 0 ? item.collection[0].id : null;

    // Handle possible errors
    if (itemResponse.error) {
      itemError = itemResponse.error.reason;
    } else if (!itemResponse.found) {
      itemError = 'Item not found';
    }
    if (itemError) {
      return this.setState({
        id: id,
        item,
        error: itemError
      });
    }

    // Get admin set items for carousel
    if (adminSets.id) {
      const adminSetResponse = await elasticsearchApi.getAdminSetItems(
        adminSets.id
      );
      let adminSetData = elasticsearchParser.extractCarouselData(
        adminSetResponse,
        globalVars.IMAGE_MODEL
      );
      adminSets.items = adminSetData.items;
    }

    // Get collection items for carousel
    if (item.collection.length > 0) {
      const collectionResponse = await elasticsearchApi.getCollectionItems(
        collection.id
      );
      let collectionData = elasticsearchParser.extractCarouselData(
        collectionResponse,
        globalVars.IMAGE_MODEL
      );
      collection.items = collectionData.items;
    }

    this.setState({
      id,
      item,
      adminSetItems: adminSets.items,
      collectionItems: collection.items
    });
  }

  render() {
    const { id, item, error, collectionItems, adminSetItems } = this.state;
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
          {idInSync && <UniversalViewerContainer id={id} item={item} />}
          <DetailSummary item={item} />
          {item && (
            <ItemDetailCarousels
              adminSetItems={adminSetItems}
              collectionItems={collectionItems}
              error={error}
              item={item}
            />
          )}
          <ItemDetail item={item} />
        </div>
      );
    };

    return (
      <div className="standard-page">
        <div id="page" className="full-width">
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
