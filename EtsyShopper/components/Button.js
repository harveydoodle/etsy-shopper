import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import {baseFontColor} from '../styles/defaultStyles';

const CustomButton = props => (
  <TouchableOpacity
    style={{
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 25,
      backgroundColor: props.backgroundColor,
    }}
    onPress={props.onPress}>
    <Text
      style={{
        fontFamily: 'futura',
        fontSize: 18,
        color: '#fff',
      }}>
      {props.title}
    </Text>
  </TouchableOpacity>
);

export default CustomButton;
