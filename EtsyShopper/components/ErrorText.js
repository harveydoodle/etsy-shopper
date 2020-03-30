import React from 'react';
import {StyleSheet} from 'react-native';

import Text from './Text';
import {errorFontColor} from '../styles/defaultStyles';

const ErrorText = ({error}) => <Text style={styles.text}>{error}</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 40,
    color: errorFontColor,
  },
});
export default ErrorText;
