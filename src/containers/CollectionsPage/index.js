import React, {Component} from 'react';
import FilterInput from '../../components/FilterInput';
import PhotoGrid from '../../components/PhotoGrid';
import CollectionsApi from '../../api/collections-api';
import collectionsData from '../../api/collections-data';
import './CollectionsPage.css';


class CollectionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
    // initialize the Sets API Class
    this.collectionsApi = new CollectionsApi();

  }

  componentDidMount() {
    document.body.className="landing-page";
    // Grab REST API data here
    this.collectionsApi.getAllCollections().then((data) => {
      this.setState({
        items: data.response.docs,
        isLoaded: true
      });
    });
  }

  render() {
    const headline = collectionsData.collections.label;
    const description = collectionsData.collections.description;

    return (
      <div>
        <div id="page" className="sets-page">
          <main id="main-content" className="content-full" tabIndex="0">
            <div className="contain-1120">
              <h2>{headline}</h2>
              <p>{description}</p>
              <form className="web-form">
                <FilterInput filterName={collectionsData.collections.label} />
              </form>
              <PhotoGrid
                items={this.state.items}
                linkPrefix={`/collections`}
                />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default CollectionsPage;
