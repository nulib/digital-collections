import React, { useEffect } from "react";
import Breadcrumbs from "../components/UI/Breadcrumbs/Breadcrumbs";
import { generateTitleTag } from "../services/helpers";
import { Helmet } from "react-helmet";
import { loadDataLayer } from "../services/google-tag-manager";
import { ROUTES } from "../services/global-vars";
import Obfuscate from "react-obfuscate";
import { loadDefaultStructuredData } from "../services/google-structured-data";

const breadCrumbs = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Contact Us",
  },
];

const ScreensContactUs = () => {
  useEffect(() => {
    loadDataLayer({ pageTitle: ROUTES.CONTACT.title });
  }, []);

  return (
    <div className="standard-page narrow-page" data-testid="contact-us">
      <Helmet>
        <title>{generateTitleTag(ROUTES.CONTACT.title)}</title>
        <script type="application/ld+json">
          {JSON.stringify(loadDefaultStructuredData())}
        </script>
      </Helmet>
      <div id="page">
        <main id="main-content" className="content" tabIndex="0">
          <Breadcrumbs items={breadCrumbs} />
          <p>
            Northwestern University Libraries&apos; Repository and Digital
            Curation department is located in the main library on our Evanston
            campus. The department is responsible for digitization of library
            collections, describing content, and creating the software that runs
            this website.
          </p>

          <p>
            Questions about digitization, description of items, or software can
            be directed here. <Obfuscate email="repository@northwestern.edu" />
          </p>

          <p>
            The content on the site comes from multiple library collections,
            departments and units. Please visit{" "}
            <a
              href="https://www.library.northwestern.edu/research/research-support/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Research Support
            </a>{" "}
            to find the contact information for the library department that can
            best offer research assistance.
          </p>
        </main>
      </div>
    </div>
  );
};

export default ScreensContactUs;
