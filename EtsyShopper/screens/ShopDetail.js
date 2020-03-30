import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {get} from 'lodash';

import {fetchActiveListingsById} from '../apis';

import Text from '../components/Text';
import EmptyListText from '../components/EmptyListText';
import ErrorText from '../components/ErrorText';

import {
  headerStyles,
  safeViewWrapper,
  baseSpacing,
} from '../styles/defaultStyles';

const ShopDetails = ({navigation, route}) => {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const {shop_id} = route.params;
  useEffect(() => {
    fetchActiveListingsById(shop_id, ({data, response}) => {
      if (get(response, 'status') >= 400) {
        setLoading(false);
        setError('Something went wrong, please try again!');
        setInventory([]);
        return;
      }
      setError('');
      setLoading(false);
      setInventory(data.results);
    });
  }, [shop_id]);
  if (loading) {
    return (
      <SafeAreaView style={{...safeViewWrapper, ...{justifyContent: 'center'}}}>
        <ActivityIndicator size="large" style={{alignSelf: 'center'}} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={safeViewWrapper}>
      <FlatList
        ListEmptyComponent={
          !error ? <EmptyListText /> : <ErrorText error={error} />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={headerStyles}>Items available:</Text>}
        numColumns={2}
        data={inventory}
        horizontal={false}
        contentContainerStyle={{
          padding: 10,
        }}
        renderItem={({item}) => (
          <View style={styles.itemWrapper}>
            <Image
              style={styles.image}
              source={{uri: item.MainImage.url_170x135}}
            />
            <Text numberOfLines={3} style={{fontSize: 20, fontWeight: 'bold'}}>
              ${item.price}
            </Text>
            <Text numberOfLines={3}>{item.title}</Text>
          </View>
        )}
        keyExtractor={item => `${item.listing_id}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#CCC',
    height: 300,
    borderRadius: 20,
    padding: baseSpacing,
    margin: 10,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
    alignSelf: 'center',
  },
});

export default ShopDetails;
