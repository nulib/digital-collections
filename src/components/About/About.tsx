import React from "react";
import FeatureBox from "components/UI/FeatureBox";
import { Link } from "react-router-dom";
import iiifLogo from "images/IIIF-logo.png";
import { featuredCollections } from "screens/About/featured-collections";

const About: React.FC = () => {
  const styles = {
    iiifLogo: {
      display: "inline-block",
      width: "45px",
      marginRight: "10px",
    },
    section: {
      marginBottom: "3rem",
    },
  };

  return (
    <>
      <div style={styles.section} data-testid="section-collection-summary">
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
      <section className="section" data-testid="collection-highlights-section">
        <h3>Collection Highlights</h3>
        <p>
          Our collections are comprised of a range of media covering many
          topics. Highlights include:
        </p>

        <div className="feature-two-col" data-testid="feature-two-col1">
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

        <div className="feature-two-col" data-testid="feature-two-col2">
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

        <div className="feature-two-col" data-testid="feature-two-col3">
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
          Not all of our digital collections are available to the public. If you
          have questions about these collections or the software behind this
          site, please <Link to="/contact-us">contact us</Link>.
        </p>
      </section>

      <section className="section" data-testid="collections-usage-section">
        <p></p>
        <h3>Using the collections</h3>
        <article data-testid="rights-statement-article">
          <h4>Rights Statement</h4>
          <p data-testid="rights-statement-text">
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
        </article>
        <article data-testid="IIIF-article">
          <h4>
            <img src={iiifLogo} alt="IIIF logo" style={styles.iiifLogo} />
            International Image Interoperability Framework (IIIF)
          </h4>
          <p data-testid="IIIF-text">
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
        </article>
      </section>
      <section className="section" data-testid="platform-section">
        <p></p>
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
            Our zoomable, high-resolution images are driven by{" "}
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
        </ul>
      </section>
    </>
  );
};

export default About;
