import React, { useEffect } from "react";
import * as globalVars from "../../services/global-vars";
import { Helmet } from "react-helmet";
import { generateTitleTag } from "../../services/helpers";
import { loadDataLayer } from "../../services/google-tag-manager";
import { loadDefaultStructuredData } from "../../services/google-structured-data";
import Home from "../../components/Home/Home";
import { ErrorBoundary } from "react-error-boundary";
import FallbackErrorComponent from "components/UI/FallbackErrorComponent";

const ScreensHome = () => {
  useEffect(() => {
    loadDataLayer({ pageTitle: globalVars.ROUTES.HOME.title });
  }, []);

  return (
    <div className="landing-page">
      <Helmet>
        <title>{generateTitleTag()}</title>
        <script type="application/ld+json">
          {JSON.stringify(loadDefaultStructuredData())}
        </script>
      </Helmet>
      <div id="page">
        <main id="main-content" className="content" tabIndex="0">
          <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
            <Home />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default ScreensHome;
