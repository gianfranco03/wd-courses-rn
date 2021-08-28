import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: Platform.OS === 'ios' ? hp(8) : hp(9),
  },
  body: {
    flex: 1,
    paddingTop: hp(2),
    paddingHorizontal: wp(5),
  },
  divider: {
    marginBottom: hp(1.8),
  },
  titleText: {
    alignSelf: 'center',
  },
  list: {
    marginTop: hp(0.5),
  },
  stutendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  studentName: {
    flex: 2,
  },
  studentId: {
    flex: 1,
  },
  button: {
    marginTop: hp(10),
  },
});

export default styles;
