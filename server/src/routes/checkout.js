// @flow

const VISA_CHECKOUT_API_KEY = process.env.VISA_CHECKOUT_API_KEY;
const roundPrice = (value /*: number */) /*: number */ =>
  Math.round(value * 100) / 100;
const formatPrice = (value /*: number */) /*: string */ =>
  `$${roundPrice(value).toFixed(2)}`;

module.exports = async (ctx /*: any */) => {
  const shipping = 5;
  let subtotal = 0;

  if (ctx.query.subtotal) {
    const parsed = parseFloat(ctx.query.subtotal);

    if (!Number.isNaN(parsed)) {
      subtotal = parsed;
    }
  }

  const taxes = (subtotal + shipping) * 0.0875;
  const total = subtotal + shipping + taxes;

  await ctx.render('checkout', {
    display: {
      shipping: formatPrice(shipping),
      subtotal: formatPrice(subtotal),
      taxes: formatPrice(taxes),
      total: formatPrice(total),
    },
    total: roundPrice(total),
    VISA_CHECKOUT_API_KEY,
  });
};
