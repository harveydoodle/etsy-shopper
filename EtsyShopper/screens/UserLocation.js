import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Text,
  TextInput,
} from 'react-native';
import {fetchAddressSuggestions} from '../apis';

const UserLocation = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

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
        renderItem={({item}) => <Text>{item.description}</Text>}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default UserLocation;
