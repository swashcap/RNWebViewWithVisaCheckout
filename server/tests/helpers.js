// @flow
const crypto = require('crypto');

module.exports.getEncryptedData = (
  data /*: string */,
  key /*: string */,
  iv /*: Buffer */
) /*: string */ => {
  const cipher = crypto.createCipheriv(
    'AES-256-CBC',
    crypto
      .createHash('sha256')
      .update(key)
      .digest(),
    iv
  );
  const encrypted = Buffer.concat([
    cipher.update(Buffer.from(data)),
    cipher.final(),
  ]);

  return Buffer.concat([
    crypto
      .createHmac('sha256', key)
      .update(encrypted)
      .digest(),
    iv,
    encrypted,
  ]).toString('base64');
};
