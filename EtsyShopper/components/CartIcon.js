import React from 'react';
import {SafeAreaView} from 'react-native';
import {get} from 'lodash';

import {Icon} from 'react-native-elements';

import {baseSpacing, baseBlue} from '../styles/defaultStyles';

const CartIcon = ({onPress}) => {
  return (
    <SafeAreaView
      style={{
        zIndex: 1000,
        position: 'absolute',
        bottom: baseSpacing,
        right: baseSpacing,
      }}>
      <Icon onPress={onPress} name="shopping-cart" color={baseBlue} reverse />
    </SafeAreaView>
  );
};

export default CartIcon;
