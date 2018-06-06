import React from 'react';
import { shallow } from 'enzyme';
import CrumbLink from './CrumbLink';

const crumb = {
  title: 'Grandparent',
  link: '/grandparent'
};

it('renders without crashing', () => {
  const wrapper = shallow(<CrumbLink item={crumb} />);
  expect(wrapper).toHaveLength(1);
});

it('renders the proper title and link', () => {
  const wrapper = shallow(<CrumbLink item={crumb} />);
  expect(wrapper.prop('to')).toEqual('/grandparent');
  expect(wrapper.childAt(0).text()).toEqual('Grandparent');
});
