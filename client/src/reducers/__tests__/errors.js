// @flow
import values from 'lodash/values';
import {addMessage, clearMessages} from '../../actions/errors';
import reducer from '../errors';
import type {ErrorItem} from '../errors';

test('adds error message', () => {
  const message = 'hello, sample error message';
  const state = reducer({}, addMessage(message));
  const items = values(state);

  expect(Object.keys(state).length).toBe(1);
  expect(items[0].message).toBe(message);
  expect(items[0].time).toBeInstanceOf(Date);
});

test('clears error messages', () => {
  expect(
    reducer(
      {
        '0': {
          message: 'hello',
          time: new Date(),
        },
        '1': {
          message: 'hi',
          time: new Date(),
        },
      },
      clearMessages()
    )
  ).toEqual({});
});
