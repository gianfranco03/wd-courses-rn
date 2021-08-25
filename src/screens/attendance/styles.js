import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: hp(2),
    paddingHorizontal: wp(5),
  },
  buttonsContainer: {
    marginTop: hp(4),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertIcon: {
    marginTop: hp(2),
  },
});

export default styles;
