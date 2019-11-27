import React, { Component } from "react";
import {
  DataSearch,
  SelectedFilters,
  ReactiveList
} from "@appbaseio/reactivesearch";
import {
  getESImagePath,
  getESTitle
} from "../../services/elasticsearch-parser";
import LoadingSpinner from "../UI/LoadingSpinner";
import {
  DATASEARCH_PLACEHOLDER,
  GLOBAL_SEARCH_BAR_COMPONENT_ID,
  imageFacets,
  imageFilters,
  imagesOnlyDefaultQuery,
  simpleQueryStringQuery
} from "../../services/reactive-search";
import PhotoBox from "../UI/PhotoBox";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../services/global-vars";
import FacetsSidebar from "../UI/FacetsSidebar";
import Breadcrumbs from "../UI/Breadcrumbs/Breadcrumbs";
import { loadDataLayer } from "../../services/google-tag-manager";
import FiltersShowHideButton from "../UI/FiltersShowHideButton";
import { connect } from "react-redux";
import { searchValueChange } from "../../actions/search";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";

const breadcrumbs = [
  { link: "/", title: "Home" },
  { link: "", title: "Search Results" }
];

class Search extends Component {
  constructor(props) {
    super(props);
    this.facetValue = "";
    this.searchValue = "";
  }
  static propTypes = {
    location: ReactRouterPropTypes.location,
    searchValueChange: PropTypes.func.isRequired
  };

  state = {
    componentLoaded: false,
    locationState: null,
    showSidebar: false
  };

  componentDidMount() {
    loadDataLayer({ pageTitle: ROUTES.SEARCH.title });
    this.handleLocationState();
    this.setState({ componentLoaded: true });
  }

  /**
   * Runs when React Router "state" is sent into this component packaged with a link,
   * or "history.push()" action into this component.  This info is then passed into
   * the sidebar for some intro filtering.
   */
  handleLocationState = () => {
    const { location } = this.props;

    if (location.state) {
      this.facetValue = location.state.facetValue;
      this.searchValue = location.state.searchValue;
    }
  };

  handleDisplaySidebarClick = e => {
    e.preventDefault();
    this.setState({ showSidebar: !this.state.showSidebar });
  };

  onValueChange = value => {
    this.props.searchValueChange(value);
  };

  /**
   * Helper function to display a custom component to display instead of ReactiveSearch's
   * @param {Object} res - ReactivSearch result object
   */
  renderItem = res => {
    let item = {
      id: res.id,
      imageUrl: getESImagePath(res),
      label: getESTitle(res),
      type: res.model.name
    };

    return <PhotoBox key={item.id} item={item} />;
  };

  render() {
    const allFilters = [GLOBAL_SEARCH_BAR_COMPONENT_ID, ...imageFilters];
    const { componentLoaded, showSidebar } = this.state;

    return (
      <>
        {componentLoaded && (
          <FacetsSidebar
            facets={imageFacets}
            facetValue={this.facetValue}
            filters={allFilters}
            searchValue={this.searchValue}
            showSidebar={showSidebar}
          />
        )}

        <main
          id="main-content"
          className={`content ${!showSidebar ? "extended" : ""}`}
          tabIndex="-1"
        >
          <Breadcrumbs items={breadcrumbs} />

          <h2>Search Results</h2>

          <DataSearch
            autosuggest={false}
            className="datasearch web-form"
            customQuery={simpleQueryStringQuery}
            componentId={GLOBAL_SEARCH_BAR_COMPONENT_ID}
            dataField={[]}
            debounce={1000}
            filterLabel="Search"
            innerClass={{
              input: "searchbox rs-search-input",
              list: "suggestionlist"
            }}
            queryFormat="or"
            placeholder={DATASEARCH_PLACEHOLDER}
            URLParams={true}
            onValueChange={this.onValueChange}
          />

          <SelectedFilters />

          <FiltersShowHideButton
            showSidebar={showSidebar}
            handleToggleFiltersClick={this.handleDisplaySidebarClick}
          />

          <ReactiveList
            componentId="results"
            dataField="title.primary.keyword"
            innerClass={{
              list: "rs-result-list photo-grid four-grid",
              pagination: "rs-pagination",
              resultsInfo: "rs-results-info"
            }}
            defaultQuery={imagesOnlyDefaultQuery}
            loader={<LoadingSpinner loading={true} />}
            renderItem={this.renderItem}
            pagination={true}
            paginationAt="bottom"
            react={{
              and: allFilters
            }}
            size={12}
            URLParams={true}
          />
        </main>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  searchValueChange: value => dispatch(searchValueChange(value))
});

export const ConnectedSearch = connect(null, mapDispatchToProps)(Search);

export default withRouter(ConnectedSearch);
