import {Dimensions} from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

export const baseFontColor = '#464646';
export const errorFontColor = '#cc3300';

export const baseLightGrey = '#CCCCCC';
export const baseLightOrange = '#fac472';
export const baseLightGrapefruit = '#ffaa80';
export const baseBlue = '#80ccff';
export const baseOrange = '#ff871a';

export const baseSpacing = 20;

export const headerStyles = {
  fontSize: 22,
  paddingBottom: 10,
};

export const safeViewWrapper = {
  flex: 1,
  backgroundColor: '#ffff',
};
