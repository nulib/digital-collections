import React, { useEffect } from "react";
import Breadcrumbs from "../components/UI/Breadcrumbs/Breadcrumbs";
import { generateTitleTag } from "../services/helpers";
import { Helmet } from "react-helmet";
import { loadDataLayer } from "../services/google-tag-manager";
import { ROUTES } from "../services/global-vars";
import { withRouter, useLocation } from "react-router-dom";

const breadCrumbs = [
  {
    title: "Home",
    link: "/"
  },
  {
    title: ROUTES.PAGE_NOT_FOUND.title
  }
];

const Default404 = () => {
  const { state } = useLocation();
  const { title } = ROUTES.PAGE_NOT_FOUND;
  let message = `We're sorry, this page does not exist.`;

  useEffect(() => {
    loadDataLayer({ pageTitle: ROUTES.PAGE_NOT_FOUND.title });
  }, []);

  if (state && state.message) {
    message = state.message;
  }

  return (
    <div className="standard-page narrow-page">
      <Helmet>
        <title>{generateTitleTag(title)}</title>
      </Helmet>
      <div id="page">
        <main id="main-content" className="content" tabIndex="0">
          <Breadcrumbs items={breadCrumbs} />
          <h2>{title}</h2>
          <p>{message}</p>
        </main>
      </div>
    </div>
  );
};

export default withRouter(Default404);
