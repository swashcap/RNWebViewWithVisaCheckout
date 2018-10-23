// @flow
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import type {NavigationScreenProp} from 'react-navigation';

import PrimaryButton from '../components/PrimaryButton';

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 100,
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 17,
    marginBottom: 40,
    textAlign: 'center',
  },
});

type Props = {
  message: ?string,
  navigation: NavigationScreenProp<any>,
};

class Error extends React.Component<Props> {
  handlePress = () => {
    this.props.navigation.navigate('Cart');
  };

  render() {
    const {message} = this.props;
    const content = message ? message : 'An unknown error occurred';

    return (
      <View style={styles.container}>
        <Text style={styles.emoji}>😵</Text>
        <Text style={styles.message}>{content}</Text>
        <View style={styles.buttonWrapper}>
          <PrimaryButton onPress={this.handlePress}>
            Return to Cart
          </PrimaryButton>
        </View>
      </View>
    );
  }
}

export default connect()(Error);
