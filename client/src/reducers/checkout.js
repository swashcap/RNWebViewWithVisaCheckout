// @flow
import {CHECKOUT_SET_CALL_ID} from '../actions/checkout';
import type {CheckoutAction} from '../actions/checkout';

export type CheckoutState = {
  callId: string,
};

const INITIAL_STATE = {
  callId: '',
};

const reducer = (
  state: CheckoutState = INITIAL_STATE,
  action: CheckoutAction
): CheckoutState => {
  if (action.type === CHECKOUT_SET_CALL_ID) {
    return {
      callId: action.payload.callId,
    };
  }

  return state;
};

export default reducer;
