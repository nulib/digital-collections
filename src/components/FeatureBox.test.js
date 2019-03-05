import React from 'react';
import FeatureBox from './FeatureBox';
import { shallow } from 'enzyme';

const mockItemProp = {
  description: 'Ima description',
  id: '124xyz',
  image: '<img src="images/picture.png" />',
  label: 'Item label'
};

it('renders without crashing', () => {
  const wrapper = shallow(<FeatureBox item={mockItemProp} />);
  expect(wrapper.length).toEqual(1);
});

it('displays a proper NU feature box with correct NU classes', () => {
  const wrapper = shallow(<FeatureBox item={mockItemProp} />);
  expect(wrapper.find('article.feature-box')).toHaveLength(1);
  expect(wrapper.find('.feature-box img')).toHaveLength(1);
});

it('displays a link to the item route which contains model type and id', () => {
  let wrapper = shallow(
    <FeatureBox item={mockItemProp} modelType="collection" />
  );
  expect(wrapper.find('Link')).toHaveLength(1);
  expect(wrapper.find('Link').prop('to')).toContain('collection');
  expect(wrapper.find('Link').prop('to')).toContain(mockItemProp.id);
});
