import React, { Component } from 'react';
import FilterInput from '../../components/FilterInput';
import PhotoGrid from '../../components/PhotoGrid';
import ErrorSection from '../../components/ErrorSection';
import CollectionsApi from '../../api/collections-api';
import SetsApi from '../../api/sets-api';
import sectionsData from '../../api/sections-data';
import './SetsPage.css';

class SetsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      sectionType: props.match.params.sectionType
    };
    // initialize API request wrappers
    this.setsApi = new SetsApi();
    this.collectionsApi = new CollectionsApi();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.url !== this.props.match.url) {
      this.getSetRecords(newProps.match.params.sectionType);
    }
  }

  componentDidMount() {
    document.body.className = 'standard-page';
    this.getSetRecords(this.props.match.params.sectionType);
  }

  /**
   * Grab set records from API
   * @param  {string} sectionType Title of set which matches the param in the URL
   * @return {void}
   */
  getSetRecords(sectionType) {
    this.setState({ sectionType: sectionType });

    if (sectionType === 'collections') {
      this.collectionsApi
        .getAllCollections()
        .then(this.updateApiState.bind(this));
    } else {
      // All other Sets
      this.setsApi
        .getAllSets(sectionType)
        .then(this.updateApiState.bind(this));
    }
  }

  updateApiState(data) {
    this.setState({
      items: data.response.docs,
      isLoaded: true
    });
  }

  render() {
    const { error, isLoaded, items, sectionType } = this.state;
    const headline = sectionsData[sectionType].label;
    const description = sectionsData[sectionType].description;
    const linkPrefix = `/${sectionType}`;

    if (error) {
      return <ErrorSection error={error} />;
    } else if (!isLoaded) {
      return <div>{'Loading...'}</div>;
    } else {
      return (
        <div>
          <div id="page" className="sets-page">
            <main id="main-content" className="content-full" tabIndex="0">
              <div className="contain-1120">
                <h2>{headline}</h2>
                <p>{description}</p>
                <form className="web-form">
                  <FilterInput
                    filterName={sectionsData[sectionType].label}
                  />
                </form>
                <PhotoGrid
                  additionalClasses="four-grid contain-1120 full-images"
                  items={items}
                  linkPrefix={linkPrefix}
                />
              </div>
            </main>
          </div>
        </div>
      );
    }
  }
}

export default SetsPage;
