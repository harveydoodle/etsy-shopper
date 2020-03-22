import React from 'react';
import {Text} from 'react-native';

import {baseFontColor} from '../styles/defaultStyles';

const CustomText = ({style, children}) => (
  <Text style={{fontFamily: 'futura', color: baseFontColor, ...style}}>
    {children}
  </Text>
);

export default CustomText;
