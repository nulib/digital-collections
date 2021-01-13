import React, { useEffect } from "react";
import { ROUTES } from "../../services/global-vars";
import { generateTitleTag } from "../../services/helpers";
import { Helmet } from "react-helmet";
import { loadDataLayer } from "../../services/google-tag-manager";
import Breadcrumbs from "../../components/UI/Breadcrumbs/Breadcrumbs";
import { loadDefaultStructuredData } from "../../services/google-structured-data";
import About from "components/About/About";
import { shuffleArray } from "../../services/helpers";
import lizPic from "../../images/liz__O8A9903_final.jpg";
import druPic from "../../images/dru__O8A9937_final.jpg";
import curtPic from "../../images/curt__O8A9877_final.jpg";
import joshPic from "../../images/josh__O8A9915_final.jpg";
import { ErrorBoundary } from "react-error-boundary";
import FallbackErrorComponent from "components/UI/FallbackErrorComponent";

const breadcrumbs = [
  { link: "/", title: "Home" },
  { link: "/about", title: "About" },
];

const aboutPics = shuffleArray([curtPic, druPic, joshPic, lizPic]);

const styles = {
  heroBg: {
    backgroundImage: `url(${aboutPics[0]})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

const AboutScreen = () => {
  useEffect(() => {
    loadDataLayer({ pageTitle: ROUTES.ABOUT.title });
  }, []);

  return (
    <div className="standard-page narrow-page">
      <Helmet>
        <title>{generateTitleTag(ROUTES.ABOUT.title)}</title>
        <script type="application/ld+json">
          {JSON.stringify(loadDefaultStructuredData())}
        </script>
      </Helmet>
      <div className="section hero contain-1440" data-testid="hero-section">
        <div className="hero-image" style={styles.heroBg}>
          <div className="contain-1120">
            <h2 data-testid="hero-title">Repository and Digital Curation</h2>
            <p data-testid="hero-subtitle">
              Digitizing Our Distinctive Collections
            </p>
          </div>
        </div>
      </div>

      <div id="page">
        <main id="main-content" className="content" tabIndex="0">
          <Breadcrumbs items={breadcrumbs} />
          <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
            <About />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default AboutScreen;
