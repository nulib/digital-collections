import React, { Component } from 'react';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import PhotoGrid from '../components/PhotoGrid';
import { fetchCollections } from '../actions';
import { connect } from 'react-redux';

const breadcrumbItems = [
  { title: 'Collections', link: 'collections' },
  { title: 'All Collections', link: '/' }
];

class AllCollectionsContainer extends Component {
  componentDidMount() {
    document.body.className = 'landing-page';
    this.props.dispatch(fetchCollections());
  }

  render() {
    const items = this.props.collections.items || [];

    return (
      <div id="page" className="standard-margin">
        <main id="main-content" className="content" tabIndex="0">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="contain-1120">
            <h2>All Collections</h2>
          </div>
          <PhotoGrid items={items} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  collections: state.collections
});

export default connect(mapStateToProps)(AllCollectionsContainer);
