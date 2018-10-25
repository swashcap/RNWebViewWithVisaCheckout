// @flow
const sinon = require('sinon');
const test = require('tape');
const payment = require('../../src/routes/payment');

test('payment POST errors', t => {
  t.plan(2);

  const spy = sinon.spy();
  const post = body =>
    payment.post({
      request: {body},
      throw: spy,
    });

  post({});
  post({callId: 'callId'});
  post({
    callId: 'callId',
    encKey: 'encKey',
  });
  post({
    callId: 'callId',
    encKey: 'encKey',
    encPaymentData: 'encPaymentData',
  });

  t.equal(spy.callCount, 4);
  t.equal(spy.args[0][0], 400);
});
