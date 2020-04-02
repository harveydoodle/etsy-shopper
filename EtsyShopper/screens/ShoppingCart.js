import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, FlatList, View} from 'react-native';

import {CartContext} from '../context/CartContext';

import Text from '../components/Text';

import {baseSpacing} from '../styles/defaultStyles';

const ListItem = ({item}) => {
  console.log('item:', item);
  return (
    <View style={{flexDirection: 'row', marginBottom: baseSpacing}}>
      <Text style={{flex: 1}}>{item.title}</Text>
      <View style={{flex: 0}}>
        <Text>{item.quantity}</Text>
        <Text>{item.price}</Text>
      </View>
    </View>
  );
};

const ShoppingCart = ({navigation}) => {
  const cart = useContext(CartContext);
  const data = cart.cart;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#fff'}}>
      <FlatList
        data={data}
        renderItem={item => <ListItem {...item} />}
        ListHeaderComponent={<Text>Shopping cart</Text>}
      />
    </SafeAreaView>
  );
};

export default ShoppingCart;
