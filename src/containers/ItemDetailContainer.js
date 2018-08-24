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
    collectionItems: {},
    adminSetItems: {}
  };

  componentDidMount() {
    document.body.className = 'standard-page';
    const { match } = this.props;

    if (!match.params.id) {
      return this.setState({
        error: 'Missing id in query param'
      });
    }
    this.getItem(match.params.id);
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

  getCategoryItems() {
    this.getCollectionItems();
    this.getAdminSetItems();
  }

  getAdminSetItems() {
    const id = this.state.item.admin_set.id;
    const request = async () => {
      const response = await elasticsearchApi.getAdminSetItems(id);
      const carouselData = await elasticsearchParser.extractCarouselData(
        response,
        globalVars.IMAGE_MODEL
      );
      this.setState({
        adminSetItems: carouselData
      });
    };
    request();
  }

  getCollectionItems() {
    if (this.state.item.collection.length > 0) {
      const id = this.state.item.collection[0].id;
      const request = async () => {
        const response = await elasticsearchApi.getCollectionItems(id);
        const carouselData = await elasticsearchParser.extractCarouselData(
          response,
          globalVars.IMAGE_MODEL
        );
        this.setState({
          collectionItems: carouselData
        });
      };
      request();
    }
  }

  getItem(id) {
    const request = async () => {
      const response = await elasticsearchApi.getItem(id);
      let error = null;

      if (response.error) {
        error = response.error.reason;
      } else if (!response.found) {
        error = 'Item not found';
      }
      this.setState(
        {
          id: id,
          item: response._source,
          error: error
        },
        () => this.getCategoryItems()
      );
    };
    request();
  }

  render() {
    const { id, item, error, collectionItems, adminSetItems } = this.state;
    const breadCrumbData = item ? this.createBreadcrumbData(item) : [];

    const renderDisplay = () => {
      if (error) {
        return <ErrorSection message={error} />;
      }
      return (
        <div>
          <Breadcrumbs items={breadCrumbData} />
          <UniversalViewerContainer id={id} item={item} />
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
