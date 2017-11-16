import React, {Component} from 'react';
import FilterInput from '../../components/FilterInput';
import PhotoGrid from '../../components/PhotoGrid';
import SetsApi from '../../api/sets-api';
import sectionsData from '../../api/sections-data';


class SetsPage extends Component {
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
    document.body.className="standard-page";
    if (this.id) {
      this.getSetItems();
    } else {
      this.getAllSets();
    }
  }

  getAllSets() {
    const items = this.setsApi.getSetData(this.sectionType);
    this.setState({
      items: items,
      isLoaded: true
    });
  }

  getSetItems() {

  }

  populateDisplayData() {
    let data = {
      headline: 'Need to fill this headline data',
      description: 'Need to fill this description data'
    }

    if (this.id) {

    } else {
      data.headline = sectionsData[this.sectionType].label;
      data.description = sectionsData[this.sectionType].description;
    }
    return data;
  }

  render() {
    const displayData = this.populateDisplayData();

    return (
      <div>
        <div id="page">
          <main id="main-content" className="content-full" tabIndex="0">
            <div className="contain-1120">
              <h2>{displayData.headline}</h2>
              <p>{displayData.description}</p>
              <form className="web-form">
                <FilterInput />
              </form>
              <PhotoGrid items={this.state.items} sectionType={this.sectionType} />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default SetsPage;
