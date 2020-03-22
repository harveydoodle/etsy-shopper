import React from 'react';
import {Text} from 'react-native';

const CustomText = ({children}) => (
  <Text style={{fontFamily: 'futura'}}>{children}</Text>
);

export default CustomText;
