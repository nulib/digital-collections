jest.mock('../api/index.js');

import React from 'react';
import { shallow } from 'enzyme';
import ItemDetailContainer from './ItemDetailContainer';
import * as api from '../api';

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
  const item = { title_tesim: ['Second Item'] };

  expect(instance.createBreadcrumbData()).toEqual(defaultCrumbs);
  expect(instance.createBreadcrumbData(item)).toHaveLength(2);
});

it('fetches item data from solr and sets the item on component state', async () => {
  // Just so we can read state in the test
  const wrapper = shallow(
    <ItemDetailContainer.WrappedComponent match={mockReactRouterProps.match} />
  );
  const expectedState = {
    error: null,
    item: {
      id: '5cd66892-6e63-4476-bd3e-f295355d0302',
      title_tesim: ['Berkeley Image 4']
    }
  };

  expect.assertions(1);
  const data = await api.getItem('5cd66892-6e63-4476-bd3e-f295355d0302');
  expect(wrapper.state()).toEqual(expectedState);
});
