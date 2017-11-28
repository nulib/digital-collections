import React, {Component} from 'react';
import FilterInput from '../../components/FilterInput';
import PhotoGrid from '../../components/PhotoGrid';
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
      items: []
    }
    // initialize API request wrappers
    this.setsApi = new SetsApi();
    this.collectionsApi = new CollectionsApi();

    // Grab route params
    this.sectionType = props.match.params.sectionType;
  }

  componentDidMount() {
    document.body.className="standard-page";

    // Grab REST API data here
    // Collections
    if (this.sectionType === 'collections') {
      this.collectionsApi.getAllCollections().then(this.updateApiState.bind(this));
    } // All other Sets
    else {
      this.setsApi.getAllSets(this.sectionType).then(this.updateApiState.bind(this));
    }
  }

  updateApiState(data) {
    this.setState({
      items: data.response.docs,
      isLoaded: true
    });
  }

  render() {
    const headline = sectionsData[this.sectionType].label;
    const description = sectionsData[this.sectionType].description;
    const linkPrefix = `/${this.sectionType}`;

    return (
      <div>
        <div id="page" className="sets-page">
          <main id="main-content" className="content-full" tabIndex="0">
            <div className="contain-1120">
              <h2>{headline}</h2>
              <p>{description}</p>
              <form className="web-form">
                <FilterInput filterName={sectionsData[this.sectionType].label} />
              </form>
              <PhotoGrid
                additionalClasses="four-grid contain-1120 full-images"
                items={this.state.items}
                linkPrefix={linkPrefix}
                />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default SetsPage;
