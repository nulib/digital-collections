import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as elasticsearchApi from '../../api/elasticsearch-api.js';
import * as elasticsearchParser from '../../services/elasticsearch-parser';
import OpenSeadragonContainer from './OpenSeadragonContainer';
import { Helmet } from 'react-helmet';
import { generateTitleTag } from '../../services/helpers';
import { loadDataLayer } from '../../services/google-tag-manager';
import { loadItemStructuredData } from '../../services/google-structured-data';
import Work from '../../components/Work/Work';
import PropTypes from 'prop-types';

export class ScreensWork extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      id: null,
      item: null,
      loading: true,
      structuredData: null
    };
  }

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  };

  async componentDidMount() {
    this.getApiData(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.location) {
      return;
    }
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.getApiData(this.props.match.params.id);
    }
  }

  async getApiData(id) {
    let item = await this.getItem(id);

    if (!item) {
      return;
    }

    this.populateGTMDataLayer(item);

    this.setState({
      id,
      item,
      loading: false,
      structuredData: loadItemStructuredData(item, this.props.location.pathname)
    });
  }

  async getItem(id) {
    let itemResponse = await elasticsearchApi.getItem(id);
    const { error } = itemResponse;

    // Handle possible errors
    if (error || !itemResponse.found) {
      return;
    }

    return itemResponse._source;
  }

  populateGTMDataLayer(item) {
    const rightsStatement = item.rights_statement
      ? item.rights_statement.label
      : '';
    const creators = item.creator.map(creator => creator.label);
    const contributors = item.contributor.map(contributor => contributor.label);

    const dataLayer = {
      adminset: item.admin_set.title.map(title => title).join(', '),
      collections: item.collection.map(collection =>
        collection.title.map(title => title).join(', ')
      ),
      creatorsContributors: [...creators, ...contributors],
      pageTitle: elasticsearchParser.getESTitle(item),
      rightsStatement,
      subjects: item.subject.map(subject => subject.label),
      visibility: item.visibility
    };

    loadDataLayer(dataLayer);
  }

  render() {
    const { id, item, error, structuredData } = this.state;

    // This check ensures that when changing ids (items) on the same route, the "id" is different
    // at this point of execution
    const idInSync = this.props.match.params.id === id;

    const itemTitle = item ? elasticsearchParser.getESTitle(item) : '';

    return (
      <div className="landing-page">
        <Helmet>
          <title>{generateTitleTag(itemTitle)}</title>
          {structuredData && (
            <script type="application/ld+json">
              {JSON.stringify(structuredData)}
            </script>
          )}
        </Helmet>
        {item && idInSync && !error && <OpenSeadragonContainer item={item} />}
        <div id="page">
          <main id="main-content" className="content" tabIndex="0">
            <Work />
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const withRouterScreensWork = withRouter(ScreensWork);
export default connect(mapStateToProps)(withRouterScreensWork);
