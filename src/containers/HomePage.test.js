import React from 'react';
import { shallow } from 'enzyme';
import ConnectedApp, { HomePage } from './HomePage';
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore();

import HeroSection from '../components/Home/HeroSection';
import HeroSecondarySection from '../components/Home/HeroSecondarySection';
import CarouselSection from '../components/CarouselSection';

const initialState = {
  carousels: {
    recentlyDigitizedItems: {
      items: [
        {
          title: 'Mock Title',
          url: 'https://test.com'
        }
      ]
    }
  }
};

describe('HomePage (not connected) Component', () => {
  let wrapper;
  const mockFetchCarouselItems = jest.fn();
  const mockHandleUpdateBodyClass = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <HomePage
        carousels={initialState}
        handleUpdateBodyClass={mockHandleUpdateBodyClass}
        fetchCarouselItems={mockFetchCarouselItems}
      />
    );
  });

  afterEach(() => {
    mockFetchCarouselItems.mockClear();
    mockHandleUpdateBodyClass.mockClear();
  });

  it('should call handleUpdateBodyClass() actionCreator mapped to props', () => {
    expect(mockHandleUpdateBodyClass.mock.calls.length).toBe(1);
  });

  it('should call fetchCarouselItems() actionCreator mapped to props', () => {
    expect(mockFetchCarouselItems.mock.calls.length).toBe(3);
  });

  it('should render HeroSection', () => {
    expect(wrapper.find(HeroSection)).toHaveLength(1);
  });

  it('should render HeroSecondarySection', () => {
    expect(wrapper.find(HeroSecondarySection)).toHaveLength(1);
  });

  it('should render three CarouselSections', () => {
    expect(wrapper.find(CarouselSection)).toHaveLength(3);
  });
});

describe('HomePage Container Component', () => {
  let wrapper, store;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedApp store={store} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders carousel from mapStatetoProps', () => {
    expect(wrapper.prop('carousels')).toBeDefined();
  });

  it('renders mapDispatchToProps props', () => {
    expect(wrapper.prop('fetchCarouselItems')).toBeDefined();
    expect(wrapper.prop('handleUpdateBodyClass')).toBeDefined();
  });
});
