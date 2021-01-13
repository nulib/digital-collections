import React, { useEffect } from "react";
import * as globalVars from "../../services/global-vars";
import { generateTitleTag } from "../../services/helpers";
import { Helmet } from "react-helmet";
import { loadDataLayer } from "../../services/google-tag-manager";
import { loadDefaultStructuredData } from "../../services/google-structured-data";
import CollectionList from "../../components/Collection/List";
import { ErrorBoundary } from "react-error-boundary";
import Breadcrumbs from "components/UI/Breadcrumbs/Breadcrumbs";
import FallbackErrorComponent from "components/UI/FallbackErrorComponent";

const { title } = globalVars.ROUTES.COLLECTIONS_ALL;

const breadcrumbItems = [
  { title: "Collections", link: "collections" },
  { title, link: "/" },
];

const ScreensCollectionList = () => {
  useEffect(() => {
    loadDataLayer({ pageTitle: globalVars.ROUTES.COLLECTIONS_ALL.title });
  }, []);

  return (
    <div className="standard-page">
      <Helmet>
        <title>{generateTitleTag(title)}</title>
        <script type="application/ld+json">
          {JSON.stringify(loadDefaultStructuredData())}
        </script>
      </Helmet>
      <div id="page">
        <main id="main-content" className="content extended" tabIndex="0">
          <Breadcrumbs items={breadcrumbItems} />
          <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
            <CollectionList />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default ScreensCollectionList;
