// @flow
const crypto = require('crypto');

const SHARED_SECRET = process.env.VISA_CHECKOUT_SHARED_SECRET || '';

const getHmac = (value /*: string|Buffer */, key /*: string */) /*: Buffer */ =>
  crypto
    .createHmac('sha256', key)
    .update(value)
    .digest();

const hash = (value /*: string|Buffer */) /*: Buffer */ =>
  crypto
    .createHash('sha256')
    .update(value)
    .digest();

const decrypt = (encrypted /*: string */, key /*: string */) /*: Buffer */ => {
  const buf = Buffer.from(encrypted, 'base64');

  if (buf.length < 48) {
    throw new Error('Encrypted data is too short');
  }

  const hmac = buf.slice(0, 32);

  if (!hmac.equals(getHmac(buf.slice(48), key))) {
    throw new Error('Encrypted data mismatch');
  }

  const decipher = crypto.createDecipheriv(
    'AES-256-CBC',
    hash(key),
    buf.slice(32, 48) // iv
  );

  return Buffer.concat([decipher.update(buf.slice(48)), decipher.final()]);
};

const decryptVisa = (
  encKey /*: string */,
  encPaymentData /*: string */
) /*: Object */ => {
  const decryptedKey = decrypt(encKey, SHARED_SECRET).toString('utf8');
  return JSON.parse(decrypt(encPaymentData, decryptedKey).toString('utf8'));
};

module.exports = {
  decrypt,
  decryptVisa,
  getHmac,
  hash,
};
