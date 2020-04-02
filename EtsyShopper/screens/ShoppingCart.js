import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, FlatList, View, Image} from 'react-native';

import {CartContext} from '../context/CartContext';

import Text from '../components/Text';

import {
  safeViewWrapper,
  headerStyles,
  baseSpacing,
  baseRadius,
} from '../styles/defaultStyles';

const Header = () => {
  return (
    <View>
      <Text style={headerStyles}>Shopping cart</Text>
    </View>
  );
};

const ListItem = ({item}) => {
  console.log('item:', item);
  return (
    <View style={{flexDirection: 'row', marginBottom: baseSpacing}}>
      <Image
        style={{
          height: 100,
          width: 100,
          marginRight: baseSpacing,
          borderRadius: baseRadius,
        }}
        source={{uri: item.image}}
      />
      <View style={{flex: 1}}>
        <Text>{item.title}</Text>
        <Text>{item.price}</Text>
      </View>
      <View
        style={{
          flex: 0,
          width: 25,
          height: 25,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <Text>{item.quantity}</Text>
      </View>
    </View>
  );
};

const ShoppingCart = ({navigation}) => {
  const cart = useContext(CartContext);
  const data = cart.cart;
  return (
    <SafeAreaView style={safeViewWrapper}>
      <FlatList
        style={{padding: baseSpacing}}
        data={data}
        renderItem={item => <ListItem {...item} />}
        ListHeaderComponent={<Header />}
      />
    </SafeAreaView>
  );
};

export default ShoppingCart;
