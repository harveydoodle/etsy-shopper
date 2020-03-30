import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {get} from 'lodash';

import {fetchAllShops} from '../apis';

import {LocationContext} from '../context/LocationContext';

import Text from '../components/Text';
import EmptyListText from '../components/EmptyListText';
import ErrorText from '../components/ErrorText';

import {
  headerStyles,
  safeViewWrapper,
  baseSpacing,
} from '../styles/defaultStyles';

const Shops = ({navigation}) => {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useContext(LocationContext);
  const {
    lat,
    lng,
    structured_formatting,
    description,
    is_custom,
  } = location.location;

  const displayAddress = is_custom
    ? description
    : get(structured_formatting, 'main_text') || description;
  useEffect(() => {
    fetchAllShops({distance: 4, lat: lat, long: lng}, ({data, response}) => {
      if (get(response, 'status') >= 400) {
        setLoading(false);
        setError('Something went wrong, please try again!');
        setShops([]);
        return;
      }
      setLoading(false);
      setError('');
      const allShops = data.results;
      setShops(allShops);
    });
  }, [lat, lng]);
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
        numColumns={2}
        data={shops}
        ListHeaderComponent={
          !!displayAddress && (
            <Text style={headerStyles}>
              Stores based around {displayAddress}:
            </Text>
          )
        }
        horizontal={false}
        contentContainerStyle={{
          padding: baseSpacing,
        }}
        renderItem={({item}, key) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ShopDetail', {shop_id: item.shop_id})
            }
            style={styles.itemWrapper}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={{fontWeight: 'bold', fontSize: 20}}>
              {item.shop_name}
            </Text>
            <Text numberOfLines={3}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => `${item.shop_id}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffe39a',
    margin: 10,
    padding: baseSpacing,
    borderRadius: 8,
  },
});

export default Shops;
