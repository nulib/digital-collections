import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PhotoGrid from '../../components/PhotoGrid';
import SetsApi from '../../api/sets-api';

class LandingPageSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }

    // initialize the Sets API Class
    this.setsApi = new SetsApi();
  }

  componentDidMount() {
    // Grab REST API data here
    const items = this.setsApi.getAllSets(this.props.sectionType.name);
    this.setState({
      items: items,
      isLoaded: true
    });
  }

  render() {
    const { error, isLoaded, items } = this.state;
    const label = this.props.sectionType.label;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>{'Loading...'}</div>;
    } else {
      return (
        <section>
          <div className="section-top contain-970">
            <h3>Explore {label}</h3>
            <p><Link to={`/sets/${this.props.sectionType.name}`}>View All {label}</Link></p>
            <p>{this.props.sectionType.description}</p>
          </div>
          <PhotoGrid
            items={items}
            linkPrefix={`/sets/${this.props.sectionType.name}`}
            />
        </section>
      );
    }
  }
}

export default LandingPageSection;
