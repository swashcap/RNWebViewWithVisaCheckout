// @flow

import {setCallId} from '../../actions/checkout';
import reducer from '../checkout';

test('set callId', () => {
  const callId = 'sample-call-id';
  expect(reducer('', setCallId(callId))).toBe(callId);
});
