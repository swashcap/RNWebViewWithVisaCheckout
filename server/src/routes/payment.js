// @flow

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
    !body.encKey ||
    !body.encPaymentData ||
    !body.paymentMethodType
  ) {
    ctx.throw(400);
  } else {
    return 'okay';
  }
};

module.exports = {post};
