import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ErrorSection from '../../components/ErrorSection';
import PhotoGrid from '../../components/PhotoGrid';
import CollectionsApi from '../../api/collections-api';
import SetsApi from '../../api/sets-api';

class LandingPageSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }

    // initialize API request wrappers
    this.setsApi = new SetsApi();
    this.collectionsApi = new CollectionsApi();
  }

  componentDidMount() {
    // Grab REST API data here
    // Collections
    if (this.props.sectionType.name === 'collections') {
      this.collectionsApi.getAllCollections().then(this.updateApiState.bind(this));
    } // All other Sets
    else {
      this.setsApi.getAllSets(this.props.sectionType.name).then(this.updateApiState.bind(this));
    }
  }

  updateApiState(data) {
    if (data.error) {
      this.setState({ error: data.error });
    } else {
      this.setState({
        items: data.response.docs,
        isLoaded: true
      });
    }
  }

  render() {
    const { error, isLoaded, items } = this.state;
    const label = this.props.sectionType.label;
    const linkPrefix = `/${this.props.sectionType.name}`;

    if (error) {
      return <ErrorSection error={error} />;
    } else if (!isLoaded) {
      return <div>{'Loading...'}</div>;
    } else {
      return (
        <section>
          <div className="section-top contain-970">
            <h3>Explore {label}</h3>
            <p><Link to={linkPrefix}>View All {label}</Link></p>
            <p>{this.props.sectionType.description}</p>
          </div>
          <PhotoGrid
            additionalClasses="contain-1120 full-images"
            items={items}
            linkPrefix={linkPrefix}
            />
        </section>
      );
    }
  }
}

export default LandingPageSection;
