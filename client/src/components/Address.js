// @flow
import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import userIcon from '../icons/user.png';
import {colorPrimaryLight} from '../utils/colors';

const styles = StyleSheet.create({
  container: {
    borderColor: colorPrimaryLight,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    padding: 14,
  },
  content: {},
  image: {
    height: 24,
    width: 24,
  },
  imageWrapper: {
    paddingLeft: 1,
    paddingRight: 14,
    paddingTop: 3,
  },
  textName: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  textLine: {
    fontSize: 15,
    lineHeight: 20,
  },
  textPhone: {
    color: colorPrimaryLight,
    marginTop: 5,
  },
});

type Props = {
  name: ?string,
  line1: ?string,
  line2?: ?string,
  city: ?string,
  state: ?string,
  postalCode: ?string,
  country: ?string,
  phone?: ?string,
};

export default class Address extends React.Component<Props> {
  renderLine3() {
    const {city, country, postalCode, state} = this.props;
    let out = city ? city : '';

    if (state) {
      out = `${out} ${state}`;
    }

    if (postalCode) {
      out = `${out} ${postalCode}`;
    }

    if (country) {
      out = `${out}, ${country}`;
    }

    return <Text style={styles.textLine}>{out}</Text>;
  }

  render() {
    const {line1, line2, name, phone} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={userIcon} />
        </View>
        <View style={styles.content}>
          <Text style={styles.textName}>{name}</Text>
          <Text style={styles.textLine}>{line1}</Text>
          {line2 && <Text style={styles.textLine}>{line2}</Text>}
          {this.renderLine3()}
          {phone && (
            <Text style={[styles.textLine, styles.textPhone]}>{phone}</Text>
          )}
        </View>
      </View>
    );
  }
}
