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
import CarouselSection from '../components/CarouselSection';

export class ItemDetailContainer extends Component {
  state = {
    error: null,
    item: null,
    id: null,
    collection_items: null,
    admin_set_items: null
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
    let crumbs = [{ title: 'Items', link: '/items' }];

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
    console.log('getting admin sets...');
    const id = this.state.item.admin_set.id;
    const request = async () => {
      const response = await elasticsearchApi.getAdminSetItems(id);
      let error = null;

      if (response.error) {
        error = response.error.reason;
      } else if (!response.found) {
        error = 'Collection not found';
      }

      const carouselData = await elasticsearchParser.extractCarouselData(
        response,
        globalVars.IMAGE
      );
      this.setState({
        admin_set_items: carouselData
      });
    };
    request();
  }

  getCollectionItems() {
    if (this.state.item.collection.length > 0) {
      const id = this.state.item.collection[0].id;
      const request = async () => {
        const response = await elasticsearchApi.getCollectionItems(id);
        let error = null;

        if (response.error) {
          error = response.error.reason;
        } else if (!response.found) {
          error = 'Collection not found';
        }

        const carouselData = await elasticsearchParser.extractCarouselData(
          response,
          globalVars.IMAGE
        );
        this.setState({
          collection_items: carouselData
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
    const { id, item, error, collection_items, admin_set_items } = this.state;
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
          <section className="contain-1120 item-section item-categories-wrapper">
            <h3>Library Division and Collections with this Item:</h3>

            <div className="expander expander1" data-collapse="data-collapse">
              {item && collection_items && <h3 className="open">Collection</h3>}
              {item &&
                collection_items && (
                  <CarouselSection
                    sectionTitle={item.collection[0].title[0]}
                    linkTo=""
                    items={collection_items.items}
                    slidesPerView={6}
                    loading=""
                    error=""
                  />
                )}
              {item &&
                admin_set_items && <h3 className="open">Library Division</h3>}
              {item &&
                admin_set_items && (
                  <CarouselSection
                    sectionTitle={item.admin_set.title[0]}
                    linkTo=""
                    items={admin_set_items.items}
                    slidesPerView={6}
                    loading=""
                    error=""
                  />
                )}
            </div>
            <div className="this-item-wrapper">
              <div>
                <span className="fa fa-caret-down" />
              </div>
              <p>This item</p>
              <img src={item && item.thumbnail_url} />
            </div>
          </section>
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
