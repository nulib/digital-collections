import React from 'react';
import { shallow } from 'enzyme';
import Layout from './Layout';
import Header from '../components/Header';
import Nav from '../components/Nav';
import GlobalSearchContainer from '../containers/GlobalSearchContainer';
import { Switch, Route } from 'react-router-dom';

it('renders without crashing', () => {
  shallow(<Layout />);
});

describe('Layout Component', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<Layout />);
  });

  xit('renders Header component', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  xit('renders Nav component', () => {
    expect(wrapper.find(Nav)).toHaveLength(1);
  });

  xit('renders GlobalSearch component', () => {
    expect(wrapper.find(GlobalSearch)).toHaveLength(1);
  });

  xit('renders Switch routing component', () => {
    expect(wrapper.find(Switch)).toHaveLength(1);
  });

  it('renders Route routing components', () => {
    expect(wrapper.find(Route).length).toBeGreaterThanOrEqual(1);
  });
});
