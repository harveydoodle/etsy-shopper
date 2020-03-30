import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import {get} from 'lodash';
import Geolocation from '@react-native-community/geolocation';

import {fetchAddressSuggestions, fetchGeolocation} from '../apis';

import {LocationContext} from '../context/LocationContext';

import Text from '../components/Text';
import EmptyListText from '../components/EmptyListText';
import ErrorText from '../components/ErrorText';

import {
  headerStyles,
  safeViewWrapper,
  baseSpacing,
} from '../styles/defaultStyles';

const AddressListItem = ({
  structured_formatting,
  description,
  onPress,
  disabled,
}) => {
  const {main_text, secondary_text} = structured_formatting;
  if ((!main_text || !secondary_text) && description) {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={{paddingBottom: 10}}>
        <Text style={{fontWeight: 'bold'}}>{description}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{paddingBottom: 10}}>
      <Text style={{fontWeight: 'bold'}}>{main_text}</Text>
      <Text>{secondary_text}</Text>
    </TouchableOpacity>
  );
};

const UserLocation = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(false);

  const location = useContext(LocationContext);

  useEffect(() => {
    if (search) {
      fetchAddressSuggestions(search, ({data}) => {
        if (data.error_message) {
          setError('Something went wrong, try again!');
          setResults([]);
          return;
        }
        setError('');
        setResults(data.predictions);
      });
    }
  }, [search]);

  useEffect(() => {
    if (address && address.description && !address.is_custom) {
      fetchGeolocation(address.description, ({data}) => {
        const coords = get(data, 'results.0.geometry.location');
        const addressObject = {...address, ...coords, ...{is_custom: false}};
        location.set(addressObject);
      });
    } else if (address.is_custom) {
      location.set(address);
    }
  }, [address]);

  const onChangeText = text => {
    setSearch(text);
  };

  const handleSelectAddress = data => {
    setLoading(true);
    setAddress(data);
    setLoading(false);
    navigation.navigate('Shops');
  };
  const getLocation = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    Geolocation.getCurrentPosition(
      info => {
        if (info && info.coords) {
          const {latitude, longitude} = info.coords;
          const customAddressObj = {
            is_custom: true,
            description: 'my location',
            lat: latitude,
            lng: longitude,
          };
          setAddress(customAddressObj);
          setLoading(false);
          navigation.navigate('Shops');
        }
      },
      error => {
        setLoading(false);
        setAddress({});
        setError('Could not get your location, please try again.');
        console.warn(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
    );
  };

  const renderEmptyView = () => {
    if (error) {
      return <ErrorText />;
    } else if (!!search) {
      return <EmptyListText />;
    }
    return null;
  };
  return (
    <SafeAreaView style={safeViewWrapper}>
      <View style={{padding: baseSpacing, flex: 1}}>
        <Text style={headerStyles}>What's your address?</Text>
        <Text style={{marginBottom: 5}}>
          <Text onPress={getLocation} style={styles.ownLocationText}>
            Use my location
          </Text>{' '}
          or:
        </Text>
        <TextInput
          style={styles.searchBarText}
          onChangeText={text => onChangeText(text)}
          value={search}
          placeholder="Enter your address"
        />
        <FlatList
          ListEmptyComponent={renderEmptyView}
          data={results}
          style={styles.addressItemWrapper}
          renderItem={({item}) => (
            <AddressListItem
              disabled={loading}
              onPress={() => handleSelectAddress(item)}
              {...item}
            />
          )}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addressItemWrapper: {paddingVertical: 10},
  searchBarText: {
    fontFamily: 'futura',
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    margin: 2,
    borderRadius: 15,
    textAlignVertical: 'top',
    paddingHorizontal: 8,
  },
  ownLocationText: {
    fontWeight: 'bold',
    color: '#ff871a',
    textDecorationLine: 'underline',
  },
});

export default UserLocation;
