import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PhotoGrid from '../../components/PhotoGrid';
import * as setsApi from '../../api/sets-api';

class LandingPageSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }

  componentDidMount() {
    // Grab REST API data here

    // Grab collections
    if (this.props.sectionType.name === 'collection') {
      this.setState({
        items: setsApi.getCollections()
      });
    }

    // Grab creators
    if (this.props.sectionType.name === 'creator') {
      this.setState({
        items: setsApi.getCreators()
      });
    }

    // Grab subjects
    if (this.props.sectionType.name === 'subject') {
      this.setState({
        items: setsApi.getSubjects()
      });
    }

    // Grab work types
    if (this.props.sectionType.name === 'workType') {
      this.setState({
        items: setsApi.getWorkTypes()
      });
    }

    this.setState({
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
            <p><Link to={`/sets/${this.props.sectionType.name}`}>View All {label}s</Link></p>
            <p>{this.props.sectionType.description}</p>
          </div>
          <PhotoGrid items={this.state.items} />
        </section>
      );
    }
  }
}

export default LandingPageSection;
