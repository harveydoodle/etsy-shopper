import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
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
      }}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          padding: baseSpacing,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{flex: 0}}>
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            style={{width: 300, maxWidth: deviceWidth - baseSpacing * 2}}
            autoPlay
            source={require('../animations/welcome.json')}
          />
        </View>
        <View style={{flex: 0, alignItems: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 36,
              fontWeight: 'bold',
              marginBottom: 15,
              flex: 0,
            }}>
            Hello!
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 22,
              marginBottom: 15,
              flex: 0,
            }}>
            Shop and support your small businesses in your area
          </Text>
          <Button
            title="Get Started"
            textStyles={{fontSize: 24}}
            backgroundColor="#fac472"
            onPress={() => {
              navigation.navigate('UserLocation');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Landing;
