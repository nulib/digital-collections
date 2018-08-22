jest.mock('../api/elasticsearch-api.js');

import React from 'react';
import { shallow } from 'enzyme';
import ItemDetailContainer from './ItemDetailContainer';
import * as elasticsearchApi from '../api/elasticsearch-api.js';

const mockReactRouterProps = {
  match: {
    params: {
      id: '5cd66892-6e63-4476-bd3e-f295355d0302'
    }
  }
};

it('renders without crashing', () => {
  const wrapper = shallow(<ItemDetailContainer />);
  expect(wrapper).toBeTruthy();
});

it('sets an error state in componentDidMount() when no item id is present in the url', () => {
  const wrapper = shallow(
    <ItemDetailContainer.WrappedComponent match={{ params: {} }} />
  );
  expect(wrapper.state('error')).not.toBeNull();
});

it('creates default breadCrumbData, and additional breadCrumbData when another item is passed in', () => {
  const wrapper = shallow(
    <ItemDetailContainer.WrappedComponent match={{ params: {} }} />
  );
  const instance = wrapper.instance();
  let defaultCrumbs = [{ title: 'Items', link: '/items' }];
  const item = { title: { primary: ['This is the primary title'] } };

  expect(instance.createBreadcrumbData()).toEqual(defaultCrumbs);
  expect(instance.createBreadcrumbData(item)).toHaveLength(2);
});

it('fetches item data from the api and sets the item on component state', async () => {
  // Just so we can read state in the test
  const wrapper = shallow(
    <ItemDetailContainer.WrappedComponent match={mockReactRouterProps.match} />
  );
  const expectedState = {
    adminSetItems: {},
    collectionItems: {},
    error: null,
    id: '5cd66892-6e63-4476-bd3e-f295355d0302',
    item: {
      title: {
        primary: ['This is the title']
      }
    }
  };

  expect.assertions(1);
  const data = await elasticsearchApi.getItem(
    '5cd66892-6e63-4476-bd3e-f295355d0302'
  );
  expect(wrapper.state()).toEqual(expectedState);
});
