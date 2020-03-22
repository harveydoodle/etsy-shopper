import React from 'react';
import {SafeAreaView, View} from 'react-native';
import LottieView from 'lottie-react-native';

/** Components */
import Text from '../components/Text';
import Button from '../components/Button';

/** Styles */
import {deviceWidth, baseSpacing} from '../styles/defaultStyles';

const Landing = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      }}>
      <View style={{flex: 1}}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{width: 300, maxWidth: deviceWidth - baseSpacing * 2}}
          autoPlay
          source={require('../animations/welcome.json')}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>Hello!</Text>
        <Text style={{fontSize: 16}}>
          Shop and support your local small businesses.
        </Text>
        <Button
          title="Get Started"
          backgroundColor="#fac472"
          onPress={() => {
            navigation.navigate('UserLocation');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Landing;
