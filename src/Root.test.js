import React from 'react';
import { shallow } from 'enzyme';
import Root from './Root';

it('renders without crashing', () => {
  shallow(<Root />);
});
