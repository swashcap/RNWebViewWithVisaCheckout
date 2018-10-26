// @flow

type CheckoutSetCallIdAction = {
  payload: {
    callId: string,
  },
  type: 'CHECKOUT_SET_CALL_ID',
};

export const CHECKOUT_SET_CALL_ID = 'CHECKOUT_SET_CALL_ID';

export const setCallId = (callId: string): CheckoutSetCallIdAction => ({
  payload: {
    callId,
  },
  type: CHECKOUT_SET_CALL_ID,
});

export type CheckoutAction = CheckoutSetCallIdAction;
