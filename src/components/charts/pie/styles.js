import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    marginTop: hp(5),
  },
  labelText: {
    fontSize: wp(5),
  },
});

export default styles;
