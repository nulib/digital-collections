import React from 'react';
import PhotoBox from './PhotoBox';
import { shallow } from 'enzyme';
import { IMAGE_MODEL, COLLECTION_MODEL } from '../services/global-vars';

let props = {
  hideDescriptions: false,
  item: {
    description: 'Im a description',
    id: 'abc1243',
    imageUrl: '<img src="/image.jpg" />',
    label: 'Ima label',
    type: IMAGE_MODEL
  }
};

it('renders without crashing', () => {
  const wrapper = shallow(<PhotoBox {...props} />);
  expect(wrapper).toHaveLength(1);
});

it('renders the proper Northwestern UI Photo Box markup', () => {
  const wrapper = shallow(<PhotoBox {...props} />);
  expect(wrapper.find('article.photo-box')).toHaveLength(1);
});

it('hides the description when expected', () => {
  const wrapper = shallow(<PhotoBox {...props} />);
  expect(wrapper.contains(<p>Im a description</p>)).toBeTruthy();

  props.hideDescriptions = true;
  const wrapperNoDescription = shallow(<PhotoBox {...props} />);
  expect(wrapperNoDescription.contains(<p>Im a description</p>)).toBeFalsy();
});
