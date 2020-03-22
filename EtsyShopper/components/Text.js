import React from 'react';
import {Text} from 'react-native';

import {baseFontColor} from '../styles/defaultStyles';

const CustomText = props => (
  <Text
    style={{
      fontFamily: 'futura',
      fontSize: 16,
      color: baseFontColor,
      ...props.style,
    }}
    {...props}>
    {props.children}
  </Text>
);

export default CustomText;
