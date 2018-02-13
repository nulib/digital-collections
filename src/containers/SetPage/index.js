import React, { Component } from 'react';
import FilterInput from '../../components/FilterInput';
import PhotoGrid from '../../components/PhotoGrid';
import ErrorSection from '../../components/ErrorSection';
import CollectionsApi from '../../api/collections-api';
import SetsApi from '../../api/sets-api';
import '../SetsPage/SetsPage.css';

class SetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      set: {}
    };
    // initialize API request wrappers
    this.setsApi = new SetsApi();
    this.collectionsApi = new CollectionsApi();

    // Grab route params
    this.sectionType = props.match.params.sectionType;
    this.id = props.match.params.id;
  }

  componentDidMount() {
    document.body.className = 'standard-page';

    // Grab REST API data here
    if (this.sectionType === 'collections') {
      this.getCollectionData();
    } else {
      this.getSetsData();
    }
  }

  getCollectionData() {
    // Get collection info
    this.collectionsApi
      .getCollection(this.id)
      .then(this.updateSetState.bind(this));
    // Get items in collection
    this.collectionsApi
      .getCollectionItems(this.id)
      .then(this.updateItemsState.bind(this));
  }

  getSetsData() {
    // Get set info
    this.setsApi
      .getSet(this.sectionType, this.id)
      .then(this.updateSetState.bind(this));
    // Get items in set
    this.setsApi
      .getSetItems(this.sectionType)
      .then(this.updateItemsState.bind(this));
  }

  updateItemsState(data) {
    this.setState({
      items: data.response.docs,
      isLoaded: true
    });
  }

  updateSetState(data) {
    this.setState({
      set: data.response.docs[0]
    });
  }

  render() {
    const { error, isLoaded, items, set } = this.state;

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
                <section>
                  <h2>{set.title_tesim}</h2>
                  <p>{set.description_tesim}</p>
                </section>
                <form className="web-form">
                  <FilterInput filterName={set.title_tesim} />
                </form>
                <PhotoGrid
                  additionalClasses="four-grid contain-1120 full-images"
                  items={items}
                  linkPrefix={`/${this.sectionType}/${this.id}`}
                />
              </div>
            </main>
          </div>
        </div>
      );
    }
  }
}

export default SetPage;
