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

  beforeEach(() => {
    wrapper = shallow(
      <HomePage
        carousels={initialState}
        fetchCarouselItems={mockFetchCarouselItems}
      />
    );
  });

  afterEach(() => {
    mockFetchCarouselItems.mockClear();
  });

  it('should attempt to display custom defined carousels', () => {
    const carouselsByKeyword = wrapper.instance().carouselsByKeyword;
    expect(carouselsByKeyword).toBeTruthy();
    expect(carouselsByKeyword.length).toBeGreaterThanOrEqual(1);
  });

  it('should call fetchCarouselItems() actionCreator mapped to props, the correct amount of times', () => {
    // Assume Home component is always calling fetchCarouselItems at least twice
    // for recently digitized items, and recently digitized collections.
    const defaultCallCount = 2;

    // ... and then more depending on how many 'dynamic' carousels are defined in Home component.
    const dynamicCarouselLength =
      wrapper.instance().carouselsByKeyword.length || 0;
    const expectedCallCount = dynamicCarouselLength + defaultCallCount;
    expect(mockFetchCarouselItems.mock.calls.length).toBe(expectedCallCount);
  });

  it('should render HeroSection', () => {
    expect(wrapper.find(HeroSection)).toHaveLength(1);
  });

  it('should render HeroSecondarySection', () => {
    expect(wrapper.find(HeroSecondarySection)).toHaveLength(1);
  });

  it('should render a CarouselSection(s)', () => {
    expect(wrapper.find(CarouselSection).length).toBeGreaterThanOrEqual(1);
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
  });
});
