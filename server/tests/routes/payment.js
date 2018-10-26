// @flow
const sinon = require('sinon');
const test = require('tape');

const {getEncryptedData} = require('../helpers.js');
const visa = require('../../src/utils/visa.js');
const payment = require('../../src/routes/payment.js');

test('payment POST body errors', t => {
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

test('payment POST decrypt error', t => {
  t.plan(2);

  const body = {
    callId: 'callId',
    encKey: 'encKey',
    encPaymentData: 'encPaymentData',
    paymentMethodType: 'paymentMethodType',
  };
  const spy = sinon.spy();
  const stub = sinon.stub(visa, 'decryptVisa');

  stub.onCall(0).throws();

  payment.post({
    request: {
      body,
    },
    throw: spy,
  });

  t.equal(stub.callCount, 1);
  t.equal(spy.args[0][0], 500);

  stub.restore();
});

test('payment POST', t => {
  t.plan(3);

  const iv = Buffer.alloc(16, 'a');
  const key = 'secretsss';
  const paymentData = {
    payment: 'data',
  };
  const body = {
    callId: 'callId',
    encKey: getEncryptedData(key, '', iv),
    encPaymentData: getEncryptedData(JSON.stringify(paymentData), key, iv),
    paymentMethodType: 'paymentMethodType',
  };
  const visaCallIds = {};
  const setBody = sinon.spy();
  const setStatus = sinon.spy();

  payment.post({
    set body(val) {
      setBody(val);
      return val;
    },
    set status(val) {
      setStatus(val);
      return val;
    },
    request: {body},
    visaCallIds,
  });

  t.equal(setBody.args[0][0], 'callId');
  t.equal(setStatus.args[0][0], 201, 'returns 201 status code');
  t.deepEqual(
    visaCallIds,
    {
      callId: {
        paymentData,
        paymentMethodType: 'paymentMethodType',
      },
    },
    'adds callId to memory storage'
  );
});
