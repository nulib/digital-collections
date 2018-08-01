import React from 'react';
import { calculatedLink } from './helpers.js';

test('calculatedLink returns plain text if no url is passed in', () => {
  expect(JSON.stringify(calculatedLink('test label', 0))).toBe(
    JSON.stringify(<li key="test label">test label</li>)
  );
});
