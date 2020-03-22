import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, View} from 'react-native';

import {fetchActiveListingsById} from '../apis';

import Text from '../components/Text';
const ShopDetails = ({navigation, route}) => {
  const [inventory, setInventory] = useState([]);
  const {shop_id} = route.params;
  useEffect(() => {
    fetchActiveListingsById(shop_id, ({data}) => {
      setInventory(data.results);
    });
  }, [shop_id]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
      <Text>Shop data:</Text>
      <View style={{padding: 10}}>
        <FlatList
          numColumns={2}
          data={inventory}
          horizontal={false}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text style={{flex: 1, fontWeight: 'bold'}}>{item.title}</Text>
            </View>
          )}
          keyExtractor={item => `${item.listing_id}`}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShopDetails;
