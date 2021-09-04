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
    fontSize: wp(4),
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: wp(2),
  },
  textInfo: {
    flexDirection: 'row',
    marginVertical: hp(0.2),
  },
  courseName: {
    fontWeight: 'bold',
  },
});

export default styles;
