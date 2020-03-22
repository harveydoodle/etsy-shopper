import React, {useState} from 'react';
import {SafeAreaView, FlatList, View} from 'react-native';

import {fetchActiveListingsById} from '../apis';

import Text from '../components/Text';
const ShopDetails = ({navigation, id}) => {
  fetchActiveListingsById({id}, ({data}) => {
    console.log('shop atal,.', data);
  });
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
    <Text>Shop data:</Text>
      {/* <View style={{padding: 10}}>
        <Text>Select One:</Text>
        <FlatList
          numColumns={2}
          data={shops}
          horizontal={false}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text style={{flex: 1, fontWeight: 'bold'}}>
                {item.shop_name}
              </Text>
              <Text style={{flex: 1}}>{item.title}</Text>
            </View>
          )}
          keyExtractor={item => `${item.shop_id}`}
        />
      </View> */}
    </SafeAreaView>
  );
};

export default ShopDetails;
