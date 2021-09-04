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
    paddingHorizontal: wp(5),
  },
  sectionsChart: {
    // marginTop: hp(15),
    alignItems: 'center',
  },
});

export default styles;
