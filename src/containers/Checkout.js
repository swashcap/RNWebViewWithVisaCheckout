// @flow
import React from 'react';
import {connect} from 'react-redux';
import {NativeModules, WebView} from 'react-native';
import type {CartState} from '../reducers/cart';

const {
  RNWebViewWithVisaCheckout: {VISA_API_KEY},
} = NativeModules;

type Props = {
  total: number,
};

class Checkout extends React.Component<Props> {
  static navigationOptions = {
    title: 'Checkout',
  };

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.total !== this.props.total;
  }

  getHTML = () => {
    const {total} = this.props;

    return `<!doctype>
<html>
<head>
  <meta charset="utf-8">
  <title>Checkout</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <script type="text/javascript">
    // https://developer.visa.com/capabilities/visa_checkout/docs#adding_visa_checkout_to_your_web_page
    function onVisaCheckoutReady (){
      V.init({
        apikey: ${VISA_API_KEY}
        paymentRequest: {
          currencyCode: "USD",
          subtotal: "${total}"
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
  </script>
</head>
<body>
  <img alt="Visa Checkout" class="v-button" role="button"
    src="https://sandbox.secure.checkout.visa.com/wallet-services-web/xo/button.png"/>
  <script type="text/javascript" src="https://sandbox-assets.secure.checkout.visa.com/checkout-widget/resources/js/integration/v1/sdk.js"></script>
</body>
</html>`;
  };

  render() {
    return (
      <WebView
        originWhitelist={['*']}
        scalesPageToFit={false}
        source={{html: this.getHTML()}}
      />
    );
  }
}

export default connect(({cart: {total}}) => ({total}))(Checkout);
