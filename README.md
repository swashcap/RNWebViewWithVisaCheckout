# RNWebViewWithVisaCheckout

_Testing Visa’s Checkout SDK in a React Native WebView_

## Setup

Make sure you have:

* [Node.js](https://nodejs.org/en/) (>= 8.x.x)
* [yarn](https://yarnpkg.com/en/)
* [Xcode](https://developer.apple.com/xcode/) (>= 9)
* [Android Studio](https://developer.android.com/studio/) (>= 3.1)

### Visa

1. Sign up for a test account at [developer.visa.com](https://developer.visa.com)
2. Create a new project within the Visa developer dashboard with “Visa Checkout” enabled
3. Add the newly created project's API key as a `VISA_CHECKOUT_API_KEY` entry in _server/.env_:

    ```shell
    echo VISA_CHECKOUT_API_KEY=<your key> > server/.env
    ```

### Web Server

To test the Visa Checkout SDK properly the server must run on a real host:

> **Note:** The page you add a Visa Checkout button to must be hosted on a web server for the lightbox and JavaScript library to perform properly.

— [_Visa Checkout_ documentation](https://developer.visa.com/capabilities/visa_checkout/docs#adding_visa_checkout_to_your_web_page)

To make this work for local development, the server should run on a test domain, `dev.walmart.com`. Add this entry to `/etc/hosts`:

```
127.0.0.1       dev.walmart.com
```

### Dependencies

Use [yarn](https://yarnpkg.com/en/) to install dependencies:

```shell
yarn install # root dependencies
yarn install --cwd "$PWD/client" # client dependencies
yarn install --cwd "$PWD/server" # server dependencies
```

## Running

Running the project requires both a server and client:

* **Server**: run `yarn start` in _server/_
* **Client**:
    * run `yarn start` in _client/_ to start the react-native packager
    * run `yarn run react-native run-ios` in _client/_ to start and build for the iOS simulator
    * run `yarn run react-native run-andriod` in _client/_ to start and build for the Android emulator