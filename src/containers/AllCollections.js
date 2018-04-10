import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
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
    return (
      <div>
        <Breadcrumbs items={breadcrumbItems} />
        <div className="contain-1120">
          <h2>All Collections</h2>
        </div>

        {/* TODO: Wire this up to a component */}
        <div className="photo-grid contain-1120">
          <article aria-labelledby="grid1" className="photo-box">
            <a>
              <img
                alt="Digital Collections Library"
                src="https://images.northwestern.edu/image-service/inu-dil-adfa7c65-6067-4326-9f41-e2b3328aee29/square/,250/0/default.jpg"
              />
            </a>
            <h4 id="grid1">
              <Link to="/">Digital Image Library</Link>
            </h4>
            <div className="item-count">143 Items</div>
          </article>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  collections: state.collections
});

export default connect(mapStateToProps)(AllCollections);
