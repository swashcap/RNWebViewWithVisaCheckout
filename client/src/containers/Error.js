// @flow
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import type {Dispatch} from 'redux';
import map from 'lodash/map';
import type {NavigationScreenProp} from 'react-navigation';

import {clearMessages} from '../actions/errors';
import type {ErrorsState} from '../reducers/errors';
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
    marginBottom: 10,
    textAlign: 'center',
  },
  messagesWrapper: {
    marginBottom: 30
  }
});

type Props = {
  dispatch: Dispatch<any>,
  errors: ErrorsState,
  navigation: NavigationScreenProp<any>,
};

class Error extends React.Component<Props> {
  handlePress = () => {
    const {dispatch, navigation} = this.props;

    dispatch(clearMessages());
    navigation.navigate('Cart');
  };

  renderMessages = () => {
    const {errors} = this.props;

    if (!Object.keys(errors).length) {
      return <Text style={styles.message}>An unknown error occurred</Text>
    }

    return (
      <React.Fragment>
        {map(errors, ({message}, key) => (
          <Text key={key} style={styles.message}>{message}</Text>
        ))}
      </React.Fragment>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.emoji}>😵</Text>
        <View style={styles.messagesWrapper}>
          {this.renderMessages()}
        </View>
        <View style={styles.buttonWrapper}>
          <PrimaryButton onPress={this.handlePress}>
            Return to Cart
          </PrimaryButton>
        </View>
      </View>
    );
  }
}

export default connect(({ errors }) => ({ errors }))(Error);
