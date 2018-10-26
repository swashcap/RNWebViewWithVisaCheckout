// @flow

const visa = require('../utils/visa.js');

/*::
type VisaRequestBody = {
  callId?: ?string,
  encKey?: ?string,
  encPaymentData?: ?string,
  paymentMethodType?: ?string,
};
*/

/**
 * This route expects to receive a successful payment response from Visa's
 * Checkout API.
 *
 * {@link  https://developer.visa.com/images2/products/visa_checkout/VisaCheckoutMerchantDocs.zip}
 */
const post = (ctx /*: any */) => {
  const body /*: VisaRequestBody */ = ctx.request.body;

  if (
    !body.callId ||
    typeof body.callId !== 'string' ||
    !body.encKey ||
    typeof body.encKey !== 'string' ||
    !body.encPaymentData ||
    typeof body.encPaymentData !== 'string' ||
    !body.paymentMethodType
  ) {
    ctx.throw(400);
  } else {
    try {
      const {callId, encKey, encPaymentData, paymentMethodType} = body;
      const paymentData = visa.decryptVisa(encKey, encPaymentData);

      // This assumes `callId` is unique
      ctx.visaCallIds[callId] = {
        paymentData,
        paymentMethodType,
      };

      // TODO: Ensure body.callId is safe to return
      ctx.body = body.callId;
      ctx.status = 201;
    } catch (error) {
      if (process.env.NODE_ENV !== 'test') {
        console.error(error);
      }
      ctx.throw(500);
    }
  }
};

module.exports = {post};
