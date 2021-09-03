import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const containerWidth = Platform.OS === 'ios' ? hp(8) : hp(9);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: containerWidth,
  },
  content: {
    // flex: 1,
    paddingHorizontal: wp(5),
  },
});

export default styles;
