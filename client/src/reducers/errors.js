// @flow
import uniqueId from 'lodash/uniqueId';
import {ERRORS_ADD_MESSAGE, ERRORS_CLEAR_MESSAGES} from '../actions/errors';
import type {ErrorsAction} from '../actions/errors';

export type ErrorItem = {
  message: string,
  time: Date,
};

export type ErrorsState = {
  [string]: ErrorItem,
};

const INITIAL_STATE = {};

export default (
  state: ErrorsState = INITIAL_STATE,
  action: ErrorsAction
): ErrorsState => {
  const {payload, type} = action;

  if (type === ERRORS_ADD_MESSAGE) {
    return {
      ...state,
      [uniqueId()]: payload,
    };
  } else if (type === ERRORS_CLEAR_MESSAGES) {
    return {};
  }

  return state;
};
