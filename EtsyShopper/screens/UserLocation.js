import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
  TextInput,
} from 'react-native';

import {fetchAddressSuggestions} from '../apis';

import {LocationContext} from '../context/LocationContext';

const UserLocation = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const location = useContext(LocationContext);

  useEffect(() => {
    if (search) {
      fetchAddressSuggestions(search, ({data}) => {
        setResults(data.predictions);
      });
    }
  }, [search]);
  const onChangeText = text => {
    setSearch(text);
  };
  const handleSelectAddress = data => {
    location.set(data);
    navigation.navigate('Categories');
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
