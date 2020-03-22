import React from 'react';
import {SafeAreaView, Button} from 'react-native';

import Text from '../components/Text';

const Landing = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Landing Text</Text>
      <Text style={{fontSize: 16}}>Some text about the app here</Text>
      <Button
        title="Start"
        color="green"
        onPress={() => {
          navigation.navigate('UserLocation');
        }}
      />
    </SafeAreaView>
  );
};

export default Landing;
