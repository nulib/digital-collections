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
    // Grab REST API data here
    this.setsApi.getSetItems(this.id).then((data) => {
      this.setState({
        items: data.response.docs,
        isLoaded: true
      });
    });
  }

  render() {
    // TODO: Fix this
    // Get set information
    // this.set = this.setsApi.getSet(this.sectionType, this.id);
    // console.log('set', this.set);

    return (
      <div>
        <div id="page" className="sets-page">
          <main id="main-content" className="content-full" tabIndex="0">
            <div className="contain-1120">
              <h2>Set title here</h2>
              <p>Set description here</p>
              <form className="web-form">
                <FilterInput filterName="Set label here" />
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
