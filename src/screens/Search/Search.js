import React, { useEffect } from "react";
import { generateTitleTag } from "../../services/helpers";
import { Helmet } from "react-helmet";
import { ROUTES } from "../../services/global-vars";
import { loadDataLayer } from "../../services/google-tag-manager";
import Search from "../../components/Search/Search";
import { ErrorBoundary } from "react-error-boundary";
import FallbackErrorComponent from "components/UI/FallbackErrorComponent";

const ScreensSearch = () => {
  useEffect(() => {
    loadDataLayer({ pageTitle: ROUTES.SEARCH.title });
  }, []);

  const breadcrumbs = [
    { link: "/", title: "Home" },
    { link: "", title: "Search Results" },
  ];

  return (
    <div className="standard-page">
      <Helmet>
        <title>{generateTitleTag("Search")}</title>
      </Helmet>
      <div id="page" className="search">
        <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
          <Search breadcrumbs={breadcrumbs} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ScreensSearch;
