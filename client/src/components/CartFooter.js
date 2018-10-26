// @flow
import * as React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import PrimaryButton from './PrimaryButton';
import {activityBackground, colorPrimaryLight} from '../utils/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: activityBackground,
    borderColor: colorPrimaryLight,
    borderTopWidth: 1,
  },
  text: {
    fontSize: 14,
    marginTop: 12,
  },
  textBold: {
    fontWeight: '700',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

type Props = {
  children: React.Node,
  onPress: Function,
};

export default class CartFooter extends React.Component<Props> {
  render() {
    const {children, onPress} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <PrimaryButton onPress={onPress}>Continue</PrimaryButton>
          <Text style={styles.text}>
            {'Total: '}
            <Text style={styles.textBold}>{children}</Text>
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
