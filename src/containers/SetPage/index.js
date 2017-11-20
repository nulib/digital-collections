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
      items: []
    }
    // initialize the Sets API Class
    this.setsApi = new SetsApi();

    // Grab route params
    this.sectionType = props.match.params.sectionType;
    this.id = props.match.params.id;
  }

  componentDidMount() {
    document.body.className="landing-page";

    const items = this.setsApi.getSetItems(this.id);
    this.setState({
      items: items,
      isLoaded: true
    });
  }

  render() {
    // Get set information
    this.set = this.setsApi.getSet(this.sectionType, this.id);
    console.log('set', this.set);

    return (
      <div>
        <div id="page" className="sets-page">
          <main id="main-content" className="content-full" tabIndex="0">
            <div className="contain-1120">
              <h2>{this.set.label}</h2>
              <p>{this.set.description}</p>
              <form className="web-form">
                <FilterInput filterName={this.set.label} />
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
