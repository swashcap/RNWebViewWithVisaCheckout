// https://developer.visa.com/capabilities/visa_checkout/docs#adding_visa_checkout_to_your_web_page
function onVisaCheckoutReady() {
  V.init({
    apikey: window.__VISA_CHECKOUT_API_KEY,
    paymentRequest: {
      currencyCode: "USD",
      subtotal: 10,
    }
  });
  V.on("payment.success", function(payment) {
    console.log(payment);
  });
  V.on("payment.cancel", function(payment) {
    console.log(payment);
  });
  V.on("payment.error", function(payment, error) {
    console.error(error);
    console.log(payment);
  });
}
