import React, { Component } from 'react';
import FeatureBox from '../components/FeatureBox';
import { Link } from 'react-router-dom';
import iranianCinema from '../images/feature-box-collection-iranian-cinema.jpg';
import colonialism from '../images/feature-box-collection-colonialism.jpg';
import bursarsOffice from '../images/feature-box-collection-bursars-office.jpg';
import cassas from '../images/feature-box-collection-cassas.jpg';
import roadTrip from '../images/feature-box-collection-road-trip.jpg';
import wwII from '../images/feature-box-collection-wwII.jpg';
import { productionIds, ROUTES } from '../services/global-vars';
import { generateTitleTag } from '../services/helpers';
import { Helmet } from 'react-helmet';
import { shuffleArray } from '../services/helpers';
import { getTotalItemCount } from '../api/elasticsearch-api';
import lizPic from '../images/liz__O8A9903_final.jpg';
import druPic from '../images/dru__O8A9937_final.jpg';
import curtPic from '../images/curt__O8A9877_final.jpg';
import joshPic from '../images/josh__O8A9915_final.jpg';
import iiifLogo from '../images/IIIF-logo.png';
import { loadDataLayer } from '../services/google-tag-manager';

const featuredCollections = [
  {
    description: 'Posters depicting the social history of Iranian cinema.',
    id: productionIds.hamidNaficy,
    image: iranianCinema,
    label: 'Hamid Naficy Iranian Movie Posters Collection'
  },
  {
    description: `Photographs representing colonialism in East Africa over the span
    of 100 years.`,
    id: productionIds.vernonMcKay,
    image: colonialism,
    label: 'Vernon McKay Photographs'
  },
  {
    description: `Images documenting the 1968 takeover of the Northwestern University Bursar's office.`,
    id: productionIds.bursarsOffice,
    image: bursarsOffice,
    label: 'Records of the Bursar’s Office Takeover, May 1968'
  },
  {
    description: 'US Government posters from WWII.',
    id: productionIds.wpa,
    image: wwII,
    label: 'World War II Poster Collection at Northwestern University Library'
  },
  {
    description: 'Late sketches from modernist artist Ramón Casas.',
    id: productionIds.ramonCasas,
    image: cassas,
    label: 'Ramón Casas sketchbooks'
  },
  {
    description: `Photographs from a 1915 road trip from Iowa to the Panama-Pacific
    exposition.`,
    id: productionIds.kateAndLou,
    image: roadTrip,
    label: 'Kate and Lou. Souvenir of auto trip to San Francisco, 1915'
  }
];

const rdc = 'Northwestern Repository and Digital Curation';

class About extends Component {
  state = {
    totalItemCount: null
  };

  aboutPics = shuffleArray([curtPic, druPic, joshPic, lizPic]);

  styles = {
    heroBg: {
      backgroundImage: `url(${this.aboutPics[0]})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    iiifLogo: {
      display: 'inline-block',
      width: '45px',
      marginRight: '10px'
    }
  };

  componentDidMount() {
    this.getTotalItems();
    loadDataLayer({ pageTitle: ROUTES.ABOUT.title });
  }

  async getTotalItems() {
    let totalItemCount = await getTotalItemCount();
    this.setState({ totalItemCount });
  }

  render() {
    return (
      <div className="landing-page">
        <Helmet>
          <title>{generateTitleTag(ROUTES.ABOUT.title)}</title>
        </Helmet>
        <div className="section hero contain-1440">
          <div className="hero-image" style={this.styles.heroBg}>
            <div className="contain-1120">
              <h2>Repository and Digital Curation</h2>
              <p>Digitizing Our Distinctive Collections</p>
            </div>
          </div>
        </div>

        <div id="page">
          <main id="main-content" className="content" tabIndex="0">
            <div className="section contain-1120">
              <p>
                {`Digital Collections contains ${
                  this.state.totalItemCount
                } items from Northwestern
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
                ,{' '}
                <a
                  href="https://www.library.northwestern.edu/libraries-collections/herskovits-library/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Herskovits Library of African Studies
                </a>
                ,{' '}
                <a
                  href="https://www.library.northwestern.edu/libraries-collections/music/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Music Library
                </a>
                ,{' '}
                <a
                  href="https://www.library.northwestern.edu/libraries-collections/special-collections/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  McCormick Library of Special Collections
                </a>
                ,{' '}
                <a
                  href="https://www.library.northwestern.edu/libraries-collections/transportation/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Transportation Library
                </a>
                , and{' '}
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

            <div className="contain-1120">
              <h3>Collection Highlights</h3>
              <p>
                Our collections are comprised of a range of media covering many
                topics. Highlights include:
              </p>
            </div>

            <div className="section contain-1120">
              <div className="feature-three-col">
                {featuredCollections.map((feature, index) =>
                  index < 3 ? (
                    <FeatureBox
                      key={feature.id}
                      item={feature}
                      modelType="collection"
                    />
                  ) : null
                )}
              </div>
            </div>

            <div className="section contain-1120">
              <div className="feature-three-col">
                {featuredCollections.map((feature, index) =>
                  index > 2 ? (
                    <FeatureBox
                      key={feature.id}
                      item={feature}
                      modelType="collection"
                    />
                  ) : null
                )}
              </div>
              <p>
                Not all of our digital collections are available to the public.
                If you have questions about these collections or the software
                behind this site, please{' '}
                <Link to="/contact-us">contact us</Link>.
              </p>
            </div>

            <div className="section contain-1120">
              <h3>Using the collections</h3>
            </div>

            <div className="section contain-1120">
              <div className="alternate-photo-float">
                <div className="image-left">
                  <img
                    alt={`${rdc} rights statement`}
                    src={this.aboutPics[1]}
                  />
                </div>
                <div className="text">
                  <h4>Rights Statement</h4>
                  <p>
                    {`We offer support to the Northwestern community on copyright and fair use in scholarly research, publishing, teaching and other areas. Our Copyright Librarian is available to answer questions regarding clearing permissions for publications, making public domain determinations, copyright registration, publication agreements, and more.`}
                  </p>
                  <p>
                    For more information, visit{' '}
                    <a
                      href="https://www.library.northwestern.edu/research/scholarly/index.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Scholarly Research Services
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="alternate-photo-float">
                <div className="text">
                  <h4>
                    <img
                      src={iiifLogo}
                      alt="IIIF logo"
                      style={this.styles.iiifLogo}
                    />
                    International Image Interoperability Framework (IIIF)
                  </h4>
                  <p>
                    We currently make all content metadata and images available
                    as{' '}
                    <a
                      href="https://iiif.io/api/presentation/2.1/#manifest"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      IIIF manifests
                    </a>{' '}
                    backed by a IIIF compliant image server. This allows
                    researchers to see detailed, zoomable images on this site as
                    well as use the content in outside tools such as
                    {` `}
                    <a
                      href="http://projectmirador.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mirador
                    </a>
                    , embed on third-party websites, and programmatically query
                    the data.
                  </p>
                  <p>
                    More information about IIIF and related projects is
                    available on on the{' '}
                    <a
                      href="https://iiif.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      IIIF website
                    </a>
                    .
                  </p>
                </div>
                <div className="image-right">
                  {/* eslint-disable */}
                  <img
                    alt={`${rdc} IIIF International Image Interoperability Framework`}
                    src={this.aboutPics[2]}
                  />
                  {/* eslint-enable */}
                </div>
              </div>
            </div>

            <div className="section contain-1120">
              <h3>Platform</h3>
            </div>

            <div className="section contain-1120">
              <div className="alternate-photo-float">
                <div className="image-left">
                  <img
                    alt={`${rdc} development tools`}
                    src={this.aboutPics[3]}
                  />
                </div>
                <div className="text">
                  <h4>Development Tools</h4>
                  <ul>
                    <li>
                      The repository and metadata management software is a{' '}
                      <a
                        href="https://rubyonrails.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ruby on Rails application
                      </a>{' '}
                      built from{' '}
                      <a
                        href="https://samvera.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Samvera Community
                      </a>{' '}
                      components.
                    </li>
                    <li>
                      The Digital Collections front end is built using{' '}
                      <a
                        href="https://reactjs.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ReactJS
                      </a>{' '}
                      and{' '}
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
                      Our zoomable, high-resolution images are are driven by{' '}
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
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default About;
