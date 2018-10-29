// @flow
import 'react-native';
import * as React from 'react';
import TestRenderer from 'react-test-renderer';

import Address from '../Address';

test('renders correctly', () => {
  const testRenderer = TestRenderer.create(
    <Address
      name="Bob Bob"
      line1="1234 Main Street"
      city="Anytown"
      state="DC"
      country="USA"
      postalCode="10001"
    />
  );
  expect(testRenderer).toMatchSnapshot();
});
