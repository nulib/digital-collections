import React from 'react';
import { shallow } from 'enzyme';
import Layout from './Layout';
import Header from '../components/Header';
import Nav from '../components/Nav';
import GlobalSearch from '../components/GlobalSearch';
import { Switch, Route } from 'react-router-dom';

it('renders without crashing', () => {
  shallow(<Layout />);
});

it('renders Header component', () => {
  const wrapper = shallow(<Layout />);
  expect(wrapper.find(Header)).toHaveLength(1);
});

it('renders Nav component', () => {
  const wrapper = shallow(<Layout />);
  expect(wrapper.find(Nav)).toHaveLength(1);
});

it('renders GlobalSearch component', () => {
  const wrapper = shallow(<Layout />);
  expect(wrapper.find(GlobalSearch)).toHaveLength(1);
});

it('renders the <main> html element', () => {
  const wrapper = shallow(<Layout />);
  expect(wrapper.find('main#main-content')).toHaveLength(1);
});

it('renders Switch routing component', () => {
  const wrapper = shallow(<Layout />);
  expect(wrapper.find(Switch)).toHaveLength(1);
});

it('renders Route routing components', () => {
  const wrapper = shallow(<Layout />);
  expect(wrapper.find(Route).length).toBeGreaterThanOrEqual(1);
});
