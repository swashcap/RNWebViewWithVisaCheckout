// @flow
import type {ErrorItem} from '../reducers/errors';

type ErrorsAddMessageAction = {|
  payload: ErrorItem,
  type: 'ERRORS_ADD_MESSAGE',
|};

export const ERRORS_ADD_MESSAGE = 'ERRORS_ADD_MESSAGE';

export const addMessage = (message: string): ErrorsAddMessageAction => ({
  payload: {
    message,
    time: new Date(),
  },
  type: ERRORS_ADD_MESSAGE,
});

type ErrorsClearMessagesAction = {|
  payload: void,
  type: 'ERRORS_CLEAR_MESSAGES',
|};

export const ERRORS_CLEAR_MESSAGES = 'ERRORS_CLEAR_MESSAGES';

export const clearMessages = (): ErrorsClearMessagesAction => ({
  payload: undefined,
  type: ERRORS_CLEAR_MESSAGES,
});

export type ErrorsAction = ErrorsAddMessageAction | ErrorsClearMessagesAction;
