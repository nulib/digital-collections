import React from 'react';
import { shallow } from 'enzyme';
import Breadcrumbs from './Breadcrumbs';

let items = [
  {
    title: 'Grandparent',
    link: '/grandparent'
  },
  {
    title: 'Parent',
    link: '/grandparent/parent'
  },
  {
    title: 'Child',
    link: '/grandparent/parent/:id'
  }
];

it('renders without crashing', () => {
  const wrapper = shallow(<Breadcrumbs items={items} />);
  expect(wrapper.length).toEqual(1);
});

it('should return an empty array if no items are passed in', () => {
  const wrapper = shallow(<Breadcrumbs />);
  expect(wrapper.find('#breadcrumbs')).toHaveLength(0);
});

it('should return three breadcrumbs when passed in three items', () => {
  const wrapper = shallow(<Breadcrumbs items={items} />);
  expect(wrapper.find('#breadcrumbs')).toHaveLength(1);
  expect(wrapper.find('#breadcrumbs').children()).toHaveLength(3);

  // Number of Crumblinks should be total items - 1
  expect(wrapper.find('CrumbLink')).toHaveLength(2);
  // There should only be one active link
  expect(wrapper.find('li[className="active"]')).toHaveLength(1);
});
