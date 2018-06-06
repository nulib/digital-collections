import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Api from '../api';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import UniversalViewerContainer from './UniversalViewerContainer';

const api = new Api();

class ItemDetailContainer extends Component {
  state = {
    error: null,
    item: null
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
    let crumbs = [{ title: 'Items', link: 'items' }];

    if (item) {
      crumbs.push({
        title: item.title_tesim.join(),
        link: ''
      });
    }
    return crumbs;
  }

  getItem(id) {
    const request = async () => {
      const response = await api.getItem(id);
      this.setState({ item: response.response.docs[0] });
    };
    request();
  }

  render() {
    const { item } = this.state;
    const breadCrumbData = item ? this.createBreadcrumbData(item) : [];

    return (
      <div>
        <Breadcrumbs items={breadCrumbData} />
        <UniversalViewerContainer item={item} />
      </div>
    );
  }
}

const withRouterItemDetailContainer = withRouter(ItemDetailContainer);
export default withRouterItemDetailContainer;
