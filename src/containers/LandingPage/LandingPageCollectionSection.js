import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PhotoGrid from '../../components/PhotoGrid';
import CollectionsApi from '../../api/collections-api';

class LandingPageCollectionSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      collections: []
    }

    // initialize the Sets API Class
    this.CollectionsApi = new CollectionsApi();
  }

  componentDidMount() {
    // Grab REST API data here
    this.CollectionsApi.getAllCollections().then((data) => {
      this.setState({
        collections: data.response.docs,
        isLoaded: true
      });
    });
  }

  render() {
    const { error, isLoaded, collections } = this.state;
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
            <p><Link to={`/collections`}>View All {label}</Link></p>
            <p>{this.props.sectionType.description}</p>
          </div>
          <PhotoGrid
            items={collections}
            linkPrefix={`/collections`}
            />
        </section>
      );
    }
  }
}

export default LandingPageCollectionSection;
