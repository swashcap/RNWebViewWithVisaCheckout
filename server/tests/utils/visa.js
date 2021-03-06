// @flow
const crypto = require('crypto');
const test = require('tape');

const {getEncryptedData} = require('../helpers.js');
const visa = require('../../src/utils/visa.js');

test('hash', t => {
  t.plan(1);

  t.equal(
    visa.hash('sample text').toString('hex'),
    'bc658c641ef71739fb9995bded59b21150bbff4367f6e4e4c7934b489b9d2c00',
    'computes sha256 hash'
  );
});

test('hmac', t => {
  t.plan(1);

  t.equal(
    visa.getHmac('sample text', 'key').toString('hex'),
    '356c355726fab59813a7fccc4a4c8b4bd9d2fcf700500f0d2447c56d174275ad',
    'computes sha256 HMAC'
  );
});

test('decrypt', t => {
  t.plan(3);

  t.throws(
    () => visa.decrypt('this is too short', 'key'),
    /too short/,
    'throws when message is too short'
  );
  t.throws(
    () =>
      visa.decrypt(
        'MzU2YzM1NTcyNmZhYjU5ODEzYTdmY2NjNGE0YzhiNGJkOWQyZmNmNzAwNTAwZjBkMjQ0N2M1NmQxNzQyNzVhZAo=',
        'bad key'
      ),
    /mismatch/,
    "throws when HMACs don't match"
  );

  const data = '{"greetings": "hello"}';
  const key = 'key';
  const iv = Buffer.alloc(16).fill('0');

  t.equal(
    visa.decrypt(getEncryptedData(data, key, iv), key).toString('utf8'),
    data
  );
});

test('decryptVisa', t => {
  t.plan(1);

  const data = {
    hello: 'hi',
  };
  const key = 'my secret key';
  const iv = Buffer.alloc(16).fill('1');

  t.deepEqual(
    visa.decryptVisa(
      getEncryptedData(key, process.env.VISA_CHECKOUT_SHARED_SECRET || '', iv),
      getEncryptedData(JSON.stringify(data), key, iv)
    ),
    data,
    'decrypts visa payload data'
  );
});
