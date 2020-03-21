import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
  TextInput,
} from 'react-native';
import {get} from 'lodash';

import {fetchAddressSuggestions, fetchGeolocation} from '../apis';

import {LocationContext} from '../context/LocationContext';

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
    if (address && address.description) {
      fetchGeolocation(address.description, ({data}) => {
        const coords = get(data, 'results.0.geometry.location');
        const addressObject = {...address, ...coords};
        location.set(addressObject);
      });
    }
  }, [address]);

  const onChangeText = text => {
    setSearch(text);
  };

  const handleSelectAddress = data => {
    setAddress(data);
    navigation.navigate('Shops');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity>
        <TextInput
          style={{
            height: 40,
            borderColor: '#CCC',
            borderWidth: 1,
            margin: 2,
            borderRadius: 17,
          }}
          onChangeText={text => onChangeText(text)}
          value={search}
        />
      </TouchableOpacity>
      <FlatList
        data={results}
        renderItem={({item}) => (
          <Text onPress={() => handleSelectAddress(item)}>
            {item.description}
          </Text>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default UserLocation;
