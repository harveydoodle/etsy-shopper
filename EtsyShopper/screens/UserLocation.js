import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  View,
} from 'react-native';
import {get} from 'lodash';
import Geolocation from '@react-native-community/geolocation';

import {fetchAddressSuggestions, fetchGeolocation} from '../apis';

import {LocationContext} from '../context/LocationContext';

import Text from '../components/Text';

const AddressListItem = ({structured_formatting, description, onPress}) => {
  const {main_text, secondary_text} = structured_formatting;
  if ((!main_text || !secondary_text) && description) {
    return (
      <TouchableOpacity onPress={onPress} style={{paddingBottom: 10}}>
        <Text style={{fontWeight: 'bold'}}>{description}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={{paddingBottom: 10}}>
      <Text style={{fontWeight: 'bold'}}>{main_text}</Text>
      <Text>{secondary_text}</Text>
    </TouchableOpacity>
  );
};

const UserLocation = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [address, setAddress] = useState({});

  const location = useContext(LocationContext);

  useEffect(() => {
    if (search) {
      fetchAddressSuggestions(search, ({data}) => {
        setResults(data.predictions);
      });
    }
  }, [search]);

  useEffect(() => {
    if (address && address.description && !address.is_custom) {
      fetchGeolocation(address.description, ({data}) => {
        const coords = get(data, 'results.0.geometry.location');
        const addressObject = {...address, ...coords};
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
    setAddress(data);
    navigation.navigate('Shops');
  };
  const getLocation = () =>
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
          navigation.navigate('Shops');
        }
      },
      error => {
        console.warn(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
    );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
      <View style={{padding: 20, flex: 1}}>
        <Text style={{fontSize: 22, paddingBottom: 10}}>
          What's your address?
        </Text>
        <Text>
          <Text
            onPress={getLocation}
            style={{fontWeight: 'bold', color: 'orange'}}>
            Use my location
          </Text>{' '}
          or:
        </Text>
        <TextInput
          style={{
            fontFamily: 'futura',
            height: 50,
            borderColor: '#CCC',
            borderWidth: 1,
            margin: 2,
            borderRadius: 15,
            textAlignVertical: 'top',
            paddingHorizontal: 8,
          }}
          onChangeText={text => onChangeText(text)}
          value={search}
          placeholder="Enter your address"
        />
        <FlatList
          data={results}
          style={{paddingVertical: 10}}
          renderItem={({item}) => (
            <AddressListItem
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

export default UserLocation;
