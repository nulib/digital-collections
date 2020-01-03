import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as elasticsearchApi from "../../api/elasticsearch-api.js";
import * as elasticsearchParser from "../../services/elasticsearch-parser";
import OpenSeadragonContainer from "./OpenSeadragonContainer";
import { Helmet } from "react-helmet";
import { generateTitleTag } from "../../services/helpers";
import { loadDataLayer } from "../../services/google-tag-manager";
import { loadItemStructuredData } from "../../services/google-structured-data";
import Work from "../../components/Work/Work";
import ErrorBoundary from "../../components/UI/ErrorBoundary";
import ReactRouterPropTypes from "react-router-prop-types";
import ErrorSection from "../../components/UI/ErrorSection";
import * as globalVars from "../../services/global-vars";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

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
    match: ReactRouterPropTypes.match,
    location: ReactRouterPropTypes.location,
    history: ReactRouterPropTypes.history
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
    let itemError = "";
    let itemResponse = await elasticsearchApi.getItem(id);
    const { error } = itemResponse;

    // Handle possible errors
    // Generic error
    if (error) {
      if (error.statusCode === 403) {
        itemError = error.reason;
      } else {
        return this.handle404redirect(itemResponse.error.reason);
      }
    }
    // Item not found
    else if (!itemResponse.found) {
      return this.handle404redirect();
    }
    // Restricted item
    else if (itemResponse._source.visibility === "restricted") {
      itemError = `The current item's visibility is restricted.`;
    }
    // Authenticated
    else if (
      itemResponse._source.visibility === "authenticated" &&
      !this.props.auth.token
    ) {
      itemError = `The current item's visibility is restricted to logged in users.`;
    }

    if (itemError) {
      return this.setState({
        error: itemError
      });
    }

    return itemResponse._source;
  }

  handle404redirect(
    message = "There was an error retrieving the item, or the item id does not exist."
  ) {
    this.props.history.push(globalVars.ROUTES.PAGE_NOT_FOUND.path, {
      message
    });
  }

  populateGTMDataLayer(item) {
    const rightsStatement = item.rights_statement
      ? item.rights_statement.label
      : "";
    const creators = item.creator.map(creator => creator.label);
    const contributors = item.contributor.map(contributor => contributor.label);

    const dataLayer = {
      adminset: item.admin_set.title.map(title => title).join(", "),
      collections: item.collection.map(collection =>
        collection.title.map(title => title).join(", ")
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
    const { id, item, error, loading, structuredData } = this.state;

    // This check ensures that when changing ids (items) on the same route, the "id" is different
    // at this point of execution
    const idInSync = this.props.match.params.id === id;

    const itemTitle = item ? elasticsearchParser.getESTitle(item) : "";

    if (loading) {
      return <LoadingSpinner loading={loading} />;
    }

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
        <ErrorBoundary>
          {error && <ErrorSection message={error} />}
          {item && idInSync && !error && <OpenSeadragonContainer item={item} />}
          <div id="page">
            <main id="main-content" className="content" tabIndex="0">
              {item && item.hasOwnProperty("id") && <Work work={item} />}
            </main>
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const withRouterScreensWork = withRouter(ScreensWork);
export default connect(mapStateToProps)(withRouterScreensWork);
