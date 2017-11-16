import React, {Component} from 'react';
import FilterInput from '../../components/FilterInput';
import PhotoGrid from '../../components/PhotoGrid';
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
    // initialize the Sets API Class
    this.setsApi = new SetsApi();

    // Grab route params
    this.sectionType = props.match.params.sectionType;
  }

  componentDidMount() {
    document.body.className="landing-page";
    const items = this.setsApi.getAllSets(this.sectionType);
    this.setState({
      items: items,
      isLoaded: true
    });
  }

  render() {
    const headline = sectionsData[this.sectionType].label;
    const description = sectionsData[this.sectionType].description;

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
              <PhotoGrid items={this.state.items} sectionType={this.sectionType} />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default SetsPage;
