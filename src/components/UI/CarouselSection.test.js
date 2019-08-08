import React from 'react';
import { shallow } from 'enzyme';
import CarouselSection from './CarouselSection';
import Carousel from './Carousel';
import ErrorSection from './ErrorSection';

let wrapper;
const sectionTitle = 'Carousel Items Title';

beforeEach(() => {
  wrapper = shallow(
    <CarouselSection
      linkTo=""
      sectionTitle={sectionTitle}
      items={[]}
      slidesPerView={4}
      error={false}
    />
  );
});

it('renders without crashing', () => {
  expect(wrapper.length).toEqual(1);
});

it('should render a single <Carousel /> component', () => {
  expect(wrapper.find(Carousel)).toHaveLength(1);
});

it('should render an <ErrorSection /> component if an error object is present', () => {
  expect(wrapper.find(ErrorSection)).toHaveLength(0);

  wrapper.setProps({ error: { statusText: 'error' } });
  expect(wrapper.find(ErrorSection)).toHaveLength(1);
});

it('should render a section title', () => {
  expect(wrapper.find('h4').text()).toContain(sectionTitle);
});
