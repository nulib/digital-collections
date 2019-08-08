import React from 'react';
import { shallow } from 'enzyme';
import FeatureBoxSection from './FeatureBoxSection';

const items = [
  {
    description: 'Ima description',
    id: '124xyz',
    image: '<img src="images/picture.png" />',
    label: 'Item label'
  }
];

it('renders without crashing', () => {
  const wrapper = shallow(<FeatureBoxSection items={items} />);
  expect(wrapper).toHaveLength(1);
});

it('contains at least one FeatureBox component', () => {
  const wrapper = shallow(<FeatureBoxSection items={items} />);
  expect(wrapper.find('FeatureBox')).toHaveLength(1);
});
