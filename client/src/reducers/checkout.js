// @flow
import {CHECKOUT_SET_CALL_ID} from '../actions/checkout';
import type {CheckoutAction} from '../actions/checkout';

export type CheckoutState = string;

const reducer = (
  state: CheckoutState = '',
  action: CheckoutAction
): CheckoutState => {
  if (action.type === CHECKOUT_SET_CALL_ID) {
    return action.payload.callId;
  }

  return state;
};

export default reducer;
