import React, { useEffect } from "react";
import * as globalVars from "../../services/global-vars";
import { generateTitleTag } from "../../services/helpers";
import { Helmet } from "react-helmet";
import { loadDataLayer } from "../../services/google-tag-manager";
import { loadDefaultStructuredData } from "../../services/google-structured-data";
import CollectionList from "../../components/Collection/List";

const { title } = globalVars.ROUTES.COLLECTIONS_ALL;

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
          <CollectionList />
        </main>
      </div>
    </div>
  );
};

export default ScreensCollectionList;
