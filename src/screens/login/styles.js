import {StyleSheet, Platform} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: wp(7),
  },
  titleText: {
    marginBottom: hp(3),
    alignSelf: 'center',
    color: 'white',
    fontSize: wp(8),
    textShadowColor: '#000',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 10,
  },
  subTitleText: {
    marginBottom: hp(5),
    alignSelf: 'center',
    color: 'white',
    fontSize: wp(5),
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: Platform.OS === 'ios' ? 4 : 9,
  },
  inputContainer: {
    borderRadius: wp(4),
    height: hp(6.7),
    overflow: 'hidden',
    marginBottom: hp(4),
  },
  inputText: {
    height: hp(7),
    overflow: 'hidden',
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingLeft: wp(2),
  },
  button: {
    marginTop: hp(1),
    paddingVertical: Platform.OS === 'ios' ? hp(1.2) : hp(0.5),
  },
  buttonText: {
    color: 'white',
  },
});

export default styles;
