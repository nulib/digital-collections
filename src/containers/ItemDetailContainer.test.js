jest.mock('../api/elasticsearch-api.js');

import React from 'react';
import { shallow } from 'enzyme';
import ConnectedItemDetailContainer, {
  ItemDetailContainer
} from './ItemDetailContainer';
import * as elasticsearchApi from '../api/elasticsearch-api.js';

const mockReactRouterProps = {
  match: {
    params: {
      id: '5cd66892-6e63-4476-bd3e-f295355d0302'
    }
  }
};

it('renders without crashing', () => {
  const wrapper = shallow(<ConnectedItemDetailContainer />);
  expect(wrapper).toBeTruthy();
});

it('sets an error state in componentDidMount() when no item id is present in the url', () => {
  const wrapper = shallow(<ItemDetailContainer match={{ params: {} }} />);
  expect(wrapper.state('error')).toEqual('Missing id in query param');
});

it('creates default breadCrumbData, and additional breadCrumbData when another item is passed in', () => {
  const wrapper = shallow(<ItemDetailContainer match={{ params: {} }} />);
  const instance = wrapper.instance();
  let defaultCrumbs = [{ title: 'Items', link: '/search' }];
  const item = { title: { primary: ['This is the primary title'] } };

  expect(instance.createBreadcrumbData()).toEqual(defaultCrumbs);
  expect(instance.createBreadcrumbData(item)).toHaveLength(2);
});

xit('fetches item data from the api and sets the item on component state', async () => {
  // Just so we can read state in the test
  const wrapper = shallow(
    <ItemDetailContainer match={mockReactRouterProps.match} />
  );

  expect.assertions(4);

  // Mock all async network requests within the container component
  const data = await elasticsearchApi.getItem(
    '5cd66892-6e63-4476-bd3e-f295355d0302'
  );
  const data2 = await elasticsearchApi.getAdminSetItems(
    '5cd66892-6e63-4476-bd3e-f295355d0302'
  );
  const data3 = await elasticsearchApi.getCollectionItems(
    '5cd66892-6e63-4476-bd3e-f295355d0302'
  );

  // Get derived state after all mocked network requests
  let wrapperState = wrapper.state();
  console.log('wrapperState', wrapperState);

  expect(wrapperState).toHaveProperty('error');
  expect(wrapperState).toHaveProperty('collectionItems');
  expect(wrapperState).toHaveProperty('adminSetItems');
  expect(wrapperState).toHaveProperty(
    'id',
    '5cd66892-6e63-4476-bd3e-f295355d0302'
  );
  expect(wrapperState).toHaveProperty(
    'item.admin_set.id',
    'c162a37d-00d1-4510-a8bf-06778e43a567'
  );
});
