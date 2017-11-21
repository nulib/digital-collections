import React, {Component} from 'react';
import FilterInput from '../../components/FilterInput';
import PhotoGrid from '../../components/PhotoGrid';
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
    }
    // initialize the Sets API Class
    this.setsApi = new SetsApi();

    // Grab route params
    this.sectionType = props.match.params.sectionType;
    this.id = props.match.params.id;
  }

  componentDidMount() {
    document.body.className="landing-page";

    // Grab REST API data here

    // Get set info
    this.setsApi.getSet(this.sectionType, this.id).then(data => {
      this.setState({
        set: data
      });
    });

    // Get set items
    this.setsApi.getSetItems(this.id).then(data => {
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
              <section>
                <h2>{this.state.set.title_tesim}</h2>
                <p>{this.state.set.description_tesim}</p>
              </section>
              <form className="web-form">
                <FilterInput filterName={this.state.set.title_tesim} />
              </form>
              <PhotoGrid
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

export default SetPage;
