import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, Text, FlatList, View} from 'react-native';

import {fetchAllShops} from '../apis';

import {LocationContext} from '../context/LocationContext';

const Shops = ({navigation}) => {
  const [shops, setShops] = useState([]);
  const location = useContext(LocationContext);
  const {lat, lng} = location.location;
  fetchAllShops({distance: 4, lat: lat, long: lng}, ({data}) => {
    const allShops = data.results;
    setShops(allShops);
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Select One:</Text>
      <FlatList
        numColumns={2}
        data={shops}
        horizontal={false}
        renderItem={({item}) => (
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{flex: 1, fontWeight: 'bold'}}>{item.shop_name}</Text>
            <Text style={{flex: 1}}>{item.title}</Text>
          </View>
        )}
        keyExtractor={item => `${item.shop_id}`}
      />
    </SafeAreaView>
  );
};

export default Shops;
