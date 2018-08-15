import React, { Component } from 'react';
import { withRouter } from 'react-router';
import * as elasticsearchApi from '../api/elasticsearch-api.js';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import UniversalViewerContainer from './UniversalViewerContainer';
import ItemDetail from '../components/ItemDetail/ItemDetail';
import DetailSummary from '../components/ItemDetail/DetailSummary/index.js';

export class ItemDetailContainer extends Component {
  state = {
    error: null,
    item: null,
    id: null
  };

  componentDidMount() {
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

  getItem(id) {
    const request = async () => {
      const response = await elasticsearchApi.getItem(id);
      let error = null;

      if (response.error) {
        error = response.statusText;
      } else if (!response.found) {
        error = 'Item not found';
      }
      this.setState({ id: id, item: response._source, error });
    };
    request();
  }

  render() {
    const { id, item, error } = this.state;
    const breadCrumbData = item ? this.createBreadcrumbData(item) : [];

    return (
      <div className="standard-page">
        <div id="page" className="full-width">
          <main id="main-content" className="content" tabIndex="0">
            {error}
            <Breadcrumbs items={breadCrumbData} />
            <UniversalViewerContainer id={id} item={item} />
            <DetailSummary item={item} />
            <ItemDetail item={item} />
          </main>
        </div>
      </div>
    );
  }
}

const withRouterItemDetailContainer = withRouter(ItemDetailContainer);
export default withRouterItemDetailContainer;
