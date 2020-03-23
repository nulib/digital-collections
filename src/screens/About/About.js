import React, { useEffect } from "react";
import FeatureBox from "../../components/UI/FeatureBox";
import { Link } from "react-router-dom";
import { ROUTES } from "../../services/global-vars";
import { generateTitleTag } from "../../services/helpers";
import { Helmet } from "react-helmet";
import { shuffleArray } from "../../services/helpers";
import lizPic from "../../images/liz__O8A9903_final.jpg";
import druPic from "../../images/dru__O8A9937_final.jpg";
import curtPic from "../../images/curt__O8A9877_final.jpg";
import joshPic from "../../images/josh__O8A9915_final.jpg";
import iiifLogo from "../../images/IIIF-logo.png";
import { loadDataLayer } from "../../services/google-tag-manager";
import Breadcrumbs from "../../components/UI/Breadcrumbs/Breadcrumbs";
import { loadDefaultStructuredData } from "../../services/google-structured-data";
import { featuredCollections } from "./featured-collections";

const breadcrumbs = [
  { link: "/", title: "Home" },
  { link: "/about", title: "About" }
];

const AboutScreen = () => {
  const aboutPics = shuffleArray([curtPic, druPic, joshPic, lizPic]);

  const styles = {
    heroBg: {
      backgroundImage: `url(${aboutPics[0]})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    iiifLogo: {
      display: "inline-block",
      width: "45px",
      marginRight: "10px"
    },
    section: {
      marginBottom: "3rem"
    }
  };

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
      <div className="section hero contain-1440">
        <div className="hero-image" style={styles.heroBg}>
          <div className="contain-1120">
            <h2>Repository and Digital Curation</h2>
            <p>Digitizing Our Distinctive Collections</p>
          </div>
        </div>
      </div>

      <div id="page">
        <main id="main-content" className="content" tabIndex="0">
          <Breadcrumbs items={breadcrumbs} />
          <div style={styles.section}>
            <p>
              {`Digital Collections contains thousands of items from Northwestern
                University Libraries. While only a fraction of materials from the
                Libraries' collections are represented, the site is representative
                of the distinction and diversity of collections from the `}
              <a
                href="https://www.library.northwestern.edu/libraries-collections/government-collection/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Northwestern Government and Geographic Information collection
              </a>
              ,{" "}
              <a
                href="https://www.library.northwestern.edu/libraries-collections/herskovits-library/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Herskovits Library of African Studies
              </a>
              ,{" "}
              <a
                href="https://www.library.northwestern.edu/libraries-collections/music/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Music Library
              </a>
              ,{" "}
              <a
                href="https://www.library.northwestern.edu/libraries-collections/special-collections/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                McCormick Library of Special Collections
              </a>
              ,{" "}
              <a
                href="https://www.library.northwestern.edu/libraries-collections/transportation/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Transportation Library
              </a>
              , and{" "}
              <a
                href="https://www.library.northwestern.edu/libraries-collections/university-archives/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                University Archives
              </a>
              .
            </p>
          </div>

          <h3>Collection Highlights</h3>
          <p>
            Our collections are comprised of a range of media covering many
            topics. Highlights include:
          </p>

          <div className="feature-two-col">
            <FeatureBox
              key={featuredCollections[0].id}
              item={featuredCollections[0]}
              modelType="collection"
            />
            <FeatureBox
              key={featuredCollections[1].id}
              item={featuredCollections[1]}
              modelType="collection"
            />
          </div>

          <div className="feature-two-col">
            <FeatureBox
              key={featuredCollections[2].id}
              item={featuredCollections[2]}
              modelType="collection"
            />
            <FeatureBox
              key={featuredCollections[3].id}
              item={featuredCollections[3]}
              modelType="collection"
            />
          </div>

          <div className="feature-two-col">
            <FeatureBox
              key={featuredCollections[4].id}
              item={featuredCollections[4]}
              modelType="collection"
            />
            <FeatureBox
              key={featuredCollections[5].id}
              item={featuredCollections[5]}
              modelType="image"
            />
          </div>

          <p>
            Not all of our digital collections are available to the public. If
            you have questions about these collections or the software behind
            this site, please <Link to="/contact-us">contact us</Link>.
          </p>

          <h3>Using the collections</h3>
          <h4>Rights Statement</h4>
          <p>
            {`We offer support to the Northwestern community on copyright and fair use in scholarly research, publishing, teaching and other areas. Our Copyright Librarian is available to answer questions regarding clearing permissions for publications, making public domain determinations, copyright registration, publication agreements, and more.`}
          </p>
          <p>
            For more information, visit{" "}
            <a
              href="https://www.library.northwestern.edu/research/scholarly/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Scholarly Research Services
            </a>
            .
          </p>

          <h4>
            <img src={iiifLogo} alt="IIIF logo" style={styles.iiifLogo} />
            International Image Interoperability Framework (IIIF)
          </h4>
          <p>
            We currently make all content metadata and images available as{" "}
            <a
              href="https://iiif.io/api/presentation/2.1/#manifest"
              target="_blank"
              rel="noopener noreferrer"
            >
              IIIF manifests
            </a>{" "}
            backed by a IIIF compliant image server. This allows researchers to
            see detailed, zoomable images on this site as well as use the
            content in outside tools such as
            {` `}
            <a
              href="http://projectmirador.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mirador
            </a>
            , embed on third-party websites, and programmatically query the
            data.
          </p>
          <p>
            More information about IIIF and related projects is available on on
            the{" "}
            <a
              href="https://iiif.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              IIIF website
            </a>
            .
          </p>

          <h3>Platform</h3>
          <h4>Development Tools</h4>
          <ul>
            <li>
              The repository and metadata management software is a{" "}
              <a
                href="https://rubyonrails.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ruby on Rails application
              </a>{" "}
              built from{" "}
              <a
                href="https://samvera.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Samvera Community
              </a>{" "}
              components.
            </li>
            <li>
              The Digital Collections front end is built using{" "}
              <a
                href="https://reactjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ReactJS
              </a>{" "}
              and{" "}
              <a
                href="https://redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redux
              </a>
              .
            </li>
            <li>
              Our zoomable, high-resolution images are are driven by{" "}
              <a
                href="https://iiif.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                IIIF
              </a>
              .
            </li>
            <li>
              {`Northwestern's code
                is open by default and published on `}
              <a
                href="https://github.com/nulib/"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub.
              </a>
            </li>
            <li />
            <li />
          </ul>
        </main>
      </div>
    </div>
  );
};

export default AboutScreen;
