import React, { Component } from 'react';
import PhotoGrid from '../UI/PhotoGrid';
import PropTypes from 'prop-types';
import ThisItem from './ThisItem';
import SectionTop from '../UI/SectionTop';
import { facetValues } from '../../services/reactive-search';
import { getCollection } from '../../api/elasticsearch-api';
import { getESTitle } from '../../services/elasticsearch-parser';

class ParentCollections extends Component {
  state = {
    collectionTitle: ''
  };

  async componentDidMount() {
    let collection = await getCollection(this.props.collectionId);
    this.setState({ collectionTitle: getESTitle(collection._source) });
  }

  render() {
    const { collectionTitle } = this.state;
    const { adminSetItems, collectionId, collectionItems, item } = this.props;
    const adminSetTitle = item.admin_set ? item.admin_set.title[0] : '';

    return (
      <div>
        {item && adminSetItems && (
          <section className="section">
            <SectionTop
              sectionTitle="Library Department"
              optionalSubhead={adminSetTitle}
              optionalButtons={[
                {
                  label: 'View All Items in Library Department',
                  url: '/search',
                  state: {
                    facetValue: facetValues.LIBRARY_DEPARTMENT,
                    searchValue: adminSetTitle
                  }
                }
              ]}
            />
            <PhotoGrid items={adminSetItems} hideDescriptions={true} />
          </section>
        )}

        {item && collectionItems.length > 0 && (
          <section>
            <SectionTop
              sectionTitle="Collection"
              optionalSubhead={collectionTitle}
              optionalButtons={[
                {
                  label: 'View All Items in Collection',
                  url: `/collections/${collectionId}`
                }
              ]}
            />
            <PhotoGrid items={collectionItems} />
          </section>
        )}

        <ThisItem item={item} />
      </div>
    );
  }
}

ParentCollections.propTypes = {
  adminSetItems: PropTypes.array.isRequired,
  collectionId: PropTypes.string.isRequired,
  collectionItems: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired
};

export default ParentCollections;
