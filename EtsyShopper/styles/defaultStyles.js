import {Dimensions, StyleSheet} from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

export const baseFontColor = '#464646';

export const baseSpacing = 20;

export const headerStyles = StyleSheet.create({
  fontSize: 22,
  paddingBottom: 10,
});

export const safeViewWrapper = StyleSheet.create({
  flex: 1,
  backgroundColor: '#ffff',
});
