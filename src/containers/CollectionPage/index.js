import React, {Component} from 'react';
import FilterInput from '../../components/FilterInput';
import PhotoGrid from '../../components/PhotoGrid';
import CollectionsApi from '../../api/collections-api';
import '../CollectionsPage/CollectionsPage.css';


class CollectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      set: {}
    }
    // initialize the Sets API Class
    this.collectionsApi = new CollectionsApi();

    // Grab route params
    this.sectionType = 'collections';
    this.id = props.match.params.id;
  }

  componentDidMount() {
    document.body.className="landing-page";

    // Grab REST API data here

    // Get set info
    this.collectionsApi.getCollection(this.id).then(data => {
      this.setState({
        set: data.response.docs[0]
      });
    });

    // Get set items
    this.collectionsApi.getCollectionItems(this.id).then(data => {
      this.setState({
        items: data.response.docs,
        isLoaded: true
      });
    });
  }

  render() {
    return (
      <div>
        <div id="page" className="sets-page">
          <main id="main-content" className="content-full" tabIndex="0">
            <div className="contain-1120">
              <h2>{this.state.set.title_tesim}</h2>
              <p>{this.state.set.description_tesim}</p>
              <form className="web-form">
                <FilterInput filterName={this.state.set.title_tesim} />
              </form>
              <PhotoGrid
                additionalClasses="contain-1120 full-images"
                items={this.state.items}
                linkPrefix={`/item`}
                />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default CollectionPage;
