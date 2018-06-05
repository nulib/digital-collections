import React, { Component } from 'react';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import PhotoGrid from '../components/PhotoGrid';
import { handleUpdateBodyClass, fetchCollections } from '../actions';
import { connect } from 'react-redux';

const breadcrumbItems = [
  { title: 'Collections', link: 'collections' },
  { title: 'All Collections', link: '/' }
];

class AllCollections extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(handleUpdateBodyClass('landing-page'));
  }

  componentDidMount() {
    this.props.dispatch(fetchCollections());
  }

  render() {
    const items = this.props.collections.items || [];

    return (
      <div>
        <Breadcrumbs items={breadcrumbItems} />
        <div className="contain-1120">
          <h2>All Collections</h2>
        </div>
        <PhotoGrid items={items} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  collections: state.collections
});

export default connect(mapStateToProps)(AllCollections);
