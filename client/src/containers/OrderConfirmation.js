// @flow
import * as React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import type {Dispatch} from 'redux';
import type {NavigationScreenProp} from 'react-navigation';

import Address from '../components/Address';
import Center from '../components/Center';
import PrimaryButton from '../components/PrimaryButton';
import type {CartItem as CartItemType, CartState} from '../reducers/cart';
import {API_BASE_URL} from '../utils/config';
import {addMessage} from '../actions/errors';
import {colorPrimary} from '../utils/colors';

const styles = StyleSheet.create({
  addressWrapper: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  buttonWrapper: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
  },
  image: {
    height: 80,
    margin: 10,
    width: 80,
  },
  imageWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 20,
    marginTop: 30,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});

type Props = {
  callId: string,
  cart: CartState,
  dispatch: Dispatch<any>,
  navigation: NavigationScreenProp<any>,
};

type State = {
  address: ?Object,
  isLoading: boolean,
};

class OrderConfirmation extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Order Confirmation',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      address: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    const {callId, dispatch, navigation} = this.props;

    this.setState({
      isLoading: true,
    });

    fetch(`${API_BASE_URL}/payments/${callId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `Order confirmation request failed: ${response.statusText ||
              response.status}`
          );
        }

        return response.json();
      })
      .then(response => {
        this.setState({
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        });
        dispatch(addMessage(error.message));
        navigation.navigate('Error');
      });
  }

  handlePress = () => {
    this.props.navigation.navigate('Cart');
  };

  renderAddress() {
    const {address, isLoading} = this.state;

    if (isLoading) {
      return (
        <Center style={styles.addressWrapper}>
          <ActivityIndicator size="small" color={colorPrimary} />
        </Center>
      );
    }
    if (address) {
      return (
        <View style={styles.addressWrapper}>
          <Address
            name={address.personName}
            line1={address.line1}
            line2={address.line2}
            city={address.city}
            state={address.stateProvinceCode}
            postalCode={address.postalCode}
            country={address.countryCode}
            phone={address.phone}
          />
        </View>
      );
    }
  }

  render() {
    const {cart} = this.props;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Thank you for your order</Text>
        <Text style={styles.text}>
          Your order will be shipped shortly: we will send you an email
          notification with more information.
        </Text>
        {this.renderAddress()}
        <View style={styles.imageWrapper}>
          {Object.keys(cart.items).map(key => {
            const item = cart.items[key];

            return (
              <View key={key}>
                <Image source={{uri: item.imageUri}} style={styles.image} />
              </View>
            );
          })}
        </View>
        <Center style={styles.buttonWrapper}>
          <PrimaryButton onPress={this.handlePress}>
            Return to Cart
          </PrimaryButton>
        </Center>
      </ScrollView>
    );
  }
}

export default connect(({cart, checkout: {callId}}) => ({cart, callId}))(
  OrderConfirmation
);
